var year = document.getElementById("year");
var semestr = document.getElementById("semestr");

var yearArr = [];
var semestrArr = [];

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

yearArr = sort(year.childNodes);
semestrArr = sort(semestr.childNodes);



// console.log(yearArr);
// console.log(semestrArr);