var row1 = document.getElementById("row1");
var row2 = document.getElementById("row2");

row1.addEventListener("click", function() {
    row1.classList = "row-nav active-row";
    row2.classList = "row-nav";
    console.log("1");
})
row2.addEventListener("click", function() {
    row2.classList = "row-nav active-row";
    row1.classList = "row-nav";
})