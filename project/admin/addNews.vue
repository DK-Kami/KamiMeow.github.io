<template>
    <div id="addNews">
        <form class="row mx-0" @submit.prevent="save">
            <div class="col-lg-6">
                <div class="form-group">
                    <label for="newsName">Введите название новости</label>
                    <input type="text" class="form-control" id="newsName" placeholder="Название">
                </div>
                <div id="newsText">
                    <div class="form-group">
                        <label for="newsTextarea">Введите текст новости</label>
                        <textarea class="form-control" id="newsTextarea" rows="20"></textarea>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div id="tags">
                    <label for="tags-select">Добавление тегов</label>
                    <form class="input-group mb-2" @submit.prevent="addTag">
                        <select class="custom-select" id="tags-select" v-model="nowTag" required>
                            <option value="" disabled>Выберите тег</option>
                            <option v-for="tag in clearTags" :value="tag" :key="tag">{{tag}}</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">
                                Добавить
                            </button>
                        </div>
                    </form>
                    <button v-for="(tag, index) in tags" class="tag btn btn-outline-burgun" @click="delTag(index)" type="button">{{tag}}</button>
                </div>
                <div id="fileUpload" class="mt-2">
                    <label for="newsImage">Добавление изображений</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="newsImage" @change="fileToVue">
                            <label for="newsImage" class="custom-file-label">Выберите изображение</label>
                        </div>
                    </div>
                    <div class="row mx-0">
                        <div v-for="(file, index) in files" class="img-box" :key="file.lastModified">
                            <img :src="images[index].content" class="uploadedImg">
                            <span class="d-block align-self-end">{{file.name}}</span>
                            <button @click="remFile(index)" class="btn" type="button">
                                <span class="ti-close"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'addNews',
    data() {
        return {
            tagsBefore: ['test1','ta2','testsad2','test2','tets2','tsetes','sefs','sfsdf','sfdfd'],
            tags: [],
            nowTag: '',
            files: [],
            images: [],
        };
    },
    computed: {
        clearTags() {
            return this.tagsBefore.filter((tag) => {
                return !this.tags.some((selectedTag) => {
                    return tag === selectedTag;
                });
            });
        }
    },
    methods: {
        addTag() {
            this.tags.push(this.nowTag);
            this.nowTag = '';
        },
        delTag(index) {
            this.tags.splice(index, 1);
        },
        fileToVue(e) {
            const files = e.target.files;
            for(let file of files) {
                if(this.isInFiles(file)) {
                    alert('Файл уже добавлен');
                } else {
                    const reader = new FileReader();
                    reader.onload = this.onImageRead(this.files.length, file.name);
                    reader.readAsDataURL(file);
                    this.images.push({
                        content: '/sys/img/logo.png',
                        name: file.name,
                        });
                    this.files.push(file);
                }
            }
        },
        isInFiles(newFile) {
            return this.files.some((file) => {
                return (file.name === newFile.name && file.lastModified === newFile.lastModified);
            });
        },
        onImageRead(index, name) {
            return ((e) => {
                if(this.images[index].name === name) {
                    this.images[index].content = e.target.result;
                }
            });
        },
        remFile(index) {
            this.files.splice(index, 1);
            this.images.splice(index, 1);
        },
        save() {
            console.log('save');
        }
    }
}
</script>


<style>
#addNews .title {
    text-align: center;
}
#addNews #fileUpload {
}
#addNews #fileUpload .custom-file label:after {
    content: 'Выбрать';
}
#addNews #tags {
    min-height: 170px;
}
#addNews #tags .tag {
    margin: 0.3rem 0.3rem;
    font-size: 0.7rem;
}
#addNews .img-box {
    position: relative;
    max-width: 220px;
    padding: 10px;
    border: solid 1px #ced4da;
    border-radius: 0.25rem;
    overflow-wrap: break-word;
}
#addNews .img-box button {
    position: absolute;
    top: 10px;
    right: 8px;
}
</style>