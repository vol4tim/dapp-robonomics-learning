<template>
  <button @click="send" class="btn">send demand</button>
</template>

<script>
export default {
  methods: {
    send() {
      this.$robonomics
        .sendDemand({
          model: "QmWDRjU7xrM7pFUDuAVbV6kytuFgooahNLsqvCnipPgSSQ",
          objective: "QmYVEPMfzSf2GXhA2heLrnhr931xmnXBEfy79Zrk9Aeskg",
          token: this.$robonomics.xrt.address,
          cost: 0,
          lighthouse: this.$robonomics.lighthouse.address,
          validator: "0x0000000000000000000000000000000000000000",
          validatorFee: 0,
          deadline: 8000000
        })
        .then(liability => {
          this.$emit("onLiability", liability);
        });
    }
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
  padding: 10px;
  font-size: 24px;
}
</style>
