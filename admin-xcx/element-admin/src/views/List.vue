<template>
<div > 
    <div>
      <el-form :inline="true" :model="art" class="demo-form-inline">
         <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
          </el-date-picker>
          <el-form-item label="商品名">
            <el-input v-model="art.text" placeholder="商品名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="allSearch">查询全部</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div>
      <div>
        <el-table :data="article.slice((currentPage-1)*pagesize,currentPage*pagesize) ">
            <el-table-column prop="text" label="商品名" width="140">
            </el-table-column>
            <el-table-column prop="pro_name" label="属性" width="120">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="120">
            </el-table-column>
            <el-table-column prop="pictures" label="商品图片" width="120">
              <template scope="scope">
                        <img :src="scope.row.url" width="60" height="60" 
                        class="head_pic"/>
                    </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row._id)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
    <div>
       <el-pagination
            background
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page.sync="currentPage"           
            :page-sizes="[5,10,15,20]"
            :page-size.sync="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
         </el-pagination>
    </div>
   </div>
   <el-scrollbar class='page-component__scroll'></el-scrollbar>   
</div>
    
</template>

<script>


export default {
  name: 'home',
  components: {
   
  },
    data() {
      return{
        currentPage:1,
        pagesize:5,
        totalCount:0,
        article:[],
        art:{
          text:"",
        },
        value1:"",
      };
     
    },
    created(){
          this.fetch()
    },
    mounted(){
     
    },
    methods: {
        fetch(){
          this.$http.get('Article').then(res=>{
          this.article = res.data
          this.totalCount=res.data.length
      })     
        },

//分页方法
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
         this.pagesize= val
       
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
//修改和编辑
      handleEdit(id) {
            console.log(id) 
            console.log(id)
            this.$router.push(`/article/edit/${id}`)
      },
//删除
      // handleDelete(row) {        
      //   this.$http.delete(`/Article/${row._id}`).then(res=>{
      //         this.$message({
      //         message:"文章删除成功",
      //         type:"success"   
      //       })
      //       console.log(res);
      //        this.fetch()
      // })
      // },
            handleDelete(row) {        
                this.$confirm('确定删除？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                //  console.log(row)
                  this.$http.delete(`/Article/${row._id}`).then(res=>{
                        this.$message({
                        message:"删除成功",
                        type:"success"   
                      })
                      console.log(res);
                      this.fetch()
                  })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
      },


allSearch(){
   this.fetch()
},


  //查询
        onSubmit()  {
        console.log(this.value1)
        this.$http.post('/ArticleSearch',{
            text:this.art.text,
          }).then(res=>{         
             console.log(res.data)  
            // 如果状态码等于200，即账户密码正确，        
            if(res.data.status==500){
                  this.$message({
                  message:"找不到",
                  type:"success"   
                }) 

            }else
            {
                this.$message({
                      message:"找到了",
                      type:"success"   
            })
            this.article = res.data             
            }       
        });
        
       }

    }
}
</script>

