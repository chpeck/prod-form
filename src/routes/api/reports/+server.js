import { connectToDatabase } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { db } = await connectToDatabase();
	const reports = await db.collection('reports').find().sort({ createdAt: -1 }).toArray();
	return json(reports);
}

export async function POST({ request, locals }) {
  const session = await locals.getSession()
	const data = await request.json();
	const { db } = await connectToDatabase();
	const timestampedData = { ...data, createdAt: new Date(), createdBy: session.user };
	const res = await db.collection('reports').insertOne(timestampedData);
	return json({ insertedId: res.insertedId });
}
