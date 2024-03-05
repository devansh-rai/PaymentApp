const mongoose = require('mongoose');
// const MONGO_URI = require('.env');
// const dotenv = require('dotenv');

// dotenv.config();
// console.log(process);
// const MONGO_URI = env.MONGO_URI;
const MONGO_URI = "mongodb+srv://devansh_rai:anupamrai@cluster0.hlgzxch.mongodb.net/Paytm";

const mongoClient = async()=>{
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {mongoClient,User,Account};