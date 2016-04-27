module.exports = {
    database: {
        mongodbConnString: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/valeet'
    },
    logging: {
        logPath: './log',
    },
    server: {
        url:  process.env.BASE_URL || 'http://localhost',
        port: process.env.PORT || 3015 
    }
};