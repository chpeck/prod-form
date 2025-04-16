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

export async function PUT({ params, request, locals }) {
  const session = await locals.getSession()
	const { db } = await connectToDatabase();
	const data = await request.json();
	const updatedData = { ...data, updatedAt: new Date(), updatedBy: session.user };
	await db.collection('reports').updateOne(
		{ _id: new ObjectId(params.id) },
		{ $set: updatedData }
	);
	return json({ updated: true });
}

export async function DELETE({ params }) {
	const { db } = await connectToDatabase();
	await db.collection('reports').deleteOne({ _id: new ObjectId(params.id) });
	return json({ deleted: true });
}

