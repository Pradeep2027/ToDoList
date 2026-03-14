const tableBody = document.getElementById('tbody');

function load()   {
    if (localStorage.getItem('itemsJson') != null)  {
        loadData();
        clearListButton.style.display = "inline-block";
    }
    else {
        clearListButton.style.display = "none";
    }
}

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
    loadData();
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

function deleteTodo(index){
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(index,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    loadData();
}