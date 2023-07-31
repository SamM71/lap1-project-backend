const express = require("express");
const cors = require("cors");

const logger = require("./logger");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.status(200).send("root page working!");
})

app.get("/capitals", (req, res) => {
    res.status(200).send("capitals page working!")
})

app.post("/capitals", (req, res) => {
    res.status(201).send("submission posted!");
})

module.exports = app;
