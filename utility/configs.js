const configs = {
    SERVER_PORT: 3000,
    MONGO_URI: `mongodb+srv://root:IIHbTMDSaTyrCZ7s@cluster0.u9qf0.mongodb.net/?retryWrites=true&w=majority`,
    MONGO_PASS: "IIHbTMDSaTyrCZ7s",

    JWT_ACCESS_TOKEN_EXPIRY_TIME: 60 * 60 * 60,
    JWT_ACCESS_TOKEN_EXPIRY_TIME_WEB: 60 * 60 * 60,
    JWT_ACCESS_TOKEN_PRIVATE_KEY: "thisismyprivatekeyforthejobportal",
    RANDOM_NUMBER_LENGTH: 16,
}

module.exports = configs