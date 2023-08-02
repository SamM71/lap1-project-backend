const express = require("express");
const cors = require("cors");

const logger = require("./logger");
const countries = require("./countries");
const scores = require("./scores.json");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

function random() {
    const num = Math.floor(Math.random() * countries.length);
    return num;
}

app.get("/", (req, res) => {
    res.status(200).send(`Welcome to our app, there are ${countries.length} countries and territories.`);
})

app.get("/countries", (req, res) => {
    res.status(200).send(countries);
})

app.get("/countries/random", (req, res) => {
    const country = countries[random()];
    res.status(200).send(country);
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

app.get("/scores", (req, res) => {
    res.status(200).send(scores);
})

app.post("/scores", (req, res) => {
    const newScore = req.body;
    scores.push(newScore);
    res.status(201).send(newCountry);
})

module.exports = app;
