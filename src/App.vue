<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
  import index from './components/Index.vue'
  export default {
    name: 'app',
    components: {
      index
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    background: #ffffff;
  }
</style>
