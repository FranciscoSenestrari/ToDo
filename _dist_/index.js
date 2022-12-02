/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import moment from "../_snowpack/pkg/moment.js";

const button = document.querySelector(".addTask");
const taskContainer = document.querySelector(".task-container");

const taskOnline = document.querySelector(".onlineTask");
const taskEnd = document.querySelector(".endedTask");
const taskAll = document.querySelector(".allTask");
const day = document.querySelector(".day");

let countOnline = 0;
let countEnded = 0;
let taskId;
let checkbox;

const input = document.querySelector(".inputTask");
let taskList = [];
taskList = JSON.parse(localStorage.getItem("Task"));

const createTask = () => {
  window.location.reload();
  if (input.value != "") {
    let task = {
      id: Math.random().toString(16).slice(2),
      title: input.value,
      description: null,
      state: true,
    };
    taskList.push(task);
    update();
    show();
  } else {
    alert("Field is empy");
  }
};
const countTask = () => {
  taskList.forEach((element) => {
    if (!element.state) {
      countEnded++;
    } else countOnline++;
  });
};
const showCounter = () => {
  countOnline = 0;
  countEnded = 0;
  countTask();
  taskEnd.textContent = countEnded;
  taskOnline.textContent = countOnline;
  taskAll.textContent = countEnded + countOnline;
};
const showTask = () => {
  taskList.forEach((element) => {
    const task = document.createElement("div");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const span = document.createElement("span");
    const container = document.createElement("div");
    const buttonDelet = document.createElement("button");

    task.className = "task";
    task.id = element.id;
    checkbox.type = "checkbox";
    checkbox.checked = !element.state;
    checkbox.dataset.id = element.id;
    buttonDelet.dataset.id = element.id;
    checkbox.addEventListener("change", isCheked);
    title.textContent = element.title;
    span.className = "material-symbols-outlined";
    span.textContent = "delete";
    container.appendChild(checkbox);
    container.appendChild(title);
    buttonDelet.appendChild(span);
    buttonDelet.addEventListener("click", deletTask);
    task.appendChild(container);
    task.appendChild(buttonDelet);
    taskContainer.appendChild(task);
  });
};
const update = () => {
  window.localStorage.setItem("Task", JSON.stringify(taskList));
};

const isCheked = (e) => {
  const id = e.currentTarget.dataset.id;
  const found = taskList.find((task) => task.id == id);
  if (found) {
    found.state = !found.state;
    showCounter();
    update();
    console.log(e);
  }
};

const deletTask = (e) => {
  const id = e.currentTarget.dataset.id;
  const parent = e.currentTarget.parentNode;
  taskList = taskList.filter((item) => item.id !== id);
  update();
  window.location.reload();
};
const checkEmpy = () => {
  if (input.value == "") {
    alert("Field is empy");
  }
};
const show = () => {
  showCounter();
  showTask();
  day.textContent = moment().format("[Today is]:  DD / M");
};

show();
button.addEventListener("click", createTask);
