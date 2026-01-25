const express = require("express");

const app = express();

app.use(
    "/user", 
        (req,res,next) => {
            console.log("Route user 1");
            next();
            res.send("1st Response");
        },
        (req,res,next) => {
            console.log("Route user 2");
            next();
            res.send("2nd Response");
        },
        (req,res,next) => {
            console.log("Route user 3");
            next();
            res.send("3rd Response");
        },
        (req,res,next) => {
            console.log("Route user 4");
            res.send("4th Response");
        }
);

app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000... ");
});