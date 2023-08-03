const express = require("express")
const morgan = require("morgan")
const app = express()

// application level middleware
app.use(morgan("dev"))

// router-level middleware
const checkForAbbreviationLength = (req, res, next) => {
    const abbreviation = req.params.abbreviation
    if (abbreviation.length !== 2) {
        next(`State abbreviation "${abbreviation}" is invalid.`)
    } else {
        next()
    }
}

// routes
app.get(
    "/states/:abbreviation",
    checkForAbbreviationLength,
    (req, res, next) => {
        res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`)
    }
)

app.get(
    "/travel/:abbreviation",
    checkForAbbreviationLength,
    (req, res, next) => {
        res.send(`Enjoy your trip to ${req.params.abbreviation}!`)
    }
)

// error handlers
app.use((req, res, next) => {
    res.send(`The route ${req.path} does not exist!`);
});
  
app.use((err, req, res, next) => {
    console.error(err)
    res.send(err)
})

module.exports = app