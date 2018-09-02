var text = document.getElementById("sent");
var corp = document.getElementById("list");
var corpData = document.getElementById("corp-data");
var corpSearch = document.getElementById("corp-search");

function sent(value) {
    text.textContent = value;
}

function openDown(id) {
    corp.style.display = "none";
    corpSearch.style.display = "none";
    corpData.childNodes[id].style.display = "block";
}