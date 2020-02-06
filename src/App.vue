<template>
  <div id="app">
    <h1>Demo dApp</h1>
    <Demand />
  </div>
</template>

<script>
import Demand from "./components/Demand.vue";

export default {
  name: "app",
  components: {
    Demand
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1024px;
  margin: 0 auto;
}
h1,
h2 {
  text-align: center;
}
</style>
