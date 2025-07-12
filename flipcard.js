document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    const starsDisplay = document.querySelectorAll('.star');
    const restartBtn = document.getElementById('restart');
    const modal = document.getElementById('modal');
    const finalTime = document.getElementById('final-time');
    const finalMoves = document.getElementById('final-moves');
    const finalRating = document.getElementById('final-rating');
    const playAgainBtn = document.getElementById('play-again');
    
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matchedPairs = 0;
    let timer;
    let seconds = 0;
    let starCount = 3;

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
    
    function initGame() {
        moves = 0;
        matchedPairs = 0;
        seconds = 0;
        starCount = 3;
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;

        movesDisplay.textContent = moves;
        timeDisplay.textContent = seconds;
        starsDisplay.forEach(star => {
            star.style.color = 'gold';
        });
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(() => {
            seconds++;
            timeDisplay.textContent = seconds;
        }, 1000);
        createCards();
    }
    function createCards() {
        gameBoard.innerHTML = '';
        cards = [];
        const gameEmojis = emojis.slice(0, 8); 
        const gameCards = [...gameEmojis, ...gameEmojis];
        
        shuffleArray(gameCards);
        
        gameCards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-face', 'card-front');
            cardFront.textContent = emoji;
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-face', 'card-back');
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', flipCard);
            
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;
        
        updateStarRating();
        
        checkForMatch();
    }
    
    function checkForMatch() {
        const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
        
        if (isMatch) {
            disableMatchedCards();
            matchedPairs++;
            
            if (matchedPairs === 8) {
                clearInterval(timer);
                setTimeout(showWinModal, 1000);
            }
        } else {
            unflipCards();
        }
    }
    function disableMatchedCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        resetBoard();
    }
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            resetBoard();
        }, 1000);
    }
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    function updateStarRating() {
        if (moves >= 20 && starCount === 3) {
            starsDisplay[2].style.color = '#ccc';
            starCount = 2;
        } else if (moves >= 30 && starCount === 2) {
            starsDisplay[1].style.color = '#ccc';
            starCount = 1;
        }
    }
    function showWinModal() {
        finalTime.textContent = seconds;
        finalMoves.textContent = moves;
        
        let ratingText = '';
        if (starCount === 3) {
            ratingText = '⭐⭐⭐';
        } else if (starCount === 2) {
            ratingText = '⭐⭐';
        } else {
            ratingText = '⭐';
        }
        
        finalRating.textContent = ratingText;
        modal.style.display = 'flex';
    }
    restartBtn.addEventListener('click', initGame);
    playAgainBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        initGame();
    });
    initGame();
});