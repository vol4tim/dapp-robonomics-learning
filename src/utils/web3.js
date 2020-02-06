import Web3 from "web3";

let web3 = null;
export async function init() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  throw new Error("Metamask not install");
}
export default function() {
  if (web3 === null) {
    throw new Error("web3 not init");
  }
  return web3;
}
