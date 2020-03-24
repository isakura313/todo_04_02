const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js', //указать наш файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js' //указать итоговый файл
  }
};