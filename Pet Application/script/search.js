"use strict";
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");
const tableBodyEl = document.getElementById("tbody");
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputType = document.getElementById("input-type");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

//Hiển thị Breed trong màn hình quản lý thú cưng
inputBreed.innerHTML = `<option value="" selected>Select Breed</option>`;

for (let i = 0; i < breedArr.length; i++) {
  const option = document.createElement("option");
  option.innerHTML = `
  <option value="${breedArr[i].name}">${breedArr[i].name}</option>`;
  inputBreed.appendChild(option);
}

//1. Hiển thị lại thông tin từ Home
let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

const renderTable = function rendalTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    
    <td>${petArr[i].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
    <td>${
      petArr[i].vaccinated
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      petArr[i].dewormed
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      petArr[i].sterillzed
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    
    <td>${date}</td>`;
    tableBodyEl.appendChild(row);
  }
};
renderTable(petArr);

//// Xóa các dữ liệu vừa nhập trên Form
const clearInput = function () {
  inputId.value = "";
  inputName.value = "";
  inputType.value = "";
  inputBreed.value = "";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
};

// let petCheck = petArr.filter(
//   (pet) =>
//     inputId.value == "" ||
//     pet.id.toLowerCase().includes(inputId.value.toLowerCase())
// );
// .filter(
//   (pet) =>
//     inputName.value == "" ||
//     pet.name.toLowerCase().includes(inputName.value.toLowerCase())
// )
// .filter((pet) => inputType.value == "" || inputType.value == pet.type)
// .filter((pet) => inputBreed.value == "" || pet.breed == inputBreed.value);

// FIND Button
findBtn.addEventListener("click", function () {
  tableBodyEl.innerHTML = "";

  // let petVaccinated = petCheck.filter((pet) => pet.vaccinated == true);
  // let petDewormed = petCheck.filter((pet) => pet.dewormed == true);
  // let petSterillzed = petCheck.filter((pet) => pet.sterillzed == true);

  // const petFilter = function (pet) {
  //   switch (true) {
  //     case pet.vaccinated == true:
  //       return petCheck.filter((pet) => pet.vaccinated == true);
  //       break;
  //     case pet.dewormed == true:
  //       return petCheck.filter((pet) => pet.dewormed == true);
  //       break;
  //     case pet.sterillzed == true:
  //       return petCheck.filter((pet) => pet.sterillzed == true);
  //       break;
  //     default:
  //       return petCheck;
  //   }
  // };

  let petCheck = [...petArr];
  if (inputId.value !== "") {
    petCheck = petCheck.filter((pet) =>
      pet.id.toLowerCase().includes(inputId.value.toLowerCase())
    );
  }
  if (inputName.value !== "") {
    petCheck = petCheck.filter((pet) =>
      pet.name.toLowerCase().includes(inputName.value.toLowerCase())
    );
  }
  if (inputType.value !== "") {
    petCheck = petCheck.filter((pet) => pet.type === inputType.value);
  }
  if (inputBreed.value !== "") {
    petCheck = petCheck.filter((pet) => pet.breed === inputBreed.value);
  }
  if (inputVaccinated.checked === true) {
    petCheck = petCheck.filter((pet) => pet.vaccinated === true);
  }
  if (inputDewormed.checked === true) {
    petCheck = petCheck.filter((pet) => pet.dewormed === true);
  }
  if (inputSterilized.checked === true) {
    petCheck = petCheck.filter((pet) => pet.sterillzed === true);
  }
  console.log(petCheck);
  renderTable(petCheck);
  clearInput();
});

// .filter((pet) => inputVaccinated.checked == true)
// .filter((pet) => inputDewormed.checked == true);
// .filter((pet) => inputSterilized.checked == true);

// 1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
});
