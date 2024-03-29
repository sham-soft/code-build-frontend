module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: '127.0.0.1',
        port: 8080 // Тут можно поменять порт!
    },

    css: {
        loaderOptions: {
            scss: {
                // Глобальный импорт общего scss
                prependData: `@import "~@/assets/scss/main.scss";`
            }
        }
    },

    // Настройка для хостинга гитхаба
    // publicPath: process.env.NODE_ENV === 'production' ? '/demo.github.io/' : '/',

    pages: {
        // Название вкладки
        index: {
            entry: 'src/main.js',
            title: 'CodeBuild',
        },
    }
};