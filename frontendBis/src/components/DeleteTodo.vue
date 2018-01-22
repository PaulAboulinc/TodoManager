<template>
  <div class="row">
    <a href="http://localhost:8080/"><button type="button"  class="btn btn-danger" @click="deleteTodo(todoKey)">Supprimer Todo</button></a>
  </div>
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
  name: 'DeleteTodo',
  props: [
    'todoKey'
  ],
  methods: {
    deleteTodo (todoKey) {
      params.append('key', todoKey)
      console.log('lol : ' + todoKey)
      axios.post('http://localhost:3000/delete', params,
        config,
        { withCredentials: true }
      )
      .then((response) => {
        this.todos = response.data
      })
    }
  }
}
</script>
