const todoInput = document.querySelector(".input-todo");
const addTodoBtn = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-list");
const dateCont = document.querySelector(".date-container");
const totalTodos = document.querySelector('.countTotal')
const completedTodos = document.querySelector('.countCompleted');

let todos = [];

function displayDate() {
  let date = new Date();
  date = date.toLocaleDateString();
  dateCont.innerHTML = date;
}

displayDate();


addTodoBtn.addEventListener("click", function () {
  let todoInputvalue = todoInput.value;
  if(todoInputvalue !== ''){
    addTodo(todoInputvalue);
  }
});

function addTodo(value) {

  let todo = {
    item: value,
    id: Date.now(),
    completed: false,
  };


  todos.push(todo);

  addToLocalStorage(todos);


  todoInput.value = "";
}

function renderTodos(todosArray) {
  todoList.innerHTML = "";
  todosArray.forEach((todo) => {
    //check for completed
    const checked = todo.completed ? "checked" : null;
    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.setAttribute("data-key", todo.id);

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        <textarea class="todo" disabled>${todo.item}</textarea>
        <div class="btn-container">
          <i title="edit" class="fa-solid fa-pen-to-square fa-lg edit"></i>
          <i title="save" class="fa-solid fa-floppy-disk fa-lg save"></i>
          <i title="delete" class="fa-solid fa-xmark fa-xl delete"></i> 
        </div>
        `;

    todoList.appendChild(li);
    console.log(todo.item)
  });
  countTask()
}
function countTask(){
  totalTodos.innerHTML = todos.length
  const doneTodos = todos.filter(function(todo){
    return todo.completed === true
  })
  completedTodos.innerHTML = doneTodos.length
}


function toggleTodo(id) {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id != id;
  });

  addToLocalStorage(todos);
}

function editTodo(id, e) {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      console.log("ok");
      e.target.parentElement.parentElement.querySelector(
        ".todo"
      ).disabled = false;
      e.target.parentElement.parentElement.querySelector(
        ".todo"
      ).style.backgroundColor = "#93c5fd";
    }
  });
}

function saveTodo(id, e) {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.item = e.target.parentElement.parentElement.querySelector(".todo").value;
        e.target.parentElement.parentElement.querySelector(".todo").disabled = true;
    }
  });
  addToLocalStorage(todos);
}

todoList.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    toggleTodo(e.target.parentElement.getAttribute("data-key"));
  }

  if (e.target.classList.contains("delete")) {
    deleteTodo(e.target.parentElement.parentElement.getAttribute("data-key"));
  }

  if (e.target.classList.contains("edit")) {
    editTodo(e.target.parentElement.parentElement.getAttribute("data-key"), e);
  }

  if (e.target.classList.contains("save")) {
    saveTodo(e.target.parentElement.parentElement.getAttribute("data-key"), e);
  }
});


function addToLocalStorage(todos){
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos(todos)
}

function getFromLocalStorage() {
  let reference = localStorage.getItem("todos");
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

getFromLocalStorage();


