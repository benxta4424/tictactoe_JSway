import { Player } from './players.js'

const gameRules = (function(){
    let occupiedPositions = []

    function legalPosition(playerChoice) {
        if (playerChoice > 9 || playerChoice < 0) {
            alert("You can only choose a position that exists on the board!")
            return 0
        }
        else {return 1}
    }

    function checkOccupied(playerChoice) {
        for(let position of occupiedPositions) {
            if(position == playerChoice){
                return 0
            }
        }
        return 1
    }

    function pickPosition(playerName) {
        return Number(prompt(`${playerName.name} please pick a spot you would like:`))
    }

    function markPosition (board,currentPlayer,chosenPosition) {
        // add the position to the players's array choice
        currentPlayer.choice.push(Number(chosenPosition))
        occupiedPositions.push(Number(chosenPosition))

        // mark the board with the choice
        const playerMark = currentPlayer.mark
        board[chosenPosition] = playerMark
    }

    function createPlayers() {
        const name = prompt("your name please:")
        const mark = prompt("your mark:")

        return new Player(name, mark)
    }

    function combos() {
        return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    }

    function checkWin(player) {
        const allCombos = combos()
        const playerChoice = player.choice
        // for optimal reasons we check for a win only if we've already got 3 picks in
        // so basically the minimum picks for a win 
        // we dont have to check for the first 2 on both of the players
        if(playerChoice.length >= 3) {
            
            for(let eachCombo of allCombos) {
                if(eachCombo.every(position => playerChoice.includes(position) )) {
                    return eachCombo
                }
            }
            return 0
        }
    }

    function announceWinner(currentPlayer, winningCombo) {
        alert(`${currentPlayer.name} has won by combo ${winningCombo}`)
        return 1

    }

    function playGame() {
        // define players
        let player1 = createPlayers()
        let player2 = createPlayers()

        let currentPlayer = player1

        for (let i = 0; i < 9; i++) {
            const choice = Number(pickPosition(currentPlayer))

            const isLegal = legalPosition(choice)
            const isOccupied = checkOccupied(choice)
            
            // go ahead if the position is legal and empty
            if(isLegal == 1 && isOccupied == 1) {
                markPosition(occupiedPositions, currentPlayer, choice)
            }

            if(isLegal == 0 || isOccupied == 0) {            
                // pick again if the position is not legal nor empty
                console.log("please pick again")
            }

            // check for tie
            if(occupiedPositions.length >= 9) {
                console.log("tie")
            }
            // checking for winner
            const winVariable = checkWin(currentPlayer)
            if (winVariable) {
                announceWinner(currentPlayer,winVariable)
            }
            
            
            
            // since js doesnt change the object in the function it just makes a local copy i have to change the object here locally

            currentPlayer = currentPlayer === player1 ? player2:player1

        }

        console.log(player1.choice)
        console.log(player2.choice)
        console.log(occupiedPositions)
    }

    return {
        legalPosition,
        checkOccupied,
        pickPosition,
        markPosition,
        createPlayers,
        playGame
    }

})()

const newGame = gameRules
