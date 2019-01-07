import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTitle:'',
    activeHash:'',
    list:[]
  },
  mutations: {
    changeTit(state,val){
      state.activeTitle = val;
    },
    updateHash(state,val){
      state.activeHash= val;
    },
    changeList(state,arr){
      console.log(arr);
      state.list=arr;
    }
  },
  actions: {}
});
