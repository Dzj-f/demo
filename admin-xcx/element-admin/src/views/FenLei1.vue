<template>
<div>
    <div>
        <el-form  @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
          <el-form-item label="商品名">
            <el-input v-model="article.text"></el-input>
          </el-form-item>

          <el-form-item label="商品属性">
            <el-input type="textarea" v-model="article.pro_name"></el-input>
          </el-form-item>



          <el-form-item>
            <el-button type="primary" native-type="submit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
   </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        article: {
        },
        // 上传图片
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      }
    },
    methods: {
      saveArticle() {
        this.$http.post('/Article',this.article).then(res=>{
            // this.$refs.upload.submit();
            this.$message({
              message:"商品添加成功",
              type:"success"   
            })
            console.log(res)
            this.$router.push('/List')
        });               
       },
    }
  }
</script>