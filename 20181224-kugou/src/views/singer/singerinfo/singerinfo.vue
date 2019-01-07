<template>
    <div>
        <div class="imgBox">
            <img :src="info.imgurl | imgUrl" alt="" width="100%" />
        </div>
        <song-list :list="list"></song-list>
    </div>
</template>
<script>
import songList from '@/components/songlist'

export default {
    data(){
        return {
            list:[],
            info:{}
        }
    },
    async created(){
        let str= `/api/singer/info/${this.$route.params.singerId}?json=true`;
        let {data}  = await this.$ajax(str);

        this.info=data.info;
        this.list=data.songs.list;

        console.log(this.list);
    },
    components:{
        songList
    }
}
</script>
<style>
    .imgBox{ height: 5rem; overflow: hidden;}
</style>
