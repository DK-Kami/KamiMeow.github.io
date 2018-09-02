var corp = document.getElementById("list");
var corpData = document.getElementById("corp-data");
var corpSearch = document.getElementById("corp-search");

function sent(id, value) {
    var text = document.getElementById(id);
    text.textContent = value;
}

function openDown(id) {
    corp.style.cssText = "display: none";
    corpSearch.style.cssText = "display: block !important";
    corpData.style.cssText = "display: flex !important";
}

function toogle() {
    var hide = document.getElementById("hide");
    var arrow = document.getElementById("arrow");

    console.log(hide);

    console.log(hide.style.display);
    if (hide.style.display == "flex") {
        hide.style.cssText = "display: none"
        arrow.style.cssText = "transform: rotate(-90deg)"
    } else {
        hide.style.cssText = "display: flex"
        arrow.style.cssText = "transform: rotate(0deg)"
    }
}

function change(bool) {
    var nav1 = document.getElementById("nav1");
    var nav2 = document.getElementById("nav2");
    if (bool) {
        nav2.classList = "col-12";
        // document.getElementById("collect-2").style.cssText = "display: none";
        if (nav1.classList == "col-12 nav-active") {
            nav1.classList = "col-12";
            document.getElementById("collect-1").style.cssText = "display: none";
        } else {
            nav1.classList = "col-12 nav-active";
            document.getElementById("collect-1").style.cssText = "display: block";
        }
    } else {
        nav1.classList = "col-12";
        // document.getElementById("collect-1").style.cssText = "display: none";
        if (nav2.classList == "col-12 nav-active") {
            nav2.classList = "col-12";
            document.getElementById("collect-1").style.cssText = "display: none";
        } else {
            nav2.classList = "col-12 nav-active";
            document.getElementById("collect-1").style.cssText = "display: block";
        }
    }
}

function sort(array) {
    arr = [];
    var i = 0;
    for (const child of array) {
        if (child.nodeName == "DIV") {
            if (i != 0) arr[i - 1] = child;
            i++;
        }
    }
    return arr;
}

function show(id) {
    cell1 = document.getElementsByClassName("cell-1");
    cell2 = document.getElementsByClassName("cell-2");
    cell3 = document.getElementsByClassName("cell-3");

    for (const cell of cell1) { cell.classList = "col-4 cell-1" };
    for (const cell of cell2) { cell.classList = "col-4 cell-2" };
    for (const cell of cell3) { cell.classList = "col-4 cell-3" };

    document.getElementById("cap-1").classList = "col-4";
    document.getElementById("cap-2").classList = "col-4";
    document.getElementById("cap-3").classList = "col-4";

    if (id == 1) {
        for (const cell of cell1) { cell.classList = "col-4 done-item cell-1" };
        document.getElementById("cap-1").classList = "col-4 done";
    } else if (id == 2) {
        for (const cell of cell2) { cell.classList = "col-4 done-item cell-2" };
        document.getElementById("cap-2").classList = "col-4 done";
    } else {
        for (const cell of cell3) { cell.classList = "col-4 done-item cell-3" };
        document.getElementById("cap-3").classList = "col-4 done";
    }
}