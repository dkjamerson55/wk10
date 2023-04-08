// Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
// A Bootstrap styled table representing your choice of data.
// A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.


class Item{
    constructor (name, quantity){
        this.name = name;
        this.quantity = quantity;
    }
}

class Grocery{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.items= [] // empty array for storying all added members
    }

    addItem(item){
        this.items.push(item);
    }

    deleteItem(item){
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
}

//code enabling us to use class data in relasionships w/ HTML

let groceries = [];
let groceryId = 0; 

onClick('new-gList', ()=> {
    groceries.push(new Grocery(groceryId++, getValue('new-grocery-list-name')));
    drawDOM(); //iterate over groceries array and build tables for each one.
})

// function used to add eventlisteners

function onClick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//simplifies code for new Grocery function in onClick

function getValue(id){
    return document.getElementById(id).value;
}

// function to iterate over groceries array and build tables for each of them
function drawDOM(){
    let groceryDiv = document.getElementById('groceries');
    clearElement(groceryDiv);
    for (grocery of groceries){
        let table = createGroceryTable(grocery);
        let title = document.createElement('h2');
        title.innerHTML = grocery.name;
        title.appendChild(createDeleteGroceryButton(grocery));
        groceryDiv.appendChild(title);
        groceryDiv.appendChild(table);
        for (item of grocery.items){
            createItemRow(grocery,table,item)
        }
    }
}

// function for creating new rows & cells

function createItemRow(grocery,table,item){
    let row= table.insertRow(2);
    row.insertCell(0).innerHTML = item.name;
    row.insertCell(1).innerHTML = item.quantity;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(grocery, item));
}

// btn for deleting item from list

function createDeleteRowButton(grocery,item){
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = ()=>{
        let index = grocery.items.indexOf(item);
        grocery.items.splice(index, 1);
        drawDOM();
        
        let img = document.createElement("img");
        img.src = "https://media.tenor.com/i-_wRENe3dYAAAAd/another-please-vegetarian.gif";

        img.addEventListener("click", function(e) {
            console.log(e.target.src);
        })

        document.body.appendChild(img);
        
    }
    return btn; // appending a child, create delete row button requires returning the created btn so it can be appended to the actions on the row & on table level.
}

// btn for deleting grocery list
function createDeleteGroceryButton(grocery){
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Grocery'
    btn.onclick = ()=>{
        let index = groceries.indexOf(grocery);
        groceries.splice(index, 1);
        drawDOM();
    }
    return btn;
}

// btn for creating new list item

function createNewItemButton(grocery) {
    let btn = document.createElement('button');
    btn.className= 'btn btn-info';
    btn.innerHTML = 'Submit';
    btn.onclick = () => {
        grocery.items.push(new Item(getValue(`name-input-${grocery.id}`), getValue(`quantity-input-${grocery.id}`)));
        drawDOM();
    }
    return btn;
}

// function to build table and list all elements to be created. Includes names of list items and quantity, as well as creation of new table rows and headers.

function createGroceryTable(grocery){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    quantityColumn.innerHTML= 'Quantity';
    row.appendChild(nameColumn);
    row.appendChild(quantityColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${grocery.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('id', `quantity-input-${grocery.id}`);
    quantityInput.setAttribute('type', 'text');
    quantityInput.setAttribute('class', 'form-control');
    let newItemButton = createNewItemButton(grocery);
    nameTh.appendChild(nameInput);
    quantityTh.appendChild(quantityInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);
    return table;
}

// function to clear input after each submission.

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}