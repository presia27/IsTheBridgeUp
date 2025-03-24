const { Pool } = require('pg');

const connector = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

/**
 * Tests connection to database
 */
async function connectToDatabase() {
    try {
        await connector.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}

connectToDatabase();

module.exports = connector;
