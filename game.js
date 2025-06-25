const gameRules = (function(){
    occupiedPositions = []

    function legalPosition(playerChoice) {
        if (playerChoice > 9 || playerChoice < 0) {
            alert("You can only choose a position that exists on the board!")
        }
    }

    function checkOccupied(playerChoice) {
        occupiedPositions.forEach(position => {
            if (playerChoice == position) {
                alert("Can't place there!")
            }
        });
    }

    function pickPosition(playerName) {
        return prompt(`${playerName.name} please pick a spot you would like:`)
    }

    function markPosition (board,currentPlayer,chosenPosition) {
        // add the position to the players's array choice
        currentPlayer.choices.push(chosenPosition)

        // mark the board with the choice
        const playerMark = currentPlayer.mark
        board[chosenPosition] = playerMark
    }

    function tie() {
        if (occupiedPositions.length >= 9) {
            alert("TIE")
        }
    }

    return {
        legalPosition,
        checkOccupied,
        pickPosition,
        markPosition,
        tie
    }

})()

const newGame = gameRules

newGame.pickPosition("ben")