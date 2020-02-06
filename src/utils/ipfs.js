const config = {
  repo: "ipfs/example",
  silent: true,
  relay: {
    enabled: true,
    hop: {
      enabled: true
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
        "/dns4/1.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/",
        "/dns4/2.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/",
        "/dns4/3.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/"
      ]
    },
    Bootstrap: [
      "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
      "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
      "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
      "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
      "/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
      "/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6",
      "/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8",
      "/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9",
      "/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw"
    ]
  }
};

function loadScript() {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/ipfs@0.34.0/dist/index.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

let ipfs = null;
export async function init() {
  return loadScript().then(() => {
    return new Promise((resolve, reject) => {
      ipfs = new window.Ipfs(config);
      ipfs.on("error", error => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
      ipfs.once("ready", () =>
        ipfs.id((err, info) => {
          if (err) {
            return reject(err);
          }
          // eslint-disable-next-line no-console
          console.log("ipfs id " + info.id);
          resolve(ipfs);
        })
      );
    });
  });
}
export default function() {
  if (ipfs === null) {
    throw new Error("ipfs not init");
  }
  return ipfs;
}
