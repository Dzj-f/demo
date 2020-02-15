<template>
<div class="cn">
  <div class="loginOut">
    <div class="login">
      <el-form  @submit.native.prevent="userLoad" ref="form" :model="user" label-width="80px">
        <el-form-item label="账户" class="ppp">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" class="ppp">
          <el-input type="password" v-model="user.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>

</div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          userName:null,
          passWord:null
        },
      }
    },
    created() {    
    //1.在页面加载时读取localStorage里的user状态信息      
        if (localStorage.getItem("user") ) {
          // 如果已经登录了，打开登录页会自动跳到首页
          this.$router.push('/')
        }
    },
    //请求登录接口
    methods: {
      userLoad() {
        // console.log(this.user)
        this.$http.post('/UserLogin',{
          //将input中的username和password复制再传给后端
            userName:this.user.userName,
            passWord:this.user.passWord
          }).then(res=>{         
            const loginStatus =res.data.status
             console.log(res.data)  
            // 如果状态码等于200，即账户密码正确，        
            if(loginStatus == 200){
              this.$message({
              message:"登录成功",
              type:"success"   
            }) 
             //把服务端放回的用户数据给本地user
             localStorage.setItem('user',JSON.stringify(res.data))
             let newuser = JSON.parse(localStorage.getItem('user'))
             let loginUsername = newuser.loginUsername
             //  把user数据传到vuex的store，因为页面上使用的是store的数据
             this.$store.commit("setuserInfo",loginUsername)


            //  localStorage.setItem("user",JSON.stringify(this.$store.state))
             // 跳转到登录成功后的页面  
             this.$router.push({path:"/", }) 

             // 将服务端返回的用户名传给store数据仓库
   
            }else
            {
              // 如果账户不存在，或密码错误，直接返回提示
                this.$message({
                      message:res.data.msg,
                      type:"success"   
            })             
            }       
        });
        
       }
    }
  }
</script>

<style>
@import '../css/normalize.css';
.cn{
  background: url('../img/img5.jpg') no-repeat ;
  background-size:100% 100%;
  height: 48rem;
  display: flex;
  justify-content: center;
  align-items: center
}
.loginOut{
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.login{
  padding: 3rem;
  margin: 0 auto;
  width: 20rem;
  height: 14rem;
}
.ppp .el-form-item__label{
  color: #ffffff !important 
}
</style>