var express = require('express');
var app = express();
var fs = require("fs");

//跨域
app.use(require('cors')())
//用于解析数据
var bodyParser = require('body-parser');
//上传文件中间件
var multer  = require('multer');

// 设置静态目录,可以直接访问static下面的文件，__dirname表示决对路径
app.use('/public', express.static( __dirname+'/static'));
// app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).array('image'));
 
//  配置
var storage = multer.diskStorage({
   destination:function(req,file,cb){
      //指定文件路径
      cb(null,'./static/img')
   },
   //重命名
   filename:function(req,file,cb){
      // cb(null,file.fieldname + '-' + Date.now())
      // 获取后缀名
      let exts = file.originalname.split('.');
      let ext = exts[exts.length-1]
      let  tmpname =  (new Date()).getTime()+parseInt(Math.random()*9999)
      cb(null,`${tmpname}.${ext}`)
        // cb(null,file.fieldnamen + '-' + Date.now() + "." + fileFormat[this.fileFormat.length-1])
   }
});
var upload = multer({ storage :storage})
app.post('/file_upload', upload.single('qqq'),function (req, res) {
     console.log("上传成功")
     console.log(req.file)
     let url = `/public/img/${req.file.filename}`
     console.log(url)
     res.send({
       "err":0,
       "info":req.file,
       "img":url
     })
 
})

     
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log(host, port)
 
})





  // let{size,minetype,path}=req.file
   // let types = ['jpg','jpeg','png','gif']
   // let tmType = minetype.split('/')[1]
   // if(size>500000){
   //    return res.send({err:1,msg:'尺寸太大'})
   // }else if(types.indexOf(tmType)==-1){
   //    return res.send({eer:-2,msg:'类型错误'})
   // }else{
   //    res.send('上传成功')
   // }