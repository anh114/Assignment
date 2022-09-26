"use strict";

const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");
const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");

//chuyển dữ liệu ở dạng Javascript Object thành JSON
let dataTransfer = JSON.stringify(petArr);

// Saving static data
function saveDataToFile() {
  let blob = new Blob([dataTransfer], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "pet data");
}

btnExport.addEventListener("click", function () {
  console.log(petArr);
  saveDataToFile();
});

//Import

btnImport.onclick = function () {
  let files = document.getElementById("input-file").files;
  if (files.length <= 0) {
    return false;
  }
  let reader = new FileReader();
  reader.onload = function (e) {
    let result = JSON.parse(e.target.result);
    let formatted = JSON.stringify(result, null, 2);
    document.getElementById("result").value = formatted;
    const petArr = document.getElementById("result").value;
    localStorage.setItem("petArr", petArr);
  };
  reader.readAsText(files.item(0));
};

// 1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
});
