module.exports = {
  plugins: [
    ["module-resolver", {
      root: ["./"],
      alias: {
        '@/*': "./src/",
        underscore: "lodash"
      }
    }]
  ],
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript'
  ],
}