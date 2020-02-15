var express = require('express');

var app =express();
//跨域
app.use(require('cors')())

//用来生成token
// const jwt= require('jsonwebtoken')

//用来解析json格式
app.use(express.json())

const mongoose = require('mongoose')
//连接数据库
const db = mongoose.connect('mongodb://localhost:27017/express-test',
       {useNewUrlParser: true, useUnifiedTopology: true})

//定义模型，类似数据库表
const Article = mongoose.model('Article',new mongoose.Schema({
     //字段要在模型里定义了才能插入字段对应的数据
     text:String,     //商品名
     url:String,      //商品图片
     num:Number,      //商品数量
     pro_name:String, //属性值
     price:String,     //价格
     selected:Boolean  //是否选中
}))

const User = mongoose.model('User',new mongoose.Schema({
     userName:String,
     passWord:String
}))
//轮播图
const sliderList = mongoose.model('sliderList',new mongoose.Schema({
     text:String,     //标题
     url:String,      //图片
}))
//首页中间
const centerList = mongoose.model('centerList',new mongoose.Schema({
     text:String,     //标题
     url:String,      //图片
}))
//订单页
const buyList = mongoose.model('buyList',new mongoose.Schema({
     text:String,     //商品名
     url:String,      //商品图片
     num:Number,      //商品数量
     pro_name:String, //属性值
     price:String,     //价格
     selected:Boolean  //是否选中
}))


// Article.insertMany([
//      {
//           text:'商品1',
//           url:'http://www.fytlcj.com/upload/sys/pc/case/1.jpg',
//           num:1,
//           pro_name:"屬性值",
//           price:100,
//           selected:true
//      },
// ])

// User.insertMany([
//      {userName:'111',passWord:'111',},
//      {userName:'222',passWord:'222',},
//      {userName:'333',passWord:'333',},
// ])

// centerList.insertMany([
//      {
//           text:"center图片1",
//            url:'http://localhost:8081/public/img/local/1.jpg',
//      },  
//      {
//           text:"center图片2",
//            url:'http://localhost:8081/public/img/local/2.jpg',
//      },  
//      {
//           text:"center图片3",
//            url:'http://localhost:8081/public/img/local/3.jpg',
//      },  
//      {
//           text:"center图片4",
//            url:'http://localhost:8081/public/img/local/4.jpg',
//      }, 
// ])


//sliderList模型
app.get('/sliderList',async function(req,res){
     // const article = await Article.find()
     const slider= await sliderList.find()
     res.send(slider);
});
//删除
app.delete('/sliderList/:id',async (req,res)=>{
     const slider = await sliderList.findById(req.params.id)
     await slider.remove()
     //下面这种方法开始行，后来不行，不清楚原因
     // await sliderList.findByIdDelete(req.params.id)
     res.send({
          success:true
     })
});
// 修改和编辑
app.put('/sliderList/:id',async (req,res)=>{
     const slider= await sliderList.findByIdAndUpdate(req.params.id,req.body)
     // article.title = req.body.title
     // article.conntect = req.body.conntect
     // await article.save()
     // res.send(req.params.title)
     res.send('ok')
})



//centerList模型
//get
app.get('/centerList',async function(req,res){
     // const article = await Article.find()
     const center= await centerList.find()
     res.send(center);
});

// 修改和编辑
app.put('/centerList/:id',async (req,res)=>{
     const center = await centerList.findByIdAndUpdate(req.params.id,req.body)
     // article.title = req.body.title
     // article.conntect = req.body.conntect
     // await article.save()
     // res.send(req.params.title)
     res.send('ok')
})





//Article模型
app.get('/Article',async function(req,res){
     // const article = await Article.find()
     const article = await Article.find().skip().limit()
     res.send(article);
});
// 新增
app.post('/Article',async function(req,res){
     const article = await Article.create(req.body)
     res.send(article)
});

//删除
app.delete('/Article/:id',async (req,res)=>{
     const article = await Article.findById(req.params.id)
     await article.remove()
     //下面这种方法开始行，后来不行，不清楚原因
     // await Article.findByIdDelete(req.params.id)
     res.send({
          success:true
     })
});
// 修改和编辑
app.put('/Article/:id',async (req,res)=>{
     const article = await Article.findByIdAndUpdate(req.params.id,req.body)
     // article.title = req.body.title
     // article.conntect = req.body.conntect
     // await article.save()
     // res.send(req.params.title)
     res.send('ok')
})
//文章详情
app.get('/Article/:id',async (req,res)=>{
     const article = await Article.findById(req.params.id)
     res.send(article)

})
app.get('/5df772e4f0b52829b8ee0065/Article',async (req,res)=>{
     const article = await Article.find().skip().limit()
     res.send(article);

})


//buyList模型
app.get('/buyList',async function(req,res){
     // const article = await Article.find()
     const buylist = await buyList.find().skip().limit()
     res.send(buylist);
});

app.post('/buyList',async function(req,res){
     const buylist = await buyList.create(req.body)
     res.send(buylist)
});

//删除
app.delete('/buyList/:id',async (req,res)=>{
     const buy = await buyList.findById(req.params.id)
     await buy.remove()
     res.send({
          success:true
     })
});



 
//User模型
app.get('/User',async function(req,res){
     const users = await User.find()
     res.send(users)     
})

//删除
app.delete('/User/:id',async (req,res)=>{
     const user = await User.findById(req.params.id)
     await user.remove()
     //下面这种方法开始行，后来不行，不清楚原因
     // await Article.findByIdDelete(req.params.id)
     res.send({
          success:true
     })
});

app.get('/',function(req,res){
     res.send('this is the homepage');
});

//登录
app.post('/UserLogin',async function(req,res){
     const name = req.body.userName
     const psd = req.body.passWord
     //    这种方式会在捕捉到错误，即密码错误时报错，立即关闭服务
//      User.find({username:name}).exec((err,data)=>{        
//           if(data==""){
//                res.send({status:500,msg:'用户不存在'})
//           }else{
//                if(data[0].password !=psd){
//                 res.send({status:500,msg:"密码错误"})
//                }
//             return res.json({status:200,Username:name,msg:"登录成功"})
//           }
//           if (err) throw err;
//     })


const userSelect = await User.find().where({
     userName:name,        
 })

 // 如果查找数据库用户名为空，则无此用户
 if(userSelect ==""){
     res.send({status:500,msg:'用户不存在'})
}else{
    if(userSelect[0].passWord !=psd){
     res.send({status:500,msg:"密码错误"})
    }else{
        res.send({
             status:200,
             msg:"登录成功！",
             loginUsername:name
          })
    }
      //生成token
     //  var token = jwt.sign(user.toJSON(), app.get('superSecret'), {
     //      expiresIn: 1440 // 设置过期时间
     //  });
 }        
 res.send(userSelect)

});
//注册
app.post('/UserRegister',async function(req,res){
     const name = req.body.username
     const psd = req.body.password
     //    const user = req.body.user
     const userSelect = await User.find().where({
              username:name,        
          })

          // 如果查找数据库用户名为空，则无此用户,即可注册新用户
          if(userSelect ==""){
               const newUser = await User.create(req.body)
               //  不能同时发2次send请求
               //  res.send(newUser)
                res.send({status:500,msg:"注册成功"})
          }else{
               if(userSelect[0].username ==name){
                res.send({status:500,msg:"用户已存在"})
               }
              
          }        
          res.send(userSelect)

});




//小程序查询
app.post('/search',async function(req,res){
     const a = req.body
     console.log(a)
const ArticleSelect = await Article.find().where({
     text:a.value     
 })

 if(ArticleSelect.length==0){
     res.send("找不到搜索内容")
      
 }else{
     res.send(
          {
               ArticleSelect,code:"code"
          }
     )
      }
 
});


//列表查询
app.post('/ArticleSearch',async function(req,res){
     const text = req.body.text
const ArticleSelect = await Article.find().where({
           text:text    
 })

 if(ArticleSelect.length==0){
     res.send({
          msg:"找不到搜索内容",
          status:500
     })
      
 }else{
     res.send(ArticleSelect)
      }
 
});



// app.post('/Article',async function(req,res){
//        const article = await Article.create(req.body)
//        res.send(article)
//      //   var files = req.files.pics;
//      //   res.send(files)
//      // var item ,_name ,_tmp;
//      // item = _files, _name=item.name;
//     });


//用于解析数据
var bodyParser = require('body-parser');
//上传文件中间件
var multer  = require('multer');
 
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})
 


app.listen(1000);
console.log('listening to port 1000')

