"use strict";

//3. Chức năng: Quản lý Breed
const breedArr = getFromStorage("breedArr");
console.log(breedArr);
const petBreed = document.getElementById("input-breed");
const petType = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
const deleteBtn = document.querySelector(".btn-danger");
const submitBtn = document.getElementById("submit-btn");

//a. Lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng
//hien thi breed

const renderBreed = function (breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <td id="breedId">${i + 1}</td>
    <td>${breedArr[i].name}</td>
    <td>${breedArr[i].type}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].name
    }')">Delete</button>
    </td>
    </tr> `;
    tableBodyEl.appendChild(row);
  }
};
renderBreed(breedArr);
//c. Xóa breed
const deleteBreed = (breed) => {
  if (confirm("Are you sure?") == true) {
    let breedDelete = breedArr.findIndex((x) => x.name == breed);
    console.log(breedDelete);
    //delete breed
    breedArr.splice(breedDelete, 1);
    console.log(breedArr);

    saveToStorage("breedArr", breedArr);
    renderBreed(breedArr);
  }
};
//Xóa các dữ liệu vừa nhập
const clearInput = function () {
  petType.value = "";
  petBreed.value = "";
};

// b. Thêm Breed
submitBtn.addEventListener("click", function () {
  const data = {
    name: petBreed.value,
    type: petType.value,
  };
  // dien du thong tin
  function validateData(data) {
    if (data.name == "" || data.type == "") {
      alert("Please fill form");
      return false;
    } else {
      return true;
    }
  }
  //tao them breed khi data hop le
  const validate = validateData(data);
  // them thu cung vao danh sach
  if (validate) {
    breedArr.push(data);

    clearInput();
    renderBreed(breedArr);
    saveToStorage("breedArr", breedArr);
  }
});

// 1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
});
