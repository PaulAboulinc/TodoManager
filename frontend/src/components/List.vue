<template>
  <table>
    <thead>
      <tr>
        <th>Liste de todo</th>
      </tr>
    </thead>

    <tbody>
      <td v-for="todo in todos">
        {{ todo }}
      </td>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'List',

  // Ici, les données de notre composant
  data () {
    return {
      todos: []
    }
  }
}
</script>