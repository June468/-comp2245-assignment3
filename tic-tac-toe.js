document.addEventListener('DOMContentLoaded', function () {
    
    // Select all div elements within the board element (each represents a square in the Tic-Tac-Toe grid)
    const squares = document.querySelectorAll('#board div');
    
    // Define constants for players and initialize variables for the game state
    const playeX = 'X';  
    const playerO = 'O'; 
    let xTurn = true;    // Boolean to track whose turn it is (true for X, false for O)
    let gameOver = false; // Flag to track if the game is over for the current round
    
    // Select elements for updating game status and resetting the game
    const status = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');

    // Define possible winning combinations for Tic-Tac-Toe
    const wins = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Variables to track scores and rounds
    let scoreX = 0;       
    let scoreO = 0;       
    let roundsPlayed = 0; 

    /**
     * checkForWin - Checks if the current player has a winning combination.
    */
    function checkForWin(symbol) {
        // Check each winning combination for a match with the player's symbol
        return wins.some(combo => {
            return combo.every(index => squares[index].classList.contains(symbol));
        });
    }

    /**
     * resetBoard - Clears the board for the next round while keeping scores.
     */
    function resetBoard() {
        // Clear the symbols and classes from each square for a new round
        squares.forEach(square => {
            square.classList.remove(playeX);
            square.classList.remove(playerO);
            square.textContent = '';
        });
        gameOver = false;  // Reset the game over flag for the new round
        xTurn = true;      // Reset turn to player X
        status.classList.remove('you-won');  // Remove winning message style
    }

    /**
     * displayFinalResult - Displays the final result after 5 rounds.
    */
    function displayFinalResult() {
        let finalMessage = '';
        if (scoreX > scoreO) {
            finalMessage = `Game Over! Player X wins the series with a score of ${scoreX} to ${scoreO}`;
        } else if (scoreO > scoreX) {
            finalMessage = `Game Over! Player O wins the series with a score of ${scoreO} to ${scoreX}`;
        } else {
            finalMessage = `It's a Tie! Both players scored ${scoreX}`;
        }
        status.textContent = finalMessage; // Display the final result
        gameOver = true;  // End the game series
    }

    /**
     * Event Listener - Resets the game series and scores when "New Game" button is clicked.
     * Resets scores and rounds if the full series has been completed, allowing a fresh start.
     */
    newGameButton.addEventListener('click', function () {
        // Reset scores, rounds, and board for a new game series
        scoreX = 0;
        scoreO = 0;
        roundsPlayed = 0;
        resetBoard();  // Reset the board and statuses
        status.textContent = 'Move your mouse over a square and click to play an X or an O.';  // Set initial message
    });

    // Add event listeners for each square 
    squares.forEach(square => {
        square.classList.add('square'); // Add styling class to each square

        /**
         * Event Listener - Handles each player's move when a square is clicked.
         * Updates scores, checks for a win, and increments round count as needed.
         */
        square.addEventListener('click', function () {
            // Prevent clicks if the game is over or the square is already occupied
            if (gameOver || square.classList.contains(playeX) || square.classList.contains(playerO)) {
                return;
            }

            // Place the current player's symbol in the clicked square
            if (xTurn) {
                square.classList.add(playeX);
                square.textContent = 'X';
                // Check if player X has won the round and update status
                if (checkForWin(playeX)) {
                    scoreX++; // Increase player X's score
                    roundsPlayed++; // Increment round count
                    status.textContent = `Congratulations! X wins this round. Score - X: ${scoreX}, O: ${scoreO}`;
                    gameOver = true;

                    // If 5 rounds have been played, display the final result
                    if (roundsPlayed === 5) {
                        displayFinalResult();
                    } else {
                        setTimeout(resetBoard, 2000); // Reset board for the next round after a short delay
                    }
                }
            } else {
                square.classList.add(playerO);
                square.textContent = 'O';
                // Check if player O has won the round and update status
                if (checkForWin(playerO)) {
                    scoreO++; // Increase player O's score
                    roundsPlayed++; // Increment round count
                    status.textContent = `Congratulations! O wins this round. Score - X: ${scoreX}, O: ${scoreO}`;
                    gameOver = true;

                    // If 5 rounds have been played, display the final result
                    if (roundsPlayed === 5) {
                        displayFinalResult();
                    } else {
                        setTimeout(resetBoard, 2000); // Reset board for the next round after a short delay
                    }
                }
            }

            // Check for a draw if all squares are filled without a win
            if (!gameOver && Array.from(squares).every(s => s.textContent)) {
                roundsPlayed++;
                status.textContent = `It's a draw! Score - X: ${scoreX}, O: ${scoreO}`;
                gameOver = true;

                // If 5 rounds have been played, display the final result
                if (roundsPlayed === 5) {
                    displayFinalResult();
                } else {
                    setTimeout(resetBoard, 2000); // Reset board for the next round after a short delay
                }
            }

            // Toggle the turn to the next player after each move
            xTurn = !xTurn;
        });

        /**
         * Event Listener - Adds hover effect when mouse is over an empty square.
         * Only applies hover if the game is not over and the square is empty.
         */
        square.addEventListener('mouseover', function () {
            if (!gameOver && !square.classList.contains(playeX) && !square.classList.contains(playerO)) {
                square.classList.add('hover');
            }
        });

        /**
         * Event Listener - Removes hover effect when mouse leaves a square.
         */
        square.addEventListener('mouseout', function () {
            square.classList.remove('hover');
        });
    });
});
