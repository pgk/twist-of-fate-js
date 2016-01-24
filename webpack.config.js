var path = require('path');

module.exports = {
    entry: './es6/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'twist-of-fate.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};
