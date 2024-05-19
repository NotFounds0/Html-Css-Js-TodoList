const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".addBtn");
const todoList = document.querySelector(".todoList");
const todoFilter = document.querySelector(".filterTodo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", del);
todoFilter.addEventListener("click", filterTodo);

function addTodo(e) {
  e.preventDefault();
  const isEmpty = (str) => !str.trim().length;
  if (isEmpty(todoInput.value)) {
    Toastify({
      text: "Boşluk Alan Eklenemez.",
      position: "center",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 600,
      },
      backgroundColor: "#ff5f6d",
      duration: 3000,
    }).showToast();
    todoInput.value = "";
  } else {
    Toastify({
      text: "Başarılı Eklendi.",
      position: "center",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 600,
      },
      backgroundColor: "#2fcc08",
      duration: 3000,
    }).showToast();

    saveLocalStorage(todoInput.value);

    const todoLi = document.createElement("li");
    todoLi.classList.add("TodoItem");

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="bi bi-check-circle"></i>';
    checkBtn.classList.add("checkBtn");
    todoLi.appendChild(checkBtn);

    const todoText = document.createElement("p");
    todoText.innerText = todoInput.value;
    todoText.classList.add("todoText");
    todoLi.appendChild(todoText);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="bi bi-trash3"></i>';
    delBtn.classList.add("deleteBtn");
    todoLi.appendChild(delBtn);

    todoList.appendChild(todoLi);
    todoInput.value = "";
  }
}

function del(e) {
  const item = e.target;

  //? delete Todo
  if (item.classList[0] === "deleteBtn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    Toastify({
      text: "Todo Silindi.",
      position: "center",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 600,
      },
      backgroundColor: "#e65a09",
      duration: 3000,
    }).showToast();
  }

  //? check
  if (item.classList[0] === "checkBtn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todoText") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todoText"));
  }
  todos.push(todo);
  localStorage.setItem("todoText", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todoText") === null) {
    todos = [];
  }
  {
    todos = JSON.parse(localStorage.getItem("todoText"));
  }
  todos.forEach((todo) => {
    const todoLi = document.createElement("li");
    todoLi.classList.add("TodoItem");

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="bi bi-check-circle"></i>';
    checkBtn.classList.add("checkBtn");
    todoLi.appendChild(checkBtn);

    const todoText = document.createElement("p");
    todoText.innerText = todo;
    todoText.classList.add("todoText");
    todoLi.appendChild(todoText);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="bi bi-trash3"></i>';
    delBtn.classList.add("deleteBtn");
    todoLi.appendChild(delBtn);

    todoList.appendChild(todoLi);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todoText") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todoText"));
  }
  const todoMetin = todo.querySelector(".todoText").innerText;
  const todoIndex = todos.indexOf(todoMetin);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todoText", JSON.stringify(todos));
  }
}

getTodos();
