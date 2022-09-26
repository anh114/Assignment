"use strict";
// 1. Create storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//2. Retrieve from the storage

function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
