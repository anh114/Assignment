"use strict";
const inputNewsPerPage = document.getElementById("input-page-size");
const inputNewsCategory = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");
const newsData = getFromStorage("newsData");

//9. Thay đổi thiết lập
btnSave.addEventListener("click", function () {
  const newsData = {
    newsPerPage: inputNewsPerPage.value,
    newesCategory: inputNewsCategory.value,
  };

  if (newsData.newsPerPage === "") {
    alert("Please enter Number");
    return false;
  } else {
    console.log(newsData);

    saveToStorage("newsData", newsData);
  }
});
