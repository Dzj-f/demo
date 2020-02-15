import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/artcle',
    name: 'artcle-create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Artcle.vue')
  },
  {
    path: '/list',
    name: 'list-article',
    meta:{
        isLogin:true
    },
    component: () => import('../views/List.vue')
  },
  {
    path: '/Test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/article/edit/:id',
    name: 'edit-article',
    component: () => import('../views/ArticleEdit.vue')
  },
  {
  path: '/login',
  name: 'login',
  component: () => import('../views/Login.vue')
},
{
  path: '/UserRegister',
  name: 'UserRegister',
  component: () => import('../views/UserRegister.vue')
},
{
  path: '/FenLei1',
  name: 'FenLei1',
  component: () => import('../views/FenLei1.vue')
},
{
  path: '/FenLei2',
  name: 'FenLei2',
  component: () => import('../views/FenLei2.vue')
},
//注册了一定要用，否则报错
// component组件里的文件不用在这注册路径，views视图里的才要
// {
//   path: '/Common',
//   name: 'Common',
//   component: () => import('@/components/Common.vue')
// },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  
})

// const whiteList = [] // 路由白名单

// router.beforeEach((to, from, next) => {
//     console.log('进入守卫');

//     const flag = true; //鉴权
//     if (flag) {
//         next();
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//             next(); //记得当所有程序执行完毕后要进行next()，不然是无法继续进行的;
//         } else {
//             next({ path: '/', replace: true, query: { noGoBack: true } })
//         }
//     }

// });

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token') 
//   console.log(token)
//   if (token!== null) {
//    next(to.path)
//   } else {
//    if (token == '' || token == null) {
//     next('/list');
//    } else {
//     next()
//    }
//   }
   
//  })

export default router
