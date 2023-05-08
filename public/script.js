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
  messages.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
  messages.scrollTop = messages.scrollHeight;
});

// Functie om quotes van de server te ontvangen en weer te geven
async function loadQuotes() {
  try {
    const response = await fetch("/quotes");
    const quotes = await response.json();

    // Leegmaken van de <ul>
    messages.innerHTML = "";

    // Toevoegen van de quotes aan de <ul> in omgekeerde volgorde
    for (let i = quotes.length - 1; i >= 0; i--) {
      messages.insertAdjacentHTML("beforeend", `<li>${quotes[i].quote}</li>`);
    }
  } catch (error) {
    console.error("Fout bij het laden van de quotes:", error);
  }
}

// Roep de functie aan wanneer de pagina wordt geladen
window.addEventListener("load", loadQuotes);
