<template>
    <div class="searchbar">
      <mt-header :title="title" class="searchbox">
        <div @click="$router.history.go(-1)" slot="left">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
    </div>
</template>
<script>
export default {
    data(){
      return {
        title:this.$store.state.activeTitle,
        newTit:''
      }
    },
    watch:{
      '$store.state.activeTitle':{
        handler(data){
         this.title=data;
        }
      }
    }
}
</script>
<style>
  .searchbar .searchbox{ background: #FFF; color: #333;}
</style>
