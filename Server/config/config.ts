import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: parseInt(process.env.PORT, 10),

    databaseURL: process.env.MONGODB_URI,
};