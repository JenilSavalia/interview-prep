import mongoose from 'mongoose'


const connectMongoDB = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1/auth');
        console.log("Success Connected")
    } catch (e) {
        console.error("Error Connecting to MOngoDb", error.message);
    }
}

export default connectMongoDB