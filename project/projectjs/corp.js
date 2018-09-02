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

    console.log(hide.style.display);
    if (hide.style.display == "none") {
        hide.style.cssText = "display: flex"
        arrow.style.cssText = "transform: rotate(0deg)"
        console.log("baka");
    } else {
        hide.style.cssText = "display: none"
        arrow.style.cssText = "transform: rotate(-90deg)"
        console.log("baka baka");
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