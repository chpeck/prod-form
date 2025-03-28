import { connectToDatabase } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { db } = await connectToDatabase();
	const report = await db.collection('reports').findOne({ _id: new ObjectId(params.id) });
	if (!report) {
		return json({ error: 'Report not found' }, { status: 404 });
	}
	return json(report);
}

export async function PUT({ params, request }) {
	const { db } = await connectToDatabase();
	const data = await request.json();
	await db.collection('reports').updateOne(
		{ _id: new ObjectId(params.id) },
		{ $set: data }
	);
	return json({ updated: true });
}

export async function DELETE({ params }) {
	const { db } = await connectToDatabase();
	await db.collection('reports').deleteOne({ _id: new ObjectId(params.id) });
	return json({ deleted: true });
}

export async function POST({ params, request }) {
	const { db } = await connectToDatabase();
	const data = await request.json();
  console.log(params.id)
	const result = await db.collection('reports').updateOne(
		{ _id: new ObjectId(params.id) },
		{ $set: data }
	);
	if (result.modifiedCount === 0) {
		return json({ error: 'Report not found or no changes made' }, { status: 404 });
	}
	return json({ updated: true });
}
