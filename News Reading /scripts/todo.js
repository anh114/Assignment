"use strict";
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const todoArr = getFromStorage("todoArr");
const currentUser = getFromStorage("currentUser");
let taskCompleted = getFromStorage("taskCompleted");
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
  renderTask(todoArr);
  saveToStorage("todoArr", todoArr);
  inputTask.value = "";
});
console.log(todoArr);
//b. Hiển thị các Task

const renderTask = function () {
  todoList.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].owner === currentUser[0].userName) {
      const ul = document.createElement("ul");
      ul.innerHTML = `
    <li id=${i}>${todoArr[i].task}<button id=delete--${i} class="close">×</button></li>
    `;
      todoList.appendChild(ul);
      //c. Toggle Task
      const check = document.getElementById(`${i}`);
      check.addEventListener("click", function () {
        check.classList.toggle("checked");

        //kiểm tra Task đó đã hoàn thành hoặc chưa hoàn thành
        check.classList.contains("checked")
          ? (todoArr[i].isDone = true)
          : (todoArr[i].isDone = false);
        saveToStorage("todoArr", todoArr);
        // add các task hoàn thành vào local storage
        taskCompleted = todoArr.filter((x) => x.isDone === true);
        // if ((todoArr[i].isDone = true)) taskCompleted.push(todoArr[i]);
        saveToStorage("taskCompleted", taskCompleted);
      });
      //d. Delete Task
      const btnDelete = document.getElementById(`delete--${i}`);
      btnDelete.addEventListener("click", function (e) {
        todoArr.splice(i, 1);
        saveToStorage("todoArr", todoArr);

        //Update taskCompleted
        // taskCompleted = todoArr.filter((x) => x.isDone === true);
        taskCompleted.splice(i, 1);
        saveToStorage("taskCompleted", taskCompleted);
        renderTask(todoArr);
        // dừng sự kiện check task complete trong DOM
        e.stopPropagation;
      });
    }
  }
};
renderTask(todoArr);

// localStorage.removeItem("taskCompleted");
