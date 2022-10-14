"use strict";

const inputSearch = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const newsData = getFromStorage("newsData");
let totalPage = getFromStorage("totalPage");
pageNum.textContent = 1;
let keywords;
let page = 1;
async function getNewsAPI(keywords, page, pageSize) {
  try {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&page=${page}&pageSize=${pageSize}&apiKey=896be292966a455bb15f0208f9c0c9a4`
    );
    let data = await response.json();

    renderNews(data);
  } catch (err) {
    console.error(`${err}`);
    newsContainer.textContent = `${err.message}`;
  }
}
const renderNews = function (data) {
  console.log(data);
  const totalResults = data.totalResults;
  totalPage = Math.ceil(totalResults / `${newsData.newsPerPage}`);
  console.log(`total page: ${totalPage}`);
  saveToStorage("totalPage", totalPage);
  newsContainer.innerHTML = "";
  for (let i = 0; i < data.articles.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card flex-row flex-wrap">
  				<div class="card mb-3">
  					<div class="row no-gutters">
  						<div class="col-md-4">
  							<img src=${data.articles[i].urlToImage}
  								class="card-img"
  								alt="">
  						</div>
  						<div class="col-md-8">
  							<div class="card-body">
  								<h5 class="card-title">${data.articles[i].title}</h5>
  								<p class="card-text">${data.articles[i].content}</p>
  								<a href=${data.articles[i].url}
  									class="btn btn-primary">View</a>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  `;
    newsContainer.appendChild(div);
  }
};
//7. Chuyển trang cho các bài viết
//check điều kiện các nút Next và Prev
function btnCheck() {
  if (Number(pageNum.textContent) === 1) {
    btnPrev.style.display = "none";
    btnNext.style.display = "block";
  } else if (
    Number(pageNum.textContent) > 1 &&
    pageNum.textContent < totalPage
  ) {
    btnPrev.style.display = "block";
    btnNext.style.display = "block";
  } else if (Number(pageNum.textContent) === totalPage) {
    btnNext.style.display = "none";
    btnPrev.style.display = "block";
  } else if (Number(pageNum.textContent) > totalPage) {
    pageNum.textContent = totalPage;
  } else if (Number(pageNum.textContent) < 1) {
    pageNum.textContent = 0;
  }
}

//Tìm kiếm bài viết theo từ khóa
btnSearch.addEventListener("click", function () {
  if (inputSearch.value === "") {
    alert("Please enter keywords");
    return false;
  } else {
    keywords = inputSearch.value.toLowerCase();
    // hiển thị lúc đầu
    function init() {
      if (!newsData.newsPerPage) {
        getNewsAPI(keywords, 1, 5);
        newsData.newsPerPage = 5;
        btnCheck();
      } else {
        // render after setting
        getNewsAPI(keywords, 1, `${newsData.newsPerPage}`);
        btnCheck();
      }
    }
    init();

    //ấn Next và Prev button
    btnNext.addEventListener("click", function () {
      getNewsAPI(keywords, pageNum.textContent++, `${newsData.newsPerPage}`);
      btnCheck();
    });

    btnPrev.addEventListener("click", function () {
      getNewsAPI(keywords, pageNum.textContent--, `${newsData.newsPerPage}`);
      btnCheck();
    });
  }
});
