const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());       //  built-in middleware used to convert incoming json data into js object

app.post("/signup", async (req,res) => {
    // Creating a new instance of the User model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully!");
    } catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, ()=> {
            console.log("Server is successfully listening on port 7777... ");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected!");
    });