<template>
  <div id="app">
    <h1>Demo dApp</h1>
    <div v-if="isReadyRobonomics">
      <Demand @onLiability="onLiability" />
      <div style="display:flex;margin-top:20px;">
        <div style="width:50%;">
          <h2>Last demand message</h2>
          <Json v-if="lastDemand">{{ lastDemand }}</Json>
        </div>
        <div style="width:50%;">
          <h2>Last offer message</h2>
          <Json v-if="lastOffer">{{ lastOffer }}</Json>
        </div>
      </div>
      <div v-if="liability">
        <h2>Liability</h2>
        <Json>{{ liability }}</Json>
      </div>
    </div>
    <div v-else>
      <h2>load</h2>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { init as initRobonomics } from "./utils/robonomics";
import { init as initWeb3 } from "./utils/web3";
import { init as initIpfs } from "./utils/ipfs";
import Demand from "./components/Demand.vue";
import Json from "./components/Json.vue";

export default {
  name: "app",
  components: {
    Demand,
    Json
  },
  data() {
    return {
      isReadyRobonomics: false,
      lastDemand: null,
      lastOffer: null,
      liability: null
    };
  },
  async created() {
    const web3 = await initWeb3();
    const ipfs = await initIpfs();
    const accounts = await web3.eth.getAccounts();
    Vue.prototype.$robonomics = initRobonomics(web3, ipfs, accounts[0]);
    this.$robonomics.ready().then(() => {
      this.isReadyRobonomics = true;

      this.$robonomics.onDemand(
        "QmWDRjU7xrM7pFUDuAVbV6kytuFgooahNLsqvCnipPgSSQ",
        msg => {
          this.lastDemand = msg.toObject();
        }
      );
      this.$robonomics.onOffer(
        "QmWDRjU7xrM7pFUDuAVbV6kytuFgooahNLsqvCnipPgSSQ",
        msg => {
          this.lastOffer = msg.toObject();
        }
      );
    });
  },
  methods: {
    onLiability(liability) {
      liability
        .onResult()
        .then(() => liability.getInfo())
        .then(data => {
          this.liability = { address: liability.address, ...data };
        });
      liability.getInfo().then(data => {
        this.liability = { address: liability.address, ...data };
      });
    }
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
