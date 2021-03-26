const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes", (req, res, next) => {
  if (req.query.person) {
    const quotesByPerson = quotes.filter(
      (quote) => quote.person === req.query.person
    );
    if (quotesByPerson.length > 0) {
      res.send({ quotes: quotesByPerson });
    } else {
      res.send([]);
    }
  } else {
    res.send({ quotes: quotes });
  }
});

app.get("/api/quotes/random", (req, res, next) => {
  res.send({ quote: getRandomElement(quotes) });
});

app.post("/api/quotes", (req, res, next) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;

  if (newQuote && newPerson) {
    const quote = req.query;
    quotes.push(quote);
    res.status(201).send({ quote: quote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
