<template>
<div class="common" >
     <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside :width="asideHeight" style="background-color: rgb(238, 241, 246)">
          <el-menu router default-active="1" :default-openeds="['1','2']">
            <el-menu-item>
                <template slot="title" >
                  <i class="el-icon-s-unfold" @click="shouqi" v-if="text"></i>
                  <i class="el-icon-s-unfold" @click="dakai" v-if="textdakai"></i>
                  <span v-if="text" @click="shouqi" >后台管理</span>
                </template>    
            </el-menu-item>     
            <el-submenu index="1" v-if="text">
                <template slot="title" ><i class="el-icon-s-unfold" ></i><span >内容管理</span></template>    
                <el-menu-item index="/List" >商品管理</el-menu-item>
                <el-menu-item index="/Artcle" >新增商品</el-menu-item>
            </el-submenu>     
            <el-submenu index="2" v-if="text">
                <template slot="title" ><i class="el-icon-s-unfold"></i><span >分类</span></template>    
                <el-menu-item index="/FenLei1" >分类1</el-menu-item>
                <el-menu-item index="/FenLei2" >分类2</el-menu-item>
            </el-submenu>     
          </el-menu>
        </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span  @click="denglu" >退出登录</span>
      <span >{{this.$store.state.loginUsername}}</span>
    </el-header>
    
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return{
        isCollapse: false,
        asideHeight:"180px",
        text:true,
        textdakai:false
    }
  },
  components: {
  },
  methods:{
      denglu:function(){
        this.$router.push({path:"/Login", })
           //当点击退出登录时清空user数据
  
           let storage=window.localStorage
            storage.clear();
            console.log(storage);
            // this.$store.commit("setuserInfo","haha")                   
      },
      shouqi(){
        this.asideHeight = "50px",
        this.text=false
        this.textdakai=true
      },
      dakai(){
        this.asideHeight = "180px",
        this.text=true
        this.textdakai=false
      }
  },
created() {    
    //1.在页面加载时读取localStorage里的user状态信息      
    if (localStorage.getItem("user") ) {
        this.$store.replaceState(Object.assign({}, 
        this.$store.state,JSON.parse(localStorage.getItem("user"))))      
    }else{
      // 如果已经退出登录,这时本地user已经清空了,必须从登录页面进路由
         this.$router.push('/Login')
    }
   // 2.在页面刷新时将localStorage里user的信息保存到vuex中   
    // window.addEventListener("beforeunload",()=>{
    //     localStorage.setItem(JSON.stringify(this.$store.state),"user")
    // })
}
}
</script>

