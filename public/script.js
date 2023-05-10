const socket = io();
const messages = document.querySelector("ul");
const input = document.querySelector("input");

document.querySelector("form").addEventListener("submit", (event) => {
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

// Functie om quotes van de server te ontvangen en weer te geven
async function loadQuotes() {
  try {
    const response = await fetch("/quotes");
    const quotes = await response.json();

    messages.innerHTML = "";

    for (let i = quotes.length - 1; i >= 0; i--) {
      messages.insertAdjacentHTML("beforeend", `<li>"${quotes[i].quote}"</li>`);
    }
  } catch (error) {
    console.error("Fout bij het laden van de quotes:", error);
  }
}

var url = 'https://api.api-ninjas.com/v1/quotes?category=';
const getQuote = document.querySelector('form div p');

function setQuoteInTextField() {
    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': '1p/aMmyNR/hWCN736BiNug==0v5FiqrkcZCr06G7',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(result) {
        var Randomquote = result[0].quote; // Verondersteld dat de quote zich in het eerste item van de resultaatarray bevindt
        var textField = document.getElementById('message-input'); // Vervang 'myTextField' door de daadwerkelijke id van je tekstveld
        textField.value = Randomquote;
    })
    .catch(function(error) {
        console.error('Error: ', error);
    });
}

getQuote.addEventListener("click", setQuoteInTextField);

// Roep de functie aan wanneer de pagina wordt geladen
window.addEventListener("load", loadQuotes);
