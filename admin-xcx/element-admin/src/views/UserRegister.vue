<template>
<div>
<div>
<el-form  @submit.native.prevent="userLoad" ref="form" :model="user" label-width="80px">
  <el-form-item label="账户">
    <el-input v-model="user.username"></el-input>
  </el-form-item>

  <el-form-item label="密码">
    <el-input type="password" v-model="user.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button  >登录</el-button>
    <el-button native-type="submit" type="primary">注册</el-button>
  </el-form-item>
</el-form>
</div>
  <div class="home">
   <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>   
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username:null,
          password:null
        }
      }
    },
    //请求注册接口
    methods: {
      userLoad() {
        // console.log(this.user)
        this.$http.post('/UserRegister',this.user).then(res=>{
            console.log(res)    
            console.log(res.data.msg) 
            if(res.data.status == 200){    
              
            this.$router.push({path:"/List"})
            }        
        });
        
       }
    }
  }
</script>

