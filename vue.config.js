module.exports = {
    devServer: {
        open: true
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    "primary-color": "#2d73ed",
                    "font-size-base": "16px"
                },
                javascriptEnabled: true
            }
        }
    }
};
