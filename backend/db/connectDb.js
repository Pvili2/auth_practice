import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connect ${conn.connection.host}`);
    } catch (error) {
        console.error("Couldn't connect mongodb", error);
        process.exit(1); //1 is failure
    }
}