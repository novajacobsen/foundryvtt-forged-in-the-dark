const CopyPlugin = require("copy-webpack-plugin");
const path = require("path")
const sass = require("sass")
const fs = require("fs")
const fsUtils = require("nodejs-fs-utils");
require("dotenv").config()

const out = process.env.FORGED_IN_THE_DARK_OUT_LOCATION || path.resolve(__dirname, "dist")

const mode = process.env.MODE || "development"

if (fs.existsSync(out)) {
    fsUtils.rmdirsSync(out)
}

fs.mkdirSync(out);
fs.mkdirSync(path.resolve(out, "styles"));


fs.writeFileSync(path.resolve(out, "styles", "styles.css"), sass.renderSync({
    file: "scss/style.scss",
    sourceMap: true,
    outFile: path.resolve(out, "styles", "styles.css")
}).css)

module.exports = {
    entry: mode === "development" ? "./src/dev_index.ts" : "./src/prod_index.ts",
    mode,
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