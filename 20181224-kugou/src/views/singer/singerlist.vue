<template>
    <div>
        <mt-cell
        class="singerList"
        v-for="item in list"
        :key="item.singerid"
        :title="item.singername"
        is-link
        @click.native="goSingerInfo(item)"
        >
            <img slot="icon" :src="item.imgurl | imgUrl" height="80px" />
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
        //获取地址栏的动态参数
        //console.log(this.$route.params);
        let str = `/api/singer/list/${this.$route.params}?json=true`;

       let { data }  = await this.$ajax(str);

       this.list=data.singers.list.info
       //imgurl
       //singername 

    },
    methods:{
        goSingerInfo(item){
            this.$router.push({
                name:'singerInfo',
                params:{
                    singerId:item.singerid
                }
            });
            this.$store.commit('changeTit',item.singername)
        }
    }
}
</script>
<style scoped>
    .singerList{ border-bottom: 1px solid #EEE; margin-top: 0.2rem; margin-bottom: 0.2rem; padding: 10px;}
</style>
