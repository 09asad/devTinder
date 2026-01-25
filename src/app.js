const express = require("express");

const app = express();

app.get("/user", (req,res) => {
    res.send({firstName: "Asad", lastName: "Khan"});
});

app.post("/user", (req,res) => {
    res.send("Data successfully saved to the database");
});

app.delete("/user", (req,res) => {
    res.send("Data deleted successfully");
});

app.get("/student", (req,res) => {
    res.send(req.query);                // requesting query from POSTMAN GET
});

app.get("/employee/:empID/:name/:password", (req,res) => {
    res.send(req.params);                // requesting params from POSTMAN GET
});

app.use("/hello", (req,res) => {
    res.send("Hello Everyone!");
});

app.use((req,res) => {
    res.send("Good Morning Everyone");
}); 

app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000... ");
});