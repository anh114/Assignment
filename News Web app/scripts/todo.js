"use strict";
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const todoArr = getFromStorage("todoArr");
const currentUser = getFromStorage("currentUser");
let taskCompleted = getFromStorage("taskCompleted");
let taskCurrent = getFromStorage("taskCurrent");

//a. Thêm mới Todo và Lưu dữ liệu vào LocalStorage
//tạo một Class mới là Task để chứa các thông tin về Task trong Todo List

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//người dùng nhấn vào nút để thêm mới một Todo
btnAdd.addEventListener("click", function () {
  todoArr.push(new Task(inputTask.value, currentUser[0].userName, false));
  saveToStorage("todoArr", todoArr);
  console.log(currentUser[0].userName);
  //create task of current user
  taskCurrent = todoArr.filter((x) => x.owner === currentUser[0].userName);
  saveToStorage("taskCurrent", taskCurrent);
  renderTask(taskCurrent);
  inputTask.value = "";
});
//b. Hiển thị các Task

const renderTask = function () {
  todoList.innerHTML = "";
  for (let i = 0; i < taskCurrent.length; i++) {
    const ul = document.createElement("ul");
    ul.innerHTML = `
    <li><p id=${i} class=${taskCurrent[i].isDone === true ? "checked" : ""}>${
      taskCurrent[i].task
    }</p><button id=delete--${i} class="close">×</button></li>
    `;
    todoList.appendChild(ul);
    //c. Toggle Task
    const check = document.getElementById(`${i}`);
    check.addEventListener("click", function () {
      check.classList.toggle("checked");

      //kiểm tra Task đó đã hoàn thành hoặc chưa hoàn thành
      check.classList.contains("checked")
        ? (taskCurrent[i].isDone = true)
        : (taskCurrent[i].isDone = false);

      // add các task hoàn thành vào local storage
      saveToStorage("todoArr", todoArr);
      saveToStorage("taskCurrent", taskCurrent);

      taskCompleted = taskCurrent.filter((x) => x.isDone === true);
      // if ((todoArr[i].isDone = true)) taskCompleted.push(todoArr[i]);
      saveToStorage("taskCompleted", taskCompleted);
    });

    //d. Delete Task
    const btnDelete = document.getElementById(`delete--${i}`);
    btnDelete.addEventListener("click", function () {
      //delete task in todoArray
      let taskDelete = todoArr.findIndex((x) => x.task === taskCurrent[i].task);
      console.log(taskDelete);
      todoArr.splice(taskDelete, 1);
      saveToStorage("todoArr", todoArr);
      //delete in Current task
      taskCurrent.splice(i, 1);
      saveToStorage("taskCurrent", taskCurrent);
      // console.log(todoArr.indexOf(taskDelete));
      // todoArr.splice(todoArr.indexOf(taskDelete), 1);
      // console.log(todoArr.indexOf(taskCurrent[i]));
      // update completed task array
      taskCompleted = taskCurrent.filter((x) => x.isDone === true);
      saveToStorage("taskCompleted", taskCompleted);
      //render task
      renderTask(taskCurrent);
    });
  }
};

//render task followed current user

taskCurrent = todoArr.filter((x) => x.owner === currentUser[0].userName);
saveToStorage("taskCurrent", taskCurrent);
renderTask(taskCurrent);
