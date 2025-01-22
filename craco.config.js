// craco.config.js
module.exports = {
  babel: {
    plugins: [
      '@emotion/babel-plugin',
      // '@babel/plugin-proposal-private-property-in-object'
    ],
    presets: ['@emotion/babel-preset-css-prop'],
  },
};
