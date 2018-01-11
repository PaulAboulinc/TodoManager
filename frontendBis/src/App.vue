<template>
  <div id="app">
    <TodoList></TodoList>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'

export default {
  name: 'app',
  // Ajouter nos 4 composants
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
