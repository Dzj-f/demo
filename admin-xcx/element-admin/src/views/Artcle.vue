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

          <el-form-item label="商品价格">
            <el-input type="textarea" v-model="article.price"></el-input>
          </el-form-item>

          <div style="margin-left:5rem">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8081/file_upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :limit="2"
                :on-exceed="lim"
                :before-upload="handBefore"
                list-type=picture-card>
                <i class="el-icon-plus"></i>
              </el-upload>
                <!-- <el-button style="display:block;margin-top:10px" size="small" :disabled=dis
                type="button" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                
              <!-- 放大窗口 -->
                <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
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
         url: '',
         pro_name:'',
         text:'',
         num:1,
         selected:true,

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

