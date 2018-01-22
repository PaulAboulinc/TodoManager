<template>

  <ul v-if="todos">
    <div class="row">
      <h3> Liste des Todos </h3>
      <router-link :to="{ path: 'add' }" > <h4>Ajouter une Todo</h4></router-link>
      <div class ="col-md-2">
      </div>
      <div class ="col-md-8">
	      <table class="table table-hover table-striped table-bordered">
	        <thead>
	            <tr>
	               <th>Nom Todo</th>
	               <th>Commandes</th>
	             </tr>
	        </thead>
	        <tbody>
	          <tr v-for="(todo,key) of todos"> 
	            <th> <router-link :to="{ path: 'view', query: { todoKey: key }}" ><p><strong>{{todo.nom}}</strong></p></router-link> </th> 
	            <th>
	            	<div class="row">
	            		<div class="col-md-6">
	                		<router-link :to="{ path: 'add', query: { todoKey: key, todo: todo }}" ><p><strong>Modifier</strong></p></router-link>
	                	</div>
	                	<div class="col-md-6">
	                		<DeleteTodo :todoKey="key"></DeleteTodo> 
	                	</div>
	                </div>
	            </th>
	          </tr>
	        </tbody>
	      </table>
	  </div>
    </div>
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

<style>
#content {
  min-height: 400px;
}
</style>