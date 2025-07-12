import mongoose from "mongoose"

export const connectDB = (url) => {
    try {
        mongoose.connect(url)
        .then(() => console.log("MongoDB is Connected"))
        .catch((err) => console.log(err))
    } catch (error) {
        console.log(error.message);
    }
}