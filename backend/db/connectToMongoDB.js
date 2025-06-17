import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(`mongodb://localhost:27017/chat-app`);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
