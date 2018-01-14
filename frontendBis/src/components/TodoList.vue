<template>

  <ul v-if="todos">
    <input type="text" id="item" v-model="item"/>
    <label for="item">item</label>
    <button type="button" @click="addTodo">Soumettre</button>
    <li v-for="(todo,key) of todos">
      <p><strong>{{key}} {{todo}}</strong></p>
      <button type="button" @click="deleteTodo(key, todos)">X</button>
    </li>
  </ul>

  <ul v-else>
    <p>Il n'y a pas de TODO dans cette liste.</p>
    <input type="text" id="item" v-model="item"/>
    <label for="item">item</label>
    <button type="button" @click="addTodo">Soumettre</button>
  </ul>
</template>

<script>
import axios from 'axios'
var config = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
}
var params = new URLSearchParams()

export default {
  data () {
    return {
      todos: [],
      item: ''
    }
  },

  created () {
    axios({
      method: 'get',
      url: 'http://localhost:3000/getAll',
      withCredentials: true
    })
    .then((response) => {
      this.todos = response.data
    })
  },

  methods: {
    /*  deleteTodo (key) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/delete/' + key,
        withCredentials: true
      })
      .then((response) => {
        this.todos = response.data
      })
    },  */

    deleteTodo (key, todos) {
      params.append('key', key)
      params.append('todos', todos)
      axios.post('http://localhost:3000/delete', params,
        config,
        { withCredentials: true }
      )
      .then((response) => {
        this.todos = response.data
      })
    },

    addTodo () {
      params.append('todo', this.item)
      axios.post('http://localhost:3000/add', params,
        config,
        { withCredentials: true }
      )
      .then((response) => {
        console.log('todosListFromAddVue : ' + response.data)
        this.todos = response.data
      })
    }
  }

}
</script>