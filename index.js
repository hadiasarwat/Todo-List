var inputBox = document.getElementById('inputBox');
var addBtn = document.getElementById('addBtn');
var todoList = document.getElementById('todoList');

var editTodo = null;

// Function to add a todo
function addTodo() {
    var inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Please! Enter Something other wise its not working.");
        return false;
    }

    if (addBtn.value === "Edit") {
        var li = editTodo.parentNode;
        li.firstChild.innerHTML = inputText;
        updateLocalTodos(li.firstChild.innerHTML, li);
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        var li = document.createElement('li');
        var p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        // Edit Button
        var editBtn = document.createElement('button');
        editBtn.innerHTML = "Edit";
        editBtn.className = "btn editBtn";
        li.appendChild(editBtn);

        // Delete Button
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Remove";
        deleteBtn.className = "btn deleteBtn";
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        saveLocalTodos(inputText);
        inputBox.value = "";
    }
}

// Function to update (edit/delete) todo
function updateTodo(e) {
    var target = e.target;
    if (target.innerHTML === "Remove") {
        // Delete karna
        var li = target.parentNode;
        deleteLocalTodos(li.firstChild.innerHTML);
        todoList.removeChild(li);
    } else if (target.innerHTML === "Edit") {
        // Edit karna
        editTodo = target;
        inputBox.value = target.parentNode.firstChild.innerHTML;
        addBtn.value = "Edit";
        inputBox.focus();
    }
}

// Function to save todo in local storage
function saveLocalTodos(todo) {
    var todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to get todos from local storage
function getLocalTodos() {
    var todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    for (var i = 0; i < todos.length; i++) {
        // Sab todos ko render karna
        var li = document.createElement('li');
        var p = document.createElement('p');
        p.innerHTML = todos[i];
        li.appendChild(p);

        // Edit Button
        var editBtn = document.createElement('button');
        editBtn.innerHTML = "Edit";
        editBtn.className = "btn editBtn";
        li.appendChild(editBtn);

        // Delete Button
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Remove";
        deleteBtn.className = "btn deleteBtn";
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }
}

// Function to delete todo from local storage
function deleteLocalTodos(todoText) {
    var todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i] === todoText) {
            todos.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to update local storage when editing
function updateLocalTodos(newText, li) {
    var todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i] === li.firstChild.innerHTML) {
            todos[i] = newText;
            break;
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
