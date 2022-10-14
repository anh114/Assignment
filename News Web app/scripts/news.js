"use strict";
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const content = document.getElementById("content");
let totalPage = getFromStorage("totalPage");
// let perPage = 5;
const newsData = getFromStorage("newsData");
let page = 1;
let pageSize;

//6. Hiển thị các bài viết
const NewsData = async function (country, category, page, pageSize) {
  try {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=896be292966a455bb15f0208f9c0c9a4`
    );
    let data = await response.json();
    renderNews(data);
  } catch (err) {
    console.error(`${err}`);
    newsContainer.textContent = `${err.message}`;
  }
};
// NewsData("us, 'technology", 1, 5);
const renderNews = function (data) {
  console.log(data);
  const totalResults = data.totalResults;
  totalPage = Math.ceil(totalResults / `${newsData.newsPerPage}`);
  console.log(`total page: ${totalPage}`);
  console.log(newsData.newesCategory);
  console.log(newsData.newsPerPage);
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
  console.log(pageNum.textContent);

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

// hiển thị lúc đầu
function init() {
  if (!newsData.newsPerPage) {
    NewsData("us", "general", 1, 5);
    newsData.newesCategory = "general";
    newsData.newsPerPage = 5;
    btnCheck();
  } else {
    // render after setting
    NewsData("us", `${newsData.newesCategory}`, 1, `${newsData.newsPerPage}`);
    btnCheck();
  }
}
init();

//ấn Next và Prev button
btnNext.addEventListener("click", function () {
  NewsData(
    "us",
    `${newsData.newesCategory}`,
    pageNum.textContent++,
    `${newsData.newsPerPage}`
  );
  btnCheck();
});

btnPrev.addEventListener("click", function () {
  NewsData(
    "us",
    `${newsData.newesCategory}`,
    pageNum.textContent--,
    `${newsData.newsPerPage}`
  );
  btnCheck();
});
