<template>
<div>
  <div class="home">
    这是home<br/>
    您好，
    <!-- 这个是直接传到store的数据 -->
    登录状态：{{this.$store.state.loginUsername}} !
  </div>
</div>
</template>

<script>

export default {
  name: 'home',
  components: {
  
  },
// created () {    
//     //在页面加载时读取sessionStorage里的状态信息    
//     if (sessionStorage.getItem("store") ) {
//         this.$store.replaceState(Object.assign({}, 
//         this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
//     }
//     //在页面刷新时将vuex里的信息保存到sessionStorage里    
//     window.addEventListener("beforeunload",()=>{
//         sessionStorage.setItem("store",JSON.stringify(this.$store.state))
//     })
// }
}
</script>
