import Database from "../config/db.js";

const db = new Database();

export const createMessage = async (req, res) => {
    const { message, author, color } = req.body;
    try {
        const result = await db.insertMessage(message, author, color);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const searchMessages = async (req, res) => {
    const { q } = req.query;
    try {
        const messages = await db.searchMessages(q);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error searching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getRandomMessages = async (req, res) => {
    const { count } = req.query;
    try {
        const messages = await db.getRandom(count);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting random messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
