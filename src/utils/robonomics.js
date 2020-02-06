import Robonomics, { MessageProviderIpfs } from "robonomics-js";

let robonomics = null;
export function init(web3, ipfs, account) {
  robonomics = new Robonomics({
    web3: web3,
    messageProvider: new MessageProviderIpfs(ipfs),
    account: {
      address: account
    },
    ens: {
      version: 5
    },
    lighthouse: "airalab"
  });
  return robonomics;
}
export default function() {
  if (robonomics === null) {
    throw new Error("Robonomics not init");
  }
  return robonomics;
}
