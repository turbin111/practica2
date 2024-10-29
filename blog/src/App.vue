<template>
  <div id="app">
    <h1>Дневник</h1>
    <Home />
  </div>
</template>

<script>
import Home from './views/BlogHome.vue';

export default {
  components: {
    Home
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

h1 {
  margin-bottom: 20px;
}
</style>
