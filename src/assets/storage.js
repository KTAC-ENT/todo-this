// Step one
window.indexedDB = window.indexedDB || window.mozIndexedDb || window.webkitIndexedDB || window.msIndexedDB;

// Step two
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

// Step three
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


if(!window.indexedDB) {
  alert('Your bowser is not supported indexedDBr')
}
let db;
// version number = 1
const request = window.indexedDB.open('ktacent', 1);

request.onerror = function (event) {
  console.log("error: " + event.target.result);
}

request.onsuccess = function (event) {
  db = request.result;

  console.log("Success " +db);
}

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  const objectSore = db.createObjectStore("KtacEnt");
}
