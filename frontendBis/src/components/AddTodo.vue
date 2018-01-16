<template>
  <div class="row">
    <router-link :to="{ path: '/' }" >Liste</router-link>
    <br/>
    <!-- Ici je relie mes input aux données de mon composant avec un v-model -->
    <label for="nom">Nom</label>
    <input type="text" id="nom" v-model="nom"/>
    <label for="description">Description</label>
    <input type="text" id="description" v-model="description"/>
    <button type="button" @click="addTodo">Soumettre</button>
        
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
      nom: '',
      description: ''
    }
  },
  methods: {
    addTodo () {
      params.append('nom', this.nom)
      params.append('description', this.description)
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
