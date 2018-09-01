var abUniver = document.getElementById("abUniver");
var abStudent = document.getElementById("abStudent");
var abCorp = document.getElementById("abCorp");

var table = document.getElementById("table");

var cont = [
    "<tr><th>ВУЗ:</th><td>МИРЭА Российский технологический университет</td></tr><tr><th>Город:</th><td>Москва</td></tr><tr><th>Округ:</th><td>Юго-Западный АО</td></tr><tr><th>Регион:</th><td>99</td></tr>",
    "<tr><th>Статус:</th><td>Студент целевик</td></tr><tr><th>Направление подготовки:</th><td>Машиностроение</td></tr><tr><th>Форма обучения:</th><td>Очная</td></tr><tr><th>УГСН:</th><td>23840</td></tr><tr><th>Год поступления:</th><td>2016</td></tr><tr><th>Год окончания:</th><td>2019</td></tr><tr><th>Курс:</th><td>3</td></tr><tr><th>Номер группы:</th><td>329</td></tr>",
    "<tr>   <th>Организация, с которой заключено соглашение о целевом обучении</th>    <td>АО Концерн 'Калашников'</td></tr><tr>    <th>№ и дата договора о целевом обучении</th>    <td>№ 21 23.10.2016</td></tr><tr>    <th>Обучение на базовой кафедре</th>    <td>Пройдено</td></tr><tr>    <th>Наименование темы ВКР (для находящихся на последнем году обучения)</th>    <td>-</td></tr><tr>    <th>Ответственный куратор</th>    <td>Михаилов Сергей Иванович</td></tr><tr>    <th>Телефон ответственного куратора</th>    <td>+7 (999) 999-99-99</td></tr><tr>    <th>E-mail ответственного куратора</th>    <td>12345678@mail.com</td></tr><tr>    <th>Ответственный за провождение практики со стороны предприятия</th>    <td>Иванов Иван Петрович</td></tr><tr>    <th>Почта ответственного за провождение практики со стороны предприятия</th>    <td>234892mail.com</td></tr><tr>    <th>Телефон ответственного за провождение практики со стороны предприятия</th>    <td>+7 (999) 999-99-99</td></tr>"
]

function clearClass() {
    abUniver.className = "navig";
    abStudent.className = "navig";
    abCorp.className = "navig";
}

abUniver.addEventListener("click", function() {
    table.innerHTML = cont[0];
    clearClass();
    abUniver.className = "navig active-nav";
});

abStudent.addEventListener("click", function() {
    table.innerHTML = cont[1];
    clearClass();
    abStudent.className = "navig active-nav";
});

abCorp.addEventListener("click", function() {
    table.innerHTML = cont[2];
    clearClass();
    abCorp.className = "navig active-nav";
});

window.onload = function() {
    table.innerHTML = cont[0];
}