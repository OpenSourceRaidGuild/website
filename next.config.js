const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  swcMinify: true,
});
