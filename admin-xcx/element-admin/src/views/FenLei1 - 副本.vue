<template>
<div>
<el-upload
  class="upload-demo"
  ref="upload"
  action="http://localhost:1000/Article"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  list-type=picture-card>
  <i class="el-icon-plus"></i>
</el-upload>
  <el-button style="display:block;margin-top:10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
     
</div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
        console.log("上传成功")
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>