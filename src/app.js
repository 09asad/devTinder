const express = require("express");

const app = express();

app.use("/hello", (req,res) => {
    res.send("Hello Everyone!");
});

app.use((req,res) => {
    res.send("Good Morning Everyone");
}); 

app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000... ");
});