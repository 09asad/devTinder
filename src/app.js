const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());       //  built-in middleware used to convert incoming json data into js object
app.use(cookieParser());       // middleware

// ADD data into database
app.post("/signup", async (req,res) => {
    try{
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password, skills} = req.body;

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            skills,
        });
        await user.save();
        res.send("User added successfully!");
    } catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

app.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            // Create a JWT token
            const token = await jwt.sign({ _id : user._id }, "DEV@Tinder$698");
            console.log(token);

            // Add the token to cookie and sends the response back to the user
            res.cookie("token", token);
            res.send("Login Successfull!");
        } else{
            throw new Error("Password is incorrect");
        }
    } catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

app.get("/profile", async (req,res) => {
    try{
        const cookies = req.cookies;

        const {token} = cookies;
        if(!token){
            throw new Error("Invalid token");
        }

        // Validate my token
        const decodeMsg = await jwt.verify(token, "DEV@Tinder$698");

        const { _id } = decodeMsg;
        console.log("Logged In user is: "+ _id);

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User doesn't exist");
        }
        res.send(user);
    } catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

// GET user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// GET user by Id (params)
app.get("/user/:id", async (req,res) => {
    const userId = req.params.id;

    try{
        const users = await User.findById(userId);
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// GET all user 
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find();
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// DELETE user by id
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!");
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// UPDATE user by id
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["userId","photoURL","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 3){
            throw new Error("Skills can't be more than 3");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
        });
        res.send("User updated successfully!!");
    } catch(err){
        res.status(400).send("Error :"+ err.message);
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