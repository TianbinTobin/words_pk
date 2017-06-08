<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import pk from './components/PK.vue'
  export default {
    name: 'app',
    components: {
      pk
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
