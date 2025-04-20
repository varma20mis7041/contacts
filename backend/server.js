const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());

const contactRoutes = require('./routes/contacts');



app.use(cors());




app.use('/api/contact', contactRoutes);


const http = require("http");

const server = http.createServer(app);



app.use(express.json());

const initializeDBAndServer = async () => {

 const username = encodeURIComponent(process.env.MONGO_USERNAME);
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const uri = `mongodb+srv://${username}:${password}@testdb.oaoihad.mongodb.net/?retryWrites=true&w=majority&appName=TestDb`
  
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB...");
        server.listen(9000, () => {
            console.log('Server running on port: 9000');
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

initializeDBAndServer();