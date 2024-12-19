const { env } = require('process');

const lastResortPort = 7190;

const httpTarget = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : `https://localhost:${lastResortPort}`;

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Screen"
    ],
    target: httpTarget,
    secure: false,
    changeOrigin: true,
  },
  {
    context: [
      "/screenHub",
    ],
    target: httpTarget,
    secure: false,
    "ws": true,
  }
]

module.exports = PROXY_CONFIG;
