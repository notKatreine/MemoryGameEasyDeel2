const imagePaths = ['Picture1.png', 'Picture2.png', 'Picture3.png', 'Picture4.png', 'Picture5.png', 'Picture6.png', 'Picture7.png', 'Picture8.png' ]; // Your actual images
let cards = [...imagePaths, ...imagePaths]; // Create pairs by dubbling the array
let flippedCards = []; // temporary array that tracks fliped cards.


// randomize array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('board'); //Get the element with the ID board from memory.html file
    board.innerHTML = '';
    shuffle(cards).forEach((img, index) => {
        const card = document.createElement('div'); // Creates a "node" in memory
        card.classList.add('card'); //Attaches custom metadata to the HTML element. This is where we "hide" the image path inside the div.
        card.dataset.value = img;
        card.onclick = () => flipCard(card); // Finalizes the render by physically inserting the element into the HTML tree
        board.appendChild(card);
    });
}


function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) { // checks if there is alread a "flipped" card, if not add card
        card.classList.add('flipped'); // flipped as a css class that is now triggerd
        card.innerHTML = `<img src="${card.dataset.value}">`;
        flippedCards.push(card);

        if (flippedCards.length === 2) { // condition to check if two cards are being compared
            checkMatch();
        }
    }
}

let cardsToRemove = []; // Track the most recent matched pair

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        setTimeout(() => {
            // 1. Save these cards to be removed later
            cardsToRemove = [card1, card2];
            
            // 2. Open the modal with the matched image
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            modalImg.src = card1.dataset.value;
            modal.style.display = 'flex';

            flippedCards = [];
        }, 500);
    } else {
        // No match logic remains the same
        setTimeout(() => { 
            card1.classList.remove('flipped');
            card1.innerHTML = '';
            card2.classList.remove('flipped');
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

function closeModal() {
    // 1. Hide the modal
    document.getElementById('imageModal').style.display = 'none';
    
    // 2. Remove the matched cards from the board
    cardsToRemove.forEach(card => {
        card.style.visibility = 'hidden'; // Keeps layout stable
        // card.remove(); // Use this if you want other cards to shift
    });
    
    cardsToRemove = []; // Reset tracker
}




function resetGame() {
    createBoard();
	
}

createBoard();

// Add this at the bottom of your script to handle the "Back" button
window.addEventListener('pageshow', () => {
    document.querySelectorAll('[data-to-be-removed="true"]').forEach(card => {
        card.style.visibility = 'hidden'; // Hides the card while keeping the layout
        // Or use card.remove(); if you want the other cards to shift and fill the gap
    });
});


