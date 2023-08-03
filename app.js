const express = require("express");
const cors = require("cors");

const logger = require("./logger");
const countries = require("./countries");
const capitalsScores = require("./capitals-scores.json");
const countriesScores = require("./countries-scores.json");
const flagsScores = require("./flag-scores.json");

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

app.get("/capitals_scores", (req, res) => {
    capitalsScores.sort((a, b) => (b.score - a.score));
    res.status(200).send(capitalsScores);
})

app.post("/capitals_scores", (req, res) => {
    const newScore = req.body;
    capitalsScores.push(newScore);
    res.status(201).send(newScore);
})

app.get("/countries_scores", (req, res) => {
    countriesScores.sort((a, b) => (b.score - a.score));
    res.status(200).send(countriesScores);
})

app.post("/countries_scores", (req, res) => {
    const newScore = req.body;
    countriesScores.push(newScore);
    res.status(201).send(newScore);
})

app.get("/flags_scores", (req, res) => {
    flagsScores.sort((a, b) => (b.score - a.score));
    res.status(200).send(flagsScores);
})

app.post("/flags_scores", (req, res) => {
    const newScore = req.body;
    flagsScores.push(newScore);
    res.status(201).send(newScore);
})

module.exports = app;
