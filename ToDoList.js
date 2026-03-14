const tableBody = document.getElementById('tbody');
const clearListButton = document.getElementById('clearList');
let l;

// Function called on load of page
function load()   {
    if (localStorage.getItem('itemsJson') != null)  {
        l = JSON.parse(localStorage.getItem('itemsJson')).length;
        loadData();
        clearListButton.style.display = "inline-block";
    }
    else {
        clearListButton.style.display = "none";
    }
}

// Add ToDo Item to list by adding eventListener
let addButton = document.getElementById("add");
add.addEventListener('click', () => {
    title = document.getElementById('title');
    description = document.getElementById('description');
    let itemJsonArray;
    if(localStorage.getItem('itemsJson') == null)   {
        itemJsonArray = [];
        itemJsonArray.push([title.value,description.value,"unchecked"]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([title.value,description.value,"unchecked"]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    title.value = null;
    description.value = null;
    l++;
    loadData();
    clearListButton.style.display = "inline-block";
});

function loadData(){
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    let str = "";
    itemJsonArray.forEach((element,index) => {
        str += `<tr> <th scope='row'>${index+1}</th> <td>${element[0]}</td> <td>${element[1]}</td><td><button class='btn btn-danger btn-sm ms-2' onclick="deleteTodo(${index})" >Delete</button></td></tr>`
    });
    tableBody.innerHTML = str;
}

//function to delete single ToDo
function deleteTodo(index){
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(index,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    --l;
    if(l == 0)  clearListFun();
    else    loadData();
}

clearList.addEventListener('click', () => {
    if(confirm("Do You really want to clear the whole list"))   {
        clearListFun();
        l = 0;
    }
});

// function to clear the entire ToDo List
function clearListFun(){
    localStorage.removeItem('itemsJson');
    tableBody.innerHTML = "";
    clearListButton.style.display = "none";
}