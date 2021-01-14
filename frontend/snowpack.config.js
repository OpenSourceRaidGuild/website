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
    port: 3000,
    open: 'none',
  },
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    }
  ],
  alias: {
    '#utils': './src/utils',
    '#components': './src/components',
  },
};
