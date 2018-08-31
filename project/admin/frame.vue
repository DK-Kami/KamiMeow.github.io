<template>
    <div class="row mx-0 h-100" id="admin">
        <leftPanel class="col-auto px-0"></leftPanel>
        <div class="col px-0">
            <topPanel></topPanel>
            <router-view class="p-4"></router-view>
        </div>
    </div>
</template>

<script>
import leftPanel from './leftPanel.vue';
import topPanel from './topPanel.vue';

export default {
    components: {
        leftPanel,
        topPanel,
    }
}
</script>

<style>
#admin {
}
.frame {
    position: fixed;
    width: 100%;
    height: 100%;
}
.uploadedImg {
    max-width: 200px;
    max-height: 200px;
}
</style>
