import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login.vue'
import SignUp from '../views/signup.vue'
import dash from '../components/dash'
import addItem from '../components/addItem.vue'
import detail from '../components/detail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name : 'Login',
    component : Login
  },
  {   
    path:'/signUp',
    name: 'Signup',
    component : SignUp
  }, 
  {  
    path : '/dash', 
    name : 'dash', 
    component : dash
  },
  {
    path : '/addItem', 
    name : 'AddItem',
    component: addItem
  },
  {
    path : '/item/:id', 
    name : 'detail',
    component: detail
  }
  
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
