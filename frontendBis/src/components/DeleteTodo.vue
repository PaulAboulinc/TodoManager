<template>
  <tr>
    <td> {{ key }}</td>
  </tr>
</template>

<script>
export default {
  name: 'DeleteTodo',
  props: [
    'key'
  ]
}
</script>
