<template>
  <div id="app">
    <h1>Demo dApp</h1>
    <Demand />
  </div>
</template>

<script>
import Vue from "vue";
import { init as initRobonomics } from "./utils/robonomics";
import { init as initWeb3 } from "./utils/web3";
import { init as initIpfs } from "./utils/ipfs";
import Demand from "./components/Demand.vue";

export default {
  name: "app",
  components: {
    Demand
  },
  async created() {
    const web3 = await initWeb3();
    const ipfs = await initIpfs();
    const accounts = await web3.eth.getAccounts();
    Vue.prototype.$robonomics = initRobonomics(web3, ipfs, accounts[0]);
    this.$robonomics.ready().then(() => {
      // готово
    });
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
