<template>
    <ul class="nav flex-column left-panel" id="left-panel" :class="{inactive: !open}">
        <li class="nav-item mx-0 panel-header">
            <div class="col">
                <div class="logo"></div>
            </div>
            <button class="btn bg-dark btn-toggle-menu d-none d-md-block" @click="open = !open">
                <span class="ti-menu-alt toggle-menu"></span>
            </button>
        </li>
        <li class="nav-item elem">
            <router-link to="/admin">
                <span class="icon ti-panel"></span>
                <span class="text">Статистика</span>
            </router-link>
        </li>
        <li class="nav-item title">
            <span>Контент</span>
        </li>
        <li class="nav-item elem">
            <router-link to="/admin/addNews">
                <span class="icon ti-receipt"></span>
                <span class="text">Создание новостей</span>
            </router-link>
        </li>
        <li class="nav-item elem">
            <a href="#">
                <span class="icon ti-time"></span>
                <span class="text">Создание анонсов</span>
            </a>
        </li>
        <li class="nav-item elem">
            <a href="#headerfooter-collapse" data-toggle="collapse">
                <span class="icon ti-layout-accordion-separated"></span>
                <span class="text">Блоки футер/шапка</span>
                <span class="right-icon ti-angle-right"></span>
            </a>
            <div class="collapse subMenu" id="headerfooter-collapse">
                <ul class="nav flex-column">
                    <li class="nav-item elem">
                        <a href="#">
                            <span class="icon ti-time"></span>
                            <span class="text">Добавление блоков</span>
                        </a>
                    </li>
                    <li class="nav-item elem">
                        <a href="#">
                            <span class="icon ti-time"></span>
                            <span class="text">Редактирование блоков</span>
                        </a>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
}
</script>

<style>
#admin .left-panel {
    position: relative;
    z-index: 5;
    width: 300px;
    height: 100%;
    color: #8b939b;
    background-color: #292b35;
    transition: 0.3s;
}
#admin .left-panel a {
    color: unset !important;
    text-decoration: none;
}
#admin .left-panel .btn-toggle-menu {
    position: absolute;
    transition: 0.3s;
    top: 16px;
    right: 1rem;
}
#admin .left-panel .toggle-menu {
    font-weight: 700;
    color: #8b939b;
    font-size: 1.5rem;
    vertical-align: middle;
}
#admin .left-panel .nav-item {
    position: relative;
    padding: unset;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 1.5rem;
    background-color: #292b35;
    border: none;
    font-weight: unset;
    font-size: unset;
}
#admin .left-panel .nav-item.title {
    font-size: 1.3rem;
    height: 63px;
    color: #585b67;
}
#admin .left-panel .nav-item.elem {
    vertical-align: middle;
}
#admin .left-panel .nav-item.elem > a {
    position: relative;
    display: block;
    width: 100%;
    transition: 0.3s;
}
#admin .left-panel .nav-item.elem > a:hover {
    color: white !important;
}
#admin .left-panel .right-icon {
    position: absolute;
    top: 4px;
    right: 1rem;
    vertical-align: middle;
}
#admin .left-panel .icon {
    margin-right: 1.5rem;
    vertical-align: middle;
}
#admin .left-panel .logo {
    background: url('/sys/img/ivnix_logo.png') no-repeat;
    background-size: contain;
    height: 40px;
}
#admin .left-panel .collapse > ul {
}

#admin .left-panel.inactive {
    width: 75px;
}
#admin .left-panel.inactive .logo {
    height: 40px;
}
#admin .left-panel.inactive .btn-toggle-menu {
    right: -2rem;
}
#admin .left-panel.inactive .nav-item {
    margin-left: 0;
    text-align: center;
}
#admin .left-panel.inactive > .elem > a .icon {
    margin-right: 0;
}
#admin .left-panel.inactive > .elem > a  .text {
    display: none;
    transform: scale(0);
}
#admin .left-panel.inactive .right-icon {
    display: none;
}
#admin .left-panel.inactive .title span {
    display: none;
}
#admin .left-panel.inactive .subMenu {
    position: absolute;
    top: 0;
    left: 100%;
    max-width: 225px;
}
#admin .left-panel.inactive .subMenu .nav-item {
    text-align: left;
}
#admin .left-panel.inactive .subMenu .nav-item {
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
