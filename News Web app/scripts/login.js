"use strict";
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");
const userArr = getFromStorage("userArr");
const currentUser = getFromStorage("currentUser");

//Clear input
const clearInput = function () {
  inputUserName.value = "";
  inputPassword.value = "";
};
console.log(userArr);

//3. Chức năng Login

btnLogin.addEventListener("click", function () {
  const data = {
    userName: inputUserName.value,
    password: inputPassword.value,
  };
  // parseUser(data);

  const validate = function (data) {
    for (let i = 0; i < userArr.length; i++) {
      if (data.userName === "" || data.password === "") {
        alert("Please fill form");
        return false;
      } else if (
        data.userName == userArr[i].userName &&
        data.password == userArr[i].password
      ) {
        alert("Login success!");
        return true;
      }
    }
    for (let i = 0; i < userArr.length; i++) {
      if (
        data.userName === userArr[i].userName &&
        data.password !== userArr[i].password
      ) {
        alert("Wrong password");
        return false;
      }
    }
    for (let i = 0; i < userArr.length; i++) {
      if (data.userName !== userArr[i].userName) {
        alert("Account do not exist");
        return false;
      }
    }
  };

  // người dùng đăng nhập thành công
  if (validate(data)) {
    saveToStorage("userArr", userArr);
    currentUser.push(data);
    saveToStorage("currentUser", currentUser);
    clearInput();
    window.location.href = "../index.html";
  }
});
