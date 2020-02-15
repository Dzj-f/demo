import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
       //sessionStrong1
            loginUsername:"未登录",
            loginStatus:"0",                      
              isLogin:""
  },
  mutations: {
    setuserInfo(state,arg1){
      state.loginUsername= arg1
    },  
    updatecount(){
    },
  },
  actions: {
  },
  modules: {
  }
})
