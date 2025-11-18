const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "taskmanager",
        });

        console.log("Mongoose connected to MongoDB Atlas");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = {
    connectToDB
}