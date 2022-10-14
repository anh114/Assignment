"use strict";
const btnLogout = document.getElementById("btn-logout");
const mainContent = document.getElementById("main-content");
const welcomeMsg = document.getElementById("welcome-message");
const loginModel = document.getElementById("login-modal");
const userArr = getFromStorage("userArr");
const currentUser = getFromStorage("currentUser");

console.log(currentUser);
console.log(userArr);
//4. Home Page

//kiểm tra người dùng đã dăng nhập
if (currentUser.length > 0) {
  loginModel.style.display = "none";
  //hiển thị thông điệp chào mừng
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].userName === currentUser[0].userName) {
      welcomeMsg.textContent = `Welcome ${userArr[i].firstName}`;
    }
  }
}

//5. Chức năng Logout
btnLogout.addEventListener("click", function () {
  //xóa User hiện tại ở Localstorage
  // currentUser.pop();
  // console.log(currentUser);
  localStorage.removeItem("currentUser");
  //đưa người dùng trở lại trang Login
  window.location.href = "../pages/login.html";
});
