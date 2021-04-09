const path = require('path')
// const host = 'https://static-resources-file-bucket.oss-cn-shenzhen.aliyuncs.com'
const resolve = dir => {
    return path.join(__dirname, dir)
}

const cdn = {
    externals: {
        echarts: 'echarts'
    }
}
module.exports = {
    // 资源为相对路径而非默认的根路径
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            enableRemoteModule: true,
            // externals: ['nedb'],
            // nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                productName: 'blackboard',
                appId: 'com.example.yourapp',
                nsis: {
                    oneClick: false, // 是否一键安装
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    installerIcon: './build/icons/icon.ico', // 安装图标
                    uninstallerIcon: './build/icons/icon.ico', // 卸载图标
                    installerHeaderIcon: './build/icons/icon.ico', // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    shortcutName: '小黑板' // 图标名称(项目名称)
                },
                dmg: {
                    contents: [
                        {
                            x: 410,
                            y: 150,
                            type: 'link',
                            path: '/Applications'
                        },
                        {
                            x: 130,
                            y: 150,
                            type: 'file'
                        }
                    ]
                },
                mac: {
                    icon: './build/icons/icon.icns'
                },
                win: {
                    icon: './build/icons/icon.ico'
                },
                linux: {
                    icon: './build/icons'
                }
            }
        }
    },
    configureWebpack: {
        externals: cdn.externals,
        resolve: {
            // 路径别名
            alias: {
                '@': resolve('src'),
                '@u': resolve('src/assets/utils'),
                pages: resolve('src/pages'),
                styles: resolve('src/assets/styles')
            }
        }
    },
    chainWebpack: config => {
        // 注入cdn
        config.plugin('html').tap(args => {
            args[0].title = 'helloword'
            args[0].cdn = cdn
            return args
        });
        // 全局 less 变量
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => {
            config.module
                .rule('less')
                .oneOf(type)
                .use('style-resource')
                .loader('style-resources-loader')
                .options({ patterns: [resolve('src/assets/styles/variable.less')] })
        })
    }
}
