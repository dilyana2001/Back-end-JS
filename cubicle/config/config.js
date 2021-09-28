const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    },
    production: {
        DB_CONNECTION: 'mongodb+srv://admin:R5V4PFlcpqVPQtbM@cluster0.jmdj5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        PORT: 80,
    }
}

module.exports = config[process.env.NODE_ENV.trim()]