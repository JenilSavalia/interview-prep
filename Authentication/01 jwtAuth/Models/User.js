import mongoose from 'mongoose'



const userModel = new mongoose.Schema({
    // name: String,
    // age: Number,
    username: String,
    hashed: String,
})

export const User = mongoose.model("User", userModel);

// await User.create({ name: "js", age: 20, username: "jsavalia", hashed: "dsjhjfbhsfjs^%FRSAASYT" });
// console.log(await User.findOne({ name: "js" }))

