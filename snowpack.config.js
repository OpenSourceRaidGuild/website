/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    'frontend/public': { url: '/', static: true },
    'frontend/src': { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  packageOptions: {
    polyfillNode: true,
  },
  devOptions: {
    port: 3000,
    open: 'none',
  },
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  alias: {
    '#components': './frontend/src/components',
  },
}
