<template>
  <div id="app">
    <mt-header>
      <router-link to="/" slot="left">
        <img class="logo" src="./assets/images/logo.png" />
        <span class="downBtn">下载酷狗</span>
      </router-link>
      <mt-button icon="search" slot="right" @click="()=>{$router.push({name:'search'})}"></mt-button>
    </mt-header>
    <router-view name="navbar"  />
    <router-view />
    <player></player>
  </div>
</template>
<script>
import player from '@/components/playbottom'
export default {
 components:{
   player
 }
}
</script>

<style lang="less">
*{ margin: 0; padding: 0;}
a{ text-decoration: none;}
.logo{
  width: 2rem;
}
.downBtn{
  width: 1.5rem;
  height: 0.5rem;
  margin-left: .7143rem;
  border: 1px solid #fff;
  border-radius:.1rem;
  text-align: center;
  color: #fff;
  padding: 0.1rem;
  font-size: 0.3rem;
}
</style>
