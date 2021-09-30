const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb+srv://admin:rxVauu1kL3id0r4w@cluster0.jmdj5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        SALT_ROUNDS: 1,
        SECRET: 'navuhodonosor',
        COOKIE_NAME: 'USER_SESSION',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://admin:rxVauu1kL3id0r4w@cluster0.jmdj5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        SALT_ROUNDS: 6,
        SECRET: 'navuhodonosor',
        COOKIE_NAME: 'USER_SESSION',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];