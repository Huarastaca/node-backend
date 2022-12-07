import {MongoClient} from "mongodb";

export async function connect() {
    if (global.db) return global.db;
    return await createConnection();
}

async function createConnection() {
    const conn = await MongoClient.connect('mongodb+srv://murilo:murilo@murilocluster.ex1chvv.mongodb.net/test');
    if (!conn) return new Error(`Can't connect`);
    global.db = await conn.db('picstream');
    return global.db
}
