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

          <div style="margin-left:5rem">
              <input type="file">
          </div>

          <el-form-item style="margin-top:2rem">
            <el-button type="primary" native-type="submit" @click="submitUpload">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
   </div>

  <div>
    
  </div>    
</div>
</template>

<script>
  export default {
    data() {
      return {
        dis:false,
        dialogImageUrl:'',
        dialogVisible: false,
        fileList: [],
        // 表单数据
         article: {
            // 图片地址
         url: '',
         pro_name:'',
         text:''
        },
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
        // console.log("上传成功")
      },
      // 上传之前
      handBefore(file){
        // console.log(file)
        let formdata = new FormData()
        formdata.append("qqq",file)
        var url = 'http://localhost:8081/file_upload'
        this.$http.post(url,formdata).then(res=>{
            // this.$refs.upload.submit();
            console.log(res.data)
            this.article.url = `http://localhost:8081${res.data.img}`
             console.log(this.article.url)
             //提交表单
             this.saveArticles()
            //  this.$message({
            //   message:"商品添加成功",
            //   type:"success"   
            // })
            // this.$router.push('/List')
        });  
      },
      //限制个数函数
      lim(){
           alert('超载了')
          //  this.dis=true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      saveArticle() {},
      // 上传表单
        saveArticles() {
              if(this.article.url&&this.article.text&&this.article.pro_name){
                  this.$http.post('/Article',this.article,this.url).then(res=>{
                // this.$refs.upload.submit();
                this.$message({
                  message:"商品添加成功",
                  type:"success"   
                })
                console.log(res)
                this.$router.push('/List')
            });      
          }else{
            alert('填写不完整')
          }
                
       },

    }
  }
</script>