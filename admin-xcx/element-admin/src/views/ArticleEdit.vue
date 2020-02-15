<template>
<el-form  @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
  <el-form-item label="商品名称">
    <el-input v-model="article.text"></el-input>
  </el-form-item>
  <el-form-item label="商品属性">
    <el-input type="textarea" v-model="article.pro_name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格">
    <el-input type="textarea" v-model="article.price"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>
    <el-button @click="set()" >取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        article: {
        }
      }
    },
    methods: {
      saveArticle() 
      {
        this.$http.put(`/Article/${this.$route.params.id}`,this.article).then(res=>{
            this.$message({
              message:"修改成功",
              type:"success"   
            })
            console.log(res)
            this.$router.push('/List')
        });
        
       },
       fetch(){
          console.log('fetch is ok1')
          console.log(this.$route.params.id)
          console.log('fetch is ok1')
         this.$http.get(`/Article/${this.$route.params.id}`).then(res=>{
              console.log(res.data)
              this.article = res.data
              console.log('fetch is ok2')
         })
       },
       set(){
         this.$router.push('/List')
       }
    },
     created(){
         this.fetch()
         console.log('created is ok')
       }
  }
</script>

