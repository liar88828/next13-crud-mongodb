
import Todo from "../../lib/model/Todo.js";
import mongoose from "mongoose";
import dbConnect from "./utils/dbConnection.js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache.js";

export default function Home() {
  async function newTodo(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let todo = data.get("todo")?.valueOf();

    try {
   dbConnect()
      let newTodo = new Todo({ title, todo });
      await newTodo.save();
      console.log(newTodo);
    } catch (e) {
      console.log(e);
    }
    revalidatePath( '/show' )
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Create Todo</h1>

      <form action={newTodo} className="flex flex-col gap-2">
        <label htmlFor="title" className="text-lg">
          Title
          <input
            type="text"
            name="title"
            id="title"
            className="w-[100%] bg-slate-200 h-10 p-3"
          />
        </label>

        <label htmlFor="todo" className="text-lg">
          Todo
          <input
            type="text"
            name="todo"
            id="todo"
            className="w-[100%] bg-slate-200 h-10 p-3"
          />
        </label>

        <div className=" flex justify-center mt-5">
          <button
            type="submit"
            className=" w-1/2 p-3 bg-yellow-400 bold hover:bg-orange-500 hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
