const express = require("express");

const app = express();

app.get("/getUserData",(req,res) => {
    // try{
        throw new Error("djsbjs");
        res.send("User Data Sent");
    // } catch(err){
    //     res.status(500).send("Some Error Found!");
    // }
});

app.use("/", (err, req, res, next) => {
    if(err){
        // Log your error
        res.status(500).send("Something went wrong");
    }
});

app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000... ");
});