const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res) => {
  const quote = getRandomElement(quotes);
  res.send({ quote });
});

app.get("/api/quotes", (req, res) => {
  const { person } = req.query;

  if (!person) return res.send({ quotes });

  const quotesByPerson = quotes.filter((quote) =>
    quote.person.toLowerCase().includes(person.toLowerCase())
  );

  res.send({ quotes: quotesByPerson });
});

app.post("/api/quotes", (req, res) => {
  const { quote, person } = req.query;

  if (!quote || !person) return res.status(400).send();

  quotes.push({ quote, person });

  res.send({ quote: { quote, person } });
});

app.listen(PORT);
