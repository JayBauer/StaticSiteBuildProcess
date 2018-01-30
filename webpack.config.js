module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}

//   entry: [
//     './src/assets/js/app.js'
//   ],
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/',
//     filename: 'app.js'
//   },
//   // watch: true,
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'vue-style-loader',
//           'css-loader'
//         ],
//       },
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//         options: {
//           cssModules: {
//             localIndentName: '[path][name]---[local]---[hash:base64:5]',
//             camelCase: 'true'
//           }
//         }
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(png|jpg|gif|svg)$/,
//         loader: 'file-loader',
//         options: {
//           name: '[name].[ext]?[hash]'
//         }
//       }
//     ]
//   },
//   resolve: {
//     alias: {
//       'vue$': 'vue/dist/vue.esm.js'
//     },
//     extensions: ['*', '.js', '.vue', '.json']
//   },
// }
