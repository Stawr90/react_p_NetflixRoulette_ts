module.exports = (env) => {
    return env && env.production 
    ? require('./webpack.config.prod')
    : require('./webpack.config.dev')
}