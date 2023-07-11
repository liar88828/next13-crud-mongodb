import { Suspense } from 'react'
import Todo from '../../../lib/model/Todo'
import Link from 'next/link'
import Loading from '../loading'
import { revalidateTag } from 'next/cache'

const getTodo = async () =>
{
	const res = await fetch( 'http://localhost:3000/api/todos',
		{
			cache: "no-cache",
			next: {
				tags: [ "todos" ],
			},
		} )
	const data = await res.json()
	revalidateTag( 'todos' )
	return data.message
}

export default async function Show ()
{
	// await dbConnect()
	// const todos = await Todo.find()
	const todos = await getTodo()
	// console.log(todos)

	const deleteTodo = async ( data ) =>
	{
		'use server'
		let id = JSON.parse( data.get( 'id' )?.valueOf() )
		console.log( id )
		await Todo.deleteOne( { _id: id } )
		// redirect( '/show' )
		revalidateTag( 'todos' )
	}

	return (
		<>
			<main className='m-10 space-y-5'>
				<h1 className='text-xl font-bold'>Todos</h1>
				<div>
					<ul className='flex flex-bold'>
						<li className='flex-1'>No.</li>
						<li className='flex-1'>Title</li>
						<li className='flex-1'>Todo</li>
						<li className='flex-1'>options</li>
					</ul>
					{/* {console.log(todos)} */ }
					<hr />
					<Suspense fallback={ <Loading /> }>
						{ todos.map( ( t, i ) =>
						{
							return (
								<>
									<ul
										className='flex'
										key={ t._id }>
										<li className='flex-1'>{ i + 1 } </li>
										<li className='flex-1'>{ t.title }</li>
										<li className='flex-1'>{ t.todo }</li>
										<li className='flex-1'>
											<div className='flex'>
												<form action={ deleteTodo }>
													<input
														type='text'
														className='hidden'
														name='id'
														id='id'
														defaultValue={ JSON.stringify( t._id ) }
													/>
													<button
														type='submit'
														className='p-2 m-2 bg-red-600 text-white hover:cursor-pointer'>
														Delete
													</button>
												</form>
												<Link href={ `/edit/${ t._id }` }>
													<button className='p-2 m-2 bg-blue-600 text-white hover:cursor-pointer'>
														Edit
													</button>
												</Link>
											</div>
										</li>
									</ul>
								</>
							)
						} ) }
					</Suspense>
				</div>
			</main>
		</>
	)
}

// export async function getStaticProps() {
// 	const res = await fetch('/api/todos', { method: 'GET' })
// 	const todo = await res.json()
// 	console.log(todo)
// 	return {
// 		props: todo,
// 	}
// }
// export const getStaticProps = async () => {
// 	const res = await fetch('http://localhost:3000/api/todos')
// 	const todo = await res.json()
// 	console.log(todo)
// 	return { props: { todo } }
// }

// export const getStaticProps = async () => {
// 	console.log('will generate or Regenerating ')
// 	const res = await fetch('http://localhost:3000/api/todos')
// 	const data = await res.json()
// 	return {
// 		props: {
// 			products: data,
// 		},
// 		revalidate: 30,
// 	}
// }
