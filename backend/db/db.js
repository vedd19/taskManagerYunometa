const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

async function connectToDB() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("connected to mongodb atlas")
    }
    catch (err) {
        console.log(err, "error")
    }
}

module.exports = {
    connectToDB
}