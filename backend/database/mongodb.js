import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = async() => {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the Database");
    } catch (error) {
        console.log(error);
    }
};

export default connect;