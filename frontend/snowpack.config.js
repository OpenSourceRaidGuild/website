/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
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
    fallback: '/index.html',
    port: 3000,
    open: 'none',
  },
  alias: {
    '#utils': './src/utils',
    '#components': './src/components',
  },
};
