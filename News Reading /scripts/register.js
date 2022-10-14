"use strict";
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputConfirmPass = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

// const key = "userArr";
const userArr = getFromStorage("userArr");

//1. Tạo Class User
class Users {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
}

//Clear input
function clearInput() {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputUserName.value = "";
  inputPassword.value = "";
  inputConfirmPass.value = "";
}
//chuyển từ JS Object sang Class Instance
function parseUser(data) {
  const user = new Users(
    data.firstName,
    data.lastName,
    data.userName,
    data.password
  );
  return user;
}
//2. Chức năng Register
// xử lý sự kiện click vào nút Register
btnRegister.addEventListener("click", function () {
  const data = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    userName: inputUserName.value,
    password: inputPassword.value,
    confirmPassword: inputConfirmPass.value,
  };
  //Gọi hàm validate để kiểm tra form hợp lệ

  const validate = function (data) {
    //Username không được trùng với Username của các người dùng trước đó.
    for (let i = 0; i < userArr.length; i++) {
      if (data.userName === userArr[i].userName) {
        alert("user name must be unique");
        return false;
      }
    }
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.userName === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      alert("Please fill form!");
      return false;
    } else if (data.password !== data.confirmPassword) {
      alert("Please fill Conrfirm Password same as Password");
      return false;
    } else if (data.password.length < 8) {
      alert("Password has at least 8 characters");
      return false;
    } else {
      return true;
    }
  };
  //Khởi tạo user mới với các dữ liệu hợp lệ
  if (validate(data)) {
    let user = new Users(
      data.firstName,
      data.lastName,
      data.userName,
      data.password
    );
    console.log(user);
    //chuyển từ JS Object sang Class Instance
    // parseUser(user);
    userArr.push(user);
    console.log(userArr);
    saveToStorage("userArr", userArr);
    clearInput();
    window.location.href = "../pages/login.html";
  }
});
