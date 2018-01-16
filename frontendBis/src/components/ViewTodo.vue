<template>
  <div class="row">
    <a href="http://localhost:8080/" >Liste</a>
    <br/>
    Nom : {{ todos.nom }}
    <br/>
    Description : {{ todos.description }}        
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
  name: 'AddTodo',
  data () {
    return {
      todos: [],
      todoKey: this.$route.query.todoKey
    }
  },
  created () {
    params.append('key', this.todoKey)
    console.log('keyyyyyy : ' + this.todoKey)
    axios.post('http://localhost:3000/get', params,
      config,
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response.data)
      this.todos = response.data
    })
  }
}
</script>
