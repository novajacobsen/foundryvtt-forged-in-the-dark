const CopyPlugin = require("copy-webpack-plugin");
const path = require("path")
const sass = require("sass")
const fs = require("fs")

if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
    fs.mkdirSync("dist/styles");
}


fs.writeFileSync("dist/styles/blades.css", sass.renderSync({
    file: "scss/style.scss",
    sourceMap: true,
    outFile: "dist/styles/blades.css"
}).css)

module.exports = {
    entry: "./module/blades.js",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "static",
                    to: "../"
                }
            ]
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: "blades.js",
        path: path.resolve(__dirname, "dist", "module")
    }
}