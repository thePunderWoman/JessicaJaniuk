const path = require('path');
const nodeExternals = require('webpack-node-externals');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = {
  entry: {
    server: './src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [nodeExternals({
     whitelist: [
       /^@angular\/material/,
       /ngx-cookie/
     ]
   })],
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.prod.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    })
  ]
}
