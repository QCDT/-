<template>
    <mt-navbar v-model="selected">
      <mt-tab-item 
      :key="item.name" 
      v-for="(item) in navBar" 
      :id="item.name"
      @click.native="gotoPage(item.name)"
      >
      {{item.title}}
      </mt-tab-item>
    </mt-navbar>
</template>
<script>
import {navBar} from '@/router/nav.js'

export default {
  data(){
    return {
      navBar:navBar,
      selected:''
    }
  },
  watch:{
    '$route':{
      handler(){
          this.selected=this.$route.name;
      },
      immediate:true
    }
  },
  methods:{
    gotoPage(n){
      this.$router.push({name:n});
      console.log(this.$route.name);
    }
  }
}
</script>
<style>

</style>
