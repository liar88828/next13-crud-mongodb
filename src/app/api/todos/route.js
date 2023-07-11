// export default async function getData(req, res) {
// 	dbConnect()
// 	const posts = await Todo.find()
// 	console.log(posts)
// 	res.json({ posts })
// }
import dbConnect from '@/app/utils/dbConnection'
import { NextResponse } from 'next/server'
import Todo from '../../../../lib/model/Todo'

export async function GET() {
	dbConnect()
	const posts = await Todo.find()
	// console.log(posts)
	return NextResponse.json({
		message: posts,
	})
}
