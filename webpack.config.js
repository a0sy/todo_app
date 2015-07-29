module.exports = {
  entry: './js/todo.js',
  output: {
    path: __dirname,
    filename: './js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html?minimize' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jade$/, loader: 'jade' }
    ]
  }
};
