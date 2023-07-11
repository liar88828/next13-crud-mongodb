import React from 'react'
import dbConnect from '../utils/dbConnection'
import Todo from '../../../lib/model/Todo'

export default async function Show ()
{
  dbConnect()
  const todos = await Todo.find()
  
  return (
    <div>
      <main className="m-10 space-y-5">
        <h1 className="text-xl font-bold">Todos</h1>
        <div className="">
          <ul className="flex flex-bold">
            <li className='flex-1'>No</li>
            <li className='flex-1'>Title</li>
            <li className='flex-1'>Todo</li>
            <li className='flex-1'>options</li>
          </ul>
          <hr />
          { todos.map( (t,i) => (
            <>
              <ul className="flex" key={t._id}>
                <li className='flex-1'>{i+1} </li>    
                <li className='flex-1'>{ t.title}</li>
                <li className='flex-1'>{ t.todo}</li>
                <li className='flex-1'>
                  <div className="flex">
                    <button className='p-2 m-2 bg-red-600 text-white hover:cursor-pointer'> Delete
                    </button>
                    <button className='p-2 m-2 bg-blue-600 text-white hover:cursor-pointer'> Edit
                    </button>

                  </div>
                </li>
              </ul>
            </>
          ))}
        </div>
      </main>  


    </div>
  )
}
