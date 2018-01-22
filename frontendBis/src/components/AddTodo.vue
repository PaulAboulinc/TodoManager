<template>
  <div class="row" v-if="todoKey">
    <h3> Modifier une Todo </h3>
    <router-link :to="{ path: '/' }" ><h4> Retour Liste des Todos </h4></router-link>
    <br/>
    <!-- Ici je relie mes input aux données de mon composant avec un v-model -->
    <label for="nom">Nom : </label>
    <input type="text" id="nom" v-model="nom"/>
    <label for="description">Description : </label>
    <input type="text" id="description" v-model="description"/>
    <button type="button" @click="editTodo">Soumettre</button>
  </div>
  <div class="row" v-else>
    <h3> Ajouter une Todo </h3>
    <router-link :to="{ path: '/' }" ><h4> Retour Liste des Todos </h4></router-link>
    <br/>
    <!-- Ici je relie mes input aux données de mon composant avec un v-model -->
    <label for="nom">Nom : </label>
    <input type="text" id="nom" v-model="nom"/>
    <label for="description">Description : </label>
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
      description: '',
      todoKey: ''
    }
  },
  created () {
    if (this.$route.query.todoKey && this.$route.query.todo) {
      this.todoKey = this.$route.query.todoKey
      this.nom = this.$route.query.todo.nom
      this.description = this.$route.query.todo.description
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
    },
    editTodo () {
      params.append('todoKey', this.todoKey)
      params.append('nom', this.nom)
      params.append('description', this.description)
      axios.post('http://localhost:3000/edit', params,
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
