import Vue from "vue";
import Router from "vue-router";
import {navBar} from '@/router/nav.js'
import search from '@/views/search'
import searchbar from '@/components/searchbar'
import singerList  from '@/views/singer/singerlist'
import singerInfo from '@/views/singer/singerinfo/singerinfo'

Vue.use(Router);

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes:[
    ...navBar,
    {
      path:'/search',
      name: "search",
      title:'搜索',
      components:{
          default:search,
          navbar:searchbar
      }
    },
    {
      //动态路由
      path:'/singer/list/:id',
      name:'singerList',
      components:{
          default:singerList,
          navbar:searchbar
      }
    },
    {
      path:'/singer/info/:singerId',
      name:'singerInfo',
      components:{
          default:singerInfo,
          navbar:searchbar
      }
    }
  ]
});
