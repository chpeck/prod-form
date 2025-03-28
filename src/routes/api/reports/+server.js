import { connectToDatabase } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { db } = await connectToDatabase();
	const reports = await db.collection('reports').find().toArray();
	return json(reports);
}

export async function POST({ request }) {
	const data = await request.json();
	const { db } = await connectToDatabase();
	const timestampedData = { ...data, createdAt: new Date() };
	const res = await db.collection('reports').insertOne(timestampedData);
	return json({ insertedId: res.insertedId });
}
