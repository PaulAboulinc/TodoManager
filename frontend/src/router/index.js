import Vue from 'vue'
import Router from 'vue-router'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import ViewTodo from '@/components/ViewTodo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'TodoList',
      component: TodoList,
      path: '/'
    },
    {
      path: '/add',
      component: AddTodo,
      name: 'AddTodo'
    },
    {
      path: '/view',
      component: ViewTodo,
      name: 'ViewTodo'
    }
  ]
})
