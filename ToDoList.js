const tableBody = document.getElementById('tbody');
const clearListButton = document.getElementById('clearList');
const resetListButton = document.getElementById('resetList');
let l;

function validateInput(title,description) {
    if (!title || title.trim() === "")  {
        alert("Error: Title is required and cannot be empty");
        return false;
    }
    
    let titleLength = title.trim().length;
    if (titleLength < 3 || titleLength > 32)   {
        alert("Error: Title must contains atleast 3 to 32 characters");
        return false;
    }

    if (description && description.trim().length > 50) {
        alert("Error: Decription must be less than 50 characters");
        return false;
    }
    return true;
}

// Function called on load of page
function load()   {
    if (localStorage.getItem('itemsJson') != null)  {
        l = JSON.parse(localStorage.getItem('itemsJson')).length;
        loadData();
        clearListButton.style.display = "inline-block";
        resetListButton.style.display = "inline-block";
    }
    else {
        clearListButton.style.display = "none";
        resetListButton.style.display = "none";
    }
}

// Add ToDo Item to list by adding eventListener
let addButton = document.getElementById("add");
add.addEventListener('click', () => {
    title = document.getElementById('title');
    description = document.getElementById('description');
    if (!validateInput(title.value, description.value)) return;
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
    ++l;
    loadData();
    clearListButton.style.display = "inline-block";
    resetListButton.style.display = "inline-block";
});

function loadData(){
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    let str = "";
    itemJsonArray.forEach((element,index) => {
        str += `<tr> <th scope='row'>${index+1}</th> <td>${element[0]}</td> <td>${element[1]}</td><td><input type="checkbox" value="done" ${element[2]} disabled></td><td><button id="set${index}" class='btn btn-success btn-sm me-2' onclick="setToDo(${index})" ></button><button class='btn btn-danger btn-sm ms-2' onclick="deleteTodo(${index})" >Delete</button></td></tr>`
    });
    tableBody.innerHTML = str;
    updateCheckTodoButtons();
}

// function to mark ToDo's done or not
function updateCheckTodoButtons() {
    for (i = 0; i < l; i++) {
        document.getElementById("set"+i).innerHTML=(itemJsonArray[i][2] == "checked") ? "Uncheck" : "Check";
    }
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

clearListButton.addEventListener('click', () => {
    if (confirm("Please confirm if you want to clear the whole list"))   {
        clearListFun();
        l = 0;
    }
});

// function to clear the entire ToDo List
function clearListFun(){
    localStorage.removeItem('itemsJson');
    tableBody.innerHTML = "";
    clearListButton.style.display = "none";
    resetListButton.style.display = "none";
}

function setToDo(index){
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    let item = itemJsonArray[index];
    if(item[2] == "unchecked")  {
        itemJsonArray[index] = ([item[0],item[1],"checked"]);
        resetListButton.style.display = "inline-block";
    }
    else    itemJsonArray[index] = ([item[0],item[1],"unchecked"]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    loadData();
}

resetListButton.addEventListener('click', () => {
    if (confirm("Please confirm if you want to clear the whole list"))   {
        resetListFun();
    }
});

function resetListFun() {
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.forEach((element) => {
        element[2] = "unchecked";       
    });
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    loadData();
    resetListButton.style.display = "none";
}