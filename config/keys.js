import dotenv from 'dotenv';
dotenv.config();
module.exports = {
    mongoURI: process.env.DB_CONNECT
}
