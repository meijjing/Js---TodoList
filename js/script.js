// script.js

// select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const form = document.querySelector(".add-item");
const add = document.getElementById("add");
const input = document.getElementById("input");
const item = document.querySelector(".item");
const check = document.querySelector(".check");
const remove = document.querySelector(".delete");
const text = document.querySelector(".text");

// class name
const CHECK = "fa-check";
// const UNCHECK = "check";
const LINE_THROUGH = "line-through";

// variables
let LIST, id;

// get item from local storage --------------------------
let data = localStorage.getItem("todo");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadToDo(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadToDo(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear local storage -------------------------------------
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// show Date ----------------------------------------
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
});

// add a to-do item ----------------------------------
// element.insertAdjacentHTML(position, text);
// "beforebegin", "afterbegin", "beforeend", "afterend"
// element.innerHTML(text);

function addToDo(todo, id, done, trash) {
  if (trash) return;

  const DONE = done ? CHECK : "";
  const LINE = done ? LINE_THROUGH : "";

  const text = `<li class="item">
    <i class="check fa ${DONE}" job="done" id="${id}"></i>
    <p class="text ${LINE}">${todo}</p>
    <i class="fa fa-trash delete" job="remove" id="${id}"></i></li>`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}

// enter key ------------------------------------------

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todo = input.value;

  // input isn't empty
  if (todo) {
    addToDo(todo, id, false, false);
    LIST.push({
      name: todo,
      id: id,
      done: false,
      trash: false,
    });

    // add item to local storage
    localStorage.setItem("todo", JSON.stringify(LIST));

    id++;
  }
  input.value = null;
});

// to-do is Done ---------------------------------------
function todoDone(element) {
  console.log(element);

  element.classList.toggle(CHECK);
  // element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to-do ---------------------------------------
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// target an element created dynamically
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJOB = event.target.attributes.job.value; // remove or done

  if (elementJOB == "done") {
    todoDone(element);
  } else if (elementJOB == "remove") {
    removeToDo(element);
  }
});

// bg random change
const bgArr = new Array();
bgArr[0] = "img/bg-1.jpg";
bgArr[1] = "img/bg-2.jpg";
bgArr[2] = "img/bg-3.jpg";
bgArr[3] = "img/bg-4.jpg";
bgArr[4] = "img/bg-5.jpg";

function showBg() {
  var bgNum = Math.round(Math.random() * 5);
  var bg = document.getElementById("bgImg");
  bg.src = bgArr[bgNum];
}
