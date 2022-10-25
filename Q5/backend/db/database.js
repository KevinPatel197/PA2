var mongoose = require('mongoose');
const DB_URL = process.env.DB_URL
class database {
    constructor() {
        this._connect()
    }
    async _connect() {
        try {
            await mongoose.connect(DB_URL)
            console.log(`database connection successfull`)
        } catch (error) {
            console.error('Database connection error: ' + error);
        }
    }
}

module.exports = new database()