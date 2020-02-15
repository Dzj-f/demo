<template>
<div>
  <!-- 只有登录页和注册页不需要公共页面 -->
<Common v-show="!(path ==='/Login' || path ==='/UserRegister')"></Common>
  <!-- 只有登录页和注册页才应用登录注册页面 -->
<Login v-show="(path ==='/Login' )"></Login>
<UserRegister v-show="(path ==='/UserRegister')"></UserRegister>
</div>
</template>

<script>
import Login from "./views/Login.vue"
import UserRegister from "./views/UserRegister.vue"
import Common from "@/components/Common.vue"
export default {
  name: 'app',
  components: {  
   Common,Login,UserRegister
  },
  data(){
    return{
      user:{
      Username:"王小"
    },
    path:"",
    Username:"王1虎"
    }
  },
  mounted(){
    this.path = this.$route.path;
  },
  watch:{
    $route(to){
      this.path = to.path
    }
  }
}
</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
#app{
  text-align: left
}
</style>
