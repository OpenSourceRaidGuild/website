/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  packageOptions: {
    polyfillNode: true,
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  devOptions: {
    port: 3000,
    open: 'none',
  },
  alias: {
    '#components': './src/components',
    '#utils': './src/utils',
    '#assets': './assets',
  },
  exclude: ['**/*.stories.@(js|jsx|ts|tsx)'],
}
