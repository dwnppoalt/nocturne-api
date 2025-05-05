import { Pool } from 'pg';;
import env from './env.js';
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = env;

class Database {
    constructor() {
        this.pool = new Pool({
            user: DB_USER,
            host: DB_HOST,
            database: DB_DATABASE,
            password: DB_PASSWORD,
            port: DB_PORT,
            ssl: true
        });
    }
    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            message TEXT NOT NULL,
            author VARCHAR(255) NOT NULL,
            color VARCHAR(7) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        try {
            await this.pool.query(query);
            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }

    async insertMessage(message, author, color) {
        const query = `INSERT INTO messages (message, author, color) VALUES ($1, $2, $3) RETURNING id`;
        try {
            const res = await this.pool.query(query, [message, author, color,]);
            console.log('Message inserted with ID:', res.rows[0].id);
            return {
                id: res.rows[0].id,
            };
        } catch (error) {
            console.error('Error inserting message:', error);
        }
    }

    async searchMessages(searchTerm, page = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM messages WHERE message ILIKE $1 OR author ILIKE $1 LIMIT $2 OFFSET $3`;
        try {
            console.log(`Executing query: ${query} with values: [%${searchTerm}%, ${limit}, ${offset}]`);
            const res = await this.pool.query(query, [`%${searchTerm}%`, limit, offset]);
            return res.rows;
        } catch (error) {
            console.error('Error searching messages:', error);
            throw error; // Re-throw the error for better debugging
        }
    }

    async getRandom(count) {
        const query = `SELECT * FROM messages ORDER BY RANDOM() LIMIT $1`;
        try {
            const res = await this.pool.query(query, [count]);
            return res.rows;
        } catch (error) {
            console.error('Error getting random messages:', error);
        }
    }

    getNote(id) {
        const query = `SELECT * FROM messages WHERE id = $1`;
        return this.pool.query(query, [id])
            .then(res => res.rows[0])
            .catch(err => console.error('Error getting note:', err));
    }
}

export default Database;
