"use strict";

const petArr = getFromStorage("petArr");
const tableBodyEl = document.getElementById("tbody");
const containerForm = document.getElementById("container-form");
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");

const breedArr = getFromStorage("breedArr");
// filter Dog
let dogArr = breedArr.filter((type) => type.type == "Dog");

// filter cat
let catArr = breedArr.filter((type) => type.type == "Cat");

// Xóa các dữ liệu vừa nhập trên Form
const clearInput = function () {
  inputId.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "";
  inputWeight.value = "";
  inputLength.value = "";
  inputBreed.value = "";
  inputColor.value = "#000000";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
};

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
    
    <td>${date}</td>
    <td>
	<button class="btn btn-warning" id="edit--${i}">Edit</button>
</td>`;
    tableBodyEl.appendChild(row);

    //người dùng nhấn vào nút "Edit"
    document
      .getElementById(`edit--${i}`)
      .addEventListener("click", function () {
        // 2.Khi nhấn vào Edit một thú cưng nào đó, bạn sẽ hiển thị thêm một Form để chỉnh sửa
        containerForm.classList.remove("hide");
        //các giá trị của input sẽ là giá trị hiện tại của thú cưng đó:
        inputId.value = `${petArr[i].id}`;
        inputName.value = `${petArr[i].name}`;
        inputAge.value = `${petArr[i].age}`;
        inputType.value = petArr[i].type;
        renderType(petArr[i].type);
        inputWeight.value = `${petArr[i].weight}`;
        inputLength.value = `${petArr[i].length}`;
        inputColor.value = `${petArr[i].color}`;
        renderBreed(petArr[i].type == "Dog" ? dogArr : catArr);
        inputBreed.value = `${petArr[i].breed}`;
        inputVaccinated.checked = petArr[i].vaccinated;
        inputDewormed.checked = petArr[i].dewormed;
        inputSterilized.checked = petArr[i].sterillzed;
      });
  }
};

//3. Validate dữ liệu hợp lệ
function validateData(data) {
  if (data.name == "") {
    alert("Please fill form");
    return false;
  } else if (isNaN(data.age) || isNaN(data.weight) || isNaN(data.length)) {
    alert("Please fill number");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be betwwen 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (data.type == "") {
    alert("Please select Type!");
    return false;
  } else if (data.breed == "") {
    alert("Please select Breed");
    return false;
  } else {
    return true;
  }
}
renderTable(petArr);

//  người dùng nhấn nút Submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: inputId.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    length: parseInt(inputLength.value),
    breed: inputBreed.value,
    color: inputColor.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterillzed: inputSterilized.checked,

    date: new Date(),
  };

  const validate = validateData(data);
  // them thu cung vao danh sach

  if (validate) {
    //delete old pet]
    let petDelete = petArr.findIndex((x) => x.id === inputId.value);
    petArr.splice(petDelete, 1);
    //update new pet
    petArr.push(data);
    console.log(petArr);

    saveToStorage("petArr", petArr);
    renderTable(petArr);
    containerForm.classList.add("hide");
    clearInput();
  }
});

// đặt chế độ ban đầu type của pet
function renderType(type) {
  inputType.innerHTML = "";
  let typeArray = [{ name: "Dog" }, { name: "Cat" }];
  for (let i = 0; i < typeArray.length; i++) {
    const option = document.createElement("option");
    option.textContent = typeArray[i].name;
    option.value = typeArray[i].name;
    option.selected = type == typeArray[i].name ? "selected" : "";
    inputType.appendChild(option);
  }
}

// đặt chế độ ban đầu breed của pet và lọc theo type
function renderBreed(breed) {
  inputBreed.innerHTML = "";

  for (let i = 0; i < breed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `
      <option value="${breed[i].name}" ${breed[i].name ? "selected" : ""}>${
      breed[i].name
    }</option>`;
    inputBreed.appendChild(option);
  }
}

inputType.addEventListener("change", function () {
  inputBreed.innerHTML = "";
  if (inputType.value == "Dog") {
    renderBreed(dogArr);
  } else if (inputType.value == "Cat") {
    renderBreed(catArr);
  }
});

// 1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
});
