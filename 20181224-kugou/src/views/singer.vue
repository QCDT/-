<template>
    <div class="singerbox">
        <mt-cell 
        v-for="item in list"
        :key="item.classid"
        class="list"
        :title="item.classname"
        is-link
        @click.native="goSingerList(item)"
        >
        </mt-cell>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    async created(){
       // console.log(this.$ajax);
        let { data }= await this.$ajax('/api/singer/class?json=true');

        //存入歌手分类
        this.list=data.list;
        console.log(this.list);
    },
    methods:{
        goSingerList(item){
            this.$router.push({
                name:'singerList',
                params:{
                    id:item.classid
                }
            })
            this.$store.commit('changeTit',item.classname);
        }
    }
}
</script>
<style lang="less">
    .singerbox .list{
        background: #FBFBFB;
        display: block;
        font-size: 1rem;
        color: #333;
        border:1px solid #CCC;
        border-radius: 5px;
        margin: 0.2rem;
    }
</style>
