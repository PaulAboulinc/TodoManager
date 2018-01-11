<template>
  <ul v-if="todos">
    <li v-for="todo of todos">
      <p><strong>{{todo}}</strong></p>
    </li>
  </ul>

  <ul v-else>
  <p>Il n'y a pas de TODO dans cette liste.</p>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: []
    }
  },

  created () {
    axios({
      method: 'get',
      url: 'http://localhost:3000/getPage/1',
      withCredentials: true
    })
    .then((response) => {
      this.todos = response.data
    })
  }
}
</script>