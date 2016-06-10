var webpack       = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path          = require("path");
var fs            = require("fs");

module.exports = {
	target:  "node",
	cache:   false,
	context: __dirname,
	debug:   false,
	entry:  path.join(__dirname, "server.js"),
	output:  {
		path:          path.join(__dirname, "./dist"),
		filename:      "server.js"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false}),
	],
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ["file?context=static&name=/[path][name].[ext]"], exclude: /node_modules/},
			{test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
		],
		postLoaders: [
		],
		noParse: /\.min\.js/
	},
	externals: [nodeExternals({
		whitelist: ["webpack/hot/poll?1000"]
	})],
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"static"
		],
		extensions: ["", ".json", ".js"]
	},
	node:    {
		__dirname: true,
		fs:        "empty"
  }
}
