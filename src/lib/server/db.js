import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

let client;
let db;

export async function connectToDatabase() {
	if (db) return { db, client };

	client = await MongoClient.connect(MONGODB_URI);
	db = client.db(); // default db from URI

	return { db, client };
}
