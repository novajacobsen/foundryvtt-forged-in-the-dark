const CopyPlugin = require("copy-webpack-plugin");
const path = require("path")
const sass = require("sass")
const fs = require("fs")
require("dotenv").config()

const out = process.env.FORGED_IN_THE_DARK_OUT_LOCATION || path.resolve(__dirname, "dist")

if (!fs.existsSync(out)) {
    fs.mkdirSync(out);
    fs.mkdirSync(path.resolve(out, "styles"));
}


fs.writeFileSync(path.resolve(out, "styles", "blades.css"), sass.renderSync({
    file: "scss/style.scss",
    sourceMap: true,
    outFile: path.resolve(out, "styles", "blades.css")
}).css)



module.exports = {
    entry: "./src/index.ts",
    mode: process.env.MODE,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.hbs/,
                loader: "file-loader",
                options: {
                    publicPath: "systems/forged-in-the-dark/"
                }
            }
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "static",
                    to: "./"
                }
            ]
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: "index.js",
        path: out
    }
}