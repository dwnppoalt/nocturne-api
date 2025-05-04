import { config } from "dotenv"
config();


export default {
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: Number(process.env.DB_PORT)
};