const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    },
    production: {
        PORT: 80
    }
}

module.exports = config[process.env.NODE_ENV.trim()]
