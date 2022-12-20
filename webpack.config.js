const path = require("path");

const postCSSPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer"), require("postcss-hexrgba")];

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  /* webpack dev server workflow */
  devServer: {
    /* refresh browser when save html */
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    /* refresh browser when save css, js */
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  },
  mode: "development",
  /* postcss workflow with webpack */
  module: {
    rules: [
      {
        test: /\.css$/i /* regular expression */,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader?url=false",
            options: { postcssOptions: { plugins: postCSSPlugins } }
          }
        ]
      }
    ]
  }
};
