import dbConnect from '@/app/utils/dbConnection'
import Todo from '../../../../lib/model/Todo'
import { Suspense } from 'react'
import Loading from '../../loading'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function edit({ params }) {
	dbConnect()
	const todos = await Todo.findOne({ _id: params.id })

	async function updateTodo(data) {
		'use server'
		let title = await data.get('title')?.valueOf()
		let todo = await data.get('todo')?.valueOf()
		let updateTodo = await Todo.findByIdAndUpdate(
			{ _id: params.id },
			{ title, todo },
		)
		console.log( updateTodo )
		revalidatePath( '/show' )
		redirect('/show')
	}

	return (
		<main className='m-10 space-y-5'>
			<h1 className='text-xl font-bold'>Edit Todo</h1>

			<Suspense fallback={<Loading />}>
				<form
					action={updateTodo}
					className='flex flex-col gap-2'>
					<div>
						<label
							htmlFor='title'
							className='text-lg'>
							Title
						</label>
						<input
							type='text'
							name='title'
							id='title'
							className='w-[100%] bg-slate-200 h-10 p-3'
							defaultValue={todos.title}
						/>
					</div>

					<label
						htmlFor='todo'
						className='text-lg'>
						Todo
						<input
							type='text'
							name='todo'
							id='todo'
							className='w-[100%] bg-slate-200 h-10 p-3'
							defaultValue={todos.todo}
						/>
					</label>

					<div className=' flex justify-center mt-5'>
						<button
							type='submit'
							className=' w-1/2 p-3 bg-yellow-400 bold hover:bg-orange-500 hover:text-white'>
							Submit
						</button>
					</div>
				</form>
			</Suspense>
		</main>
	)
}
