document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const messages = document.querySelector("ul");
  const input = document.querySelector("input");
  const form = document.querySelector("form");
  const getQuoteButton = document.querySelector("form div p");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (message) {
      socket.emit("message", message);
      input.value = "";
    }
  });

  socket.on("message", (message) => {
    const listItem = document.createElement("li");
    listItem.textContent = `"${message}"`;
    messages.insertBefore(listItem, messages.firstChild);
  });

  async function loadQuotes() {
    try {
      const response = await fetch("/quotes");
      const quotes = await response.json();

      messages.innerHTML = "";

      for (let i = quotes.length - 1; i >= 0; i--) {
        const listItem = document.createElement("li");
        listItem.textContent = `"${quotes[i].quote}"`;
        messages.appendChild(listItem);
      }
    } catch (error) {
      console.error("Fout bij het laden van de quotes:", error);
    }
  }

  getQuoteButton.addEventListener("click", () => {
    fetchQuoteFromAPI();
  });

  async function fetchQuoteFromAPI() {
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=",
        {
          method: "GET",
          headers: {
            "X-Api-Key": "1p/aMmyNR/hWCN736BiNug==0v5FiqrkcZCr06G7",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Netwerkfout bij het ophalen van de quote.");
      }

      const result = await response.json();
      const randomQuote = result[0].quote;
      input.value = randomQuote;
    } catch (error) {
      console.error("Fout bij het ophalen van de quote:", error);
    }
  }

  loadQuotes();
});
