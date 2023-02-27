
// find the elements

const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoaddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");



// showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent = ""
        messageElement.classList.remove(`bg-${status}`);

    }, 1000)
}



//createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML =`
    <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>
    `;
    todoLists.appendChild(todoElement);


    const deleteButton = todoElement.querySelector
    ("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)
};



// deleteTodo
const deleteTodo = (event) => {
    // console.log("delete Todo");
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    // console.log(selectedTodo);

    todoLists.removeChild(selectedTodo);
    showMessage("Todo is Deleted", "denger");

    
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId != selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.
    parse(localStorage.getItem("mytodos")) : [];
}


//add Todo

const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    // console.log(todoInput.value);


    // unique id

    const todoId = Date.now().toString();
        // console.log(todoId);
    createTodo(todoId, todoValue);
    showMessage("To do is added","success");


// add todo to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};
        
// loadTodos
const loadTodos = () => {
    // console.log("loaded");
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
};


// adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);



