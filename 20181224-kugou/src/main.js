import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import mint from 'mint-ui';
import 'mint-ui/lib/style.min.css';
import '@/assets/font/iconfont.css'

//axios
import axios from 'axios';

//将axios注册成为vue下的实例化方法
Vue.prototype.$ajax=axios;

//注册过滤器
Vue.filter('substring6',(data)=>{
  return data.substring(0,16);
})

Vue.filter('imgUrl',(data,size=240)=>{
  //{size} = > 240
  if(data){
    return data.replace('{size}',size);
  }else{
    return data;
  }
})

Vue.use(mint);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
