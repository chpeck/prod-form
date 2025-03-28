import { connectToDatabase } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { db } = await connectToDatabase();
	const reports = await db.collection('reports').find().toArray();
	return json(reports);
}

export async function POST({ request }) {
  console.log('insert')
	const data = await request.json();
	const { db } = await connectToDatabase();
	const res = await db.collection('reports').insertOne(data);
	return json({ insertedId: res.insertedId });
}

