const express = require("express");
const cors = require("cors");

const logger = require("./logger");
const countries = require("./countries");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.status(200).send("welcome to our app");
})

app.get("/countries", (req, res) => {
    res.status(200).send(countries);
})

app.get("/countries/:id", (req, res) => {
    const idx = req.params.id;
    const country = countries[idx-1]; 
    if(!country) {
        res.status(404).json({message: `Country with id ${idx} not found.`});
    } else {
        res.status(200).send(country);
    }
})

app.post("/countries", (req, res) => {
    res.status(201).send("submission posted!");
})

module.exports = app;
