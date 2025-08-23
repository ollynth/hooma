import mongoose from 'mongoose' 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connect("mongodb+srv://Ron:roondbs48.@cluster0.h5puyck.mongodb.net/hooma_db?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully.");
    } catch (error){
        console.error("Failed to connect database.", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;