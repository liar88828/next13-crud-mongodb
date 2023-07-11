import mongoose from "mongoose";



export default async function dbConnect ()
{
     await mongoose.connect(
        "mongodb://root:password123@127.0.0.1:27018/nextjs-13-server-action?authSource=admin",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
 }