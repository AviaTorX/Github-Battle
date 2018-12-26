var path = require("path");
var config = {
    mode:"none",
    entry:"./src/index.tsx",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    resolve:{
        extensions:[".ts", ".tsx", ".js"]
    },
    module:{
        rules:[
            {test:/\.tsx?$/, loader:"awesome-typescript-loader"}
        ]
    }
};

module.exports = config;