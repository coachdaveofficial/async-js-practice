

function getDeckId() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => {
          resolve(response.data.deck_id);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

function getCardFromDeck(deckId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                resolve({image: response.data.cards[0].image,
                        value: response.data.cards[0].value,
                        suit: response.data.cards[0].suit
                        });
            })
            .catch(error => {
                console.log(error)
                reject(error)
            });
    });
}

// Define a variable to keep track of the card container element
let cardContainer = $('#card-holder');

$(document).ready(() => {
    let cardImg;
    $('#draw-card-btn').on('click', () => {
        getDeckId()
            .then(deckId => getCardFromDeck(deckId))
            .then(cardObj => {
                cardImg = $("<img>").attr("src", cardObj['image'])

                // Create a new card element and append it to the card container
                let cardElement = $("<div class='card'>").append(cardImg);
                let randomRotation = Math.floor(Math.random() * 360);
                cardElement.css("transform", `rotate(${randomRotation}deg)`);

                // Append the card element to the card container
                cardContainer.append(cardElement);
            })
    });
});