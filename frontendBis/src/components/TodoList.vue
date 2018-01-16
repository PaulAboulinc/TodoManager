<template>

  <ul v-if="todos">
    <router-link :to="{ path: 'add' }" >Ajouter</router-link>
    <li v-for="(todo,key) of todos">
      <router-link :to="{ path: 'view', query: { todoKey: key }}" ><p><strong>{{key}} {{todo.nom}}</strong></p></router-link>
      <DeleteTodo :todoKey="key"></DeleteTodo>
    </li>
  </ul>

  <ul v-else>
    <router-link :to="{ path: 'add' }" >Ajouter</router-link>
    <p>Il n'y a pas de TODO dans cette liste.</p>
  </ul>
</template>

<script>
import axios from 'axios'
import AddTodo from '@/components/AddTodo'
import DeleteTodo from '@/components/DeleteTodo'

export default {
  name: 'TodoList',
  components: {
    AddTodo,
    DeleteTodo
  },
  data () {
    return {
      todos: []
    }
  },

  created () {
    axios({
      method: 'post',
      url: 'http://localhost:3000/getAll',
      withCredentials: true
    })
    .then((response) => {
      this.todos = response.data
    })
  }
}
</script>