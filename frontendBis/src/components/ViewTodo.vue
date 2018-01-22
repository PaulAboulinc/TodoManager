<template>
  <div class="row">
    <h3> Détails Todo : {{ todos.nom }} </h3>
    <router-link :to="{ path: '/' }" ><h4> Retour Liste des Todos </h4></router-link>
    <br/>
    <p> Nom : {{ todos.nom }} </p>
    <br/>
    <p>Description : {{ todos.description }}        </p>
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
