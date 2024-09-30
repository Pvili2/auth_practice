import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"

//to access dotentv variables
dotenv.config();

const app = express();
//middlewares
app.use(express.json()); //allow us to use req.body
app.use(cookieParser()) // allow us to parse incoming cookies
app.use(cors());
const PORT = process.env.PORT || 5000;
//implement routes
app.use("/api/auth", authRoutes)

//run our server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    connectDb();
})