const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
require("dotenv").config();
const io = require("socket.io")(http);
const port = process.env.PORT || 4242;
const { MongoClient } = require("mongodb");

// Verbindings-URL voor MongoDB
const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@database.p67zuca.mongodb.net/?retryWrites=true&w=majority`;
// Naam van de database
const dbName = "db";

// MongoDB-client voor de verbinding
let mongoClient;

// Functie om een nieuwe quote toe te voegen aan de database
async function addQuoteToDatabase(quote) {
  try {
    const db = mongoClient.db(dbName);
    const collection = db.collection("quotes");
    await collection.insertOne({ quote: quote });
    console.log("Quote toegevoegd aan de database.");
  } catch (error) {
    console.error(
      "Fout bij het toevoegen van de quote aan de database:",
      error
    );
  }
}

// Functie om quotes uit de database op te halen
async function getQuotesFromDatabase() {
  try {
    const db = mongoClient.db(dbName);
    const collection = db.collection("quotes");
    const quotes = await collection.find().toArray();
    return quotes;
  } catch (error) {
    console.error("Fout bij het ophalen van de quotes uit de database:", error);
    throw error;
  }
}

app.use(express.static(path.resolve("public")));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", async (message) => {
    await addQuoteToDatabase(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/quotes", async (req, res) => {
  try {
    const quotes = await getQuotesFromDatabase();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden" });
  }
});

// Verbind met de MongoDB-server voordat de server luistert naar het poortnummer
MongoClient.connect(url)
  .then((client) => {
    mongoClient = client;
    console.log("Verbonden met de MongoDB-server.");

    // Start de server nadat de verbinding met de database tot stand is gebracht
    http.listen(port, () => {
      console.log("Luisteren op poort", port);
    });
  })
  .catch((error) => {
    console.error("Fout bij het verbinden met de MongoDB-server:", error);
  });
