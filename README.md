# QuoteWall 💬
Voor het vak Realtime Web heb ik een applicatie gemaakt waar gebruikers quotes kunnen lezen en eventueel zelf kunnen posten. Alle quotes worden realtime toegevoegd en zijn direct zichtbaar voor alle andere gebruikers. Wanneer een gebruiker graag een quote zou willen posten maar even geen inspiratie heeft kan hij/zij een random quote ophalen uit een API. Alle quotes worden opgeslagen in een MongoDB database.

Bekijk QuoteWall live: https://quotewall.adaptable.app/

<img width="100%" alt="screenshot" src="https://github.com/maxvl3/quotewall/assets/94384526/b0fba4d5-2093-40c6-ac7c-419e50f1cba6">

## Gebruikte technologiën 🔨
- HTML
- CSS
- JavaScript
- Node.js
- Socket.io
- MongoDB

## Data-lifecycle ♼

<img width="100%" alt="datalifecycle" src="https://github.com/maxvl3/quotewall/assets/94384526/37fd70a4-774e-4477-99c5-f710e2168517">

## Realtime events 🔜
- <strong>Connenction event:</strong> Dit event wordt afgevuurd wanneer een client verbinding maakt met de server via Socket.IO. In dit geval wordt de boodschap "a user connected" naar de console gelogd.
- <strong>Message event:</strong> Dit event wordt afgevuurd wanneer de server een bericht ontvangt van een client via Socket.IO. Het ontvangen bericht wordt toegevoegd aan de database en vervolgens wordt het "message" event geëmitteerd naar alle verbonden clients, zodat ze het bericht kunnen ontvangen.
- <strong>Disconnect event:</strong> Dit event wordt afgevuurd wanneer een client de verbinding verbreekt met de server via Socket.IO. In dit geval wordt de boodschap "user disconnected" naar de console gelogd.

## External data source ⚙️
Ik heb gebruik gemaakt van de quotes API van API Ninjas. Deze API is zeer eenvoudig te gebruiken en geeft je toegang tot ruim 50.000 quotes. Als opties kan je eventueel een categorie meegeven en de hoeveelheid quotes die je per request wilt ontvangen.

In mijn applicatie haal ik elke keer wanneer een gebruiker op de ‘random quote’ tekst drukt een nieuwe quote op en plaats deze in het input veld van mijn formulier. Hier de code:

```

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
        var Randomquote = result[0].quote;
        var textField = document.getElementById('message-input');
        textField.value = Randomquote;
    })
    .catch(function(error) {
        console.error('Error: ', error);
    });
}
```

De response van de API ziet er ongeveer als volgt uit:


```

[
  {
    "quote": "The will of man is his happiness.",
    "author": "Friedrich Schiller",
    "category": "happiness"
  }
]
```

Linkje naar API Ninjas: https://api-ninjas.com/
