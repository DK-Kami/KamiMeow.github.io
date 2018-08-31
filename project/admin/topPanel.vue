<template>
    <div>
        <div id="topPanel" class="row mx-0 justify-content-between">
            <div class="left-block">
                <button class="btn btn-outline-dark mr-4">
                    <span class="ti-search"></span>
                </button>
                <button class="btn btn-outline-burgun mr-4">
                    <span class="ti-bell"></span>
                </button>
                <button class="btn btn-primary">
                    <span class="ti-email"></span>
                </button>
            </div>
            <div class="right-block">
                <img src="/sys/img/teacher.jpg" class="avatar">
            </div>
        </div>
        <hr class="w-100 mt-0"/>
    </div>
</template>

<style>
#topPanel {
    position: relative;
    z-index: 0;
    height: 72px;
    padding: 16px 50px;
}
#topPanel .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}
</style>
