// game vaiables
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let leaderboard = [];

// player's guess
function makeGuess() {
    const playerName = document.getElementById("player-name").value; // takes input from box
    const guess = parseInt(document.getElementById("guess").value);
    const messageElement = document.getElementById("message");

    if (!playerName || isNaN(guess) || guess < 1 || guess > 100) { // checks if user inputs a name and number in range
        messageElement.textContent = "Please enter a valid name and guess between 1 and 100!";
        return;
    }

    attempts++; // counts attempts

    if (guess === randomNumber) {
        messageElement.textContent = "Congratulations " + playerName  + " You guessed the number " + randomNumber + " in " + attempts + " attempts.";
        updateLeaderboard(playerName, attempts);
        setTimeout(() => {
            messageElement.textContent = "Enter another guess to start a new game!";
        }, 2000);
        resetGame();
    } else if (guess < randomNumber) {
        messageElement.textContent = "Too low! Try again.";
        setTimeout(() => { //empties the section after 2 seconds
            messageElement.textContent = " ";
        }, 2000);
    } else {
        messageElement.textContent = "Too high! Try again.";
        setTimeout(() => {
            messageElement.textContent = " ";
        }, 2000);
    }
}

// updates the leaderboard
function updateLeaderboard(name, attempts) {
    leaderboard.push({ name, attempts });

    // sorts leaderboard by attempts
    leaderboard.sort((a, b) => a.attempts - b.attempts);

    // displays leaderboard
    displayLeaderboard();
}

// displays leaderboard
function displayLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // previous leaderboard entries

    leaderboard.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.attempts}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
    document.getElementById('player-name').value = '';
}
