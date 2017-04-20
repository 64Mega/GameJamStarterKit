module.exports = {
    entry: './src/main.ts',
    output: {
        path: './dist/',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.webpack.js','.web.js','.ts','.tsx','.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}