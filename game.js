import { Player } from './players.js'

const gameRules = (function () {
    let occupiedPositions = []

    function combos() {
        return [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    }

    function checkWin(player) {
        const allCombos = combos()
        const playerChoice = player.choice
        // for optimal reasons we check for a win only if we've already got 3 picks in
        // so basically the minimum picks for a win 
        // we dont have to check for the first 2 on both of the players
        if (playerChoice.length >= 3) {

            for (let eachCombo of allCombos) {
                if (eachCombo.every(position => playerChoice.includes(position))) {
                    return eachCombo
                }
            }
            return 0
        }
    }

    function announceWinner(currentPlayer, winningCombo) {
        document.getElementById("displayWinner").innerText = `${currentPlayer.name} has won by combo ${winningCombo}`
        setTimeout(resetGame,1000)

    }

    function checkAndAnnounceTie(allPositions) {
        if (allPositions.length >= 9) {
            document.getElementById("displayWinner").innerText = `Its a tie!`
            setTimeout(resetGame,1000)

        }
    }

    function getPlayersAndStartGame() {
        const getForm = document.getElementById("nameForm")

        getForm.addEventListener("submit", (event) => {
            event.preventDefault()

            let playerOne = document.getElementById("firstPlayer").value
            let playerTwo = document.getElementById("secondPlayer").value

            playerOne = new Player(playerOne, "X")
            playerTwo = new Player(playerTwo, "O")

            playActualGame(playerOne, playerTwo)
        })
    }

    function playActualGame(playerOne, playerTwo) {
        // target the board and the form
        const getBoard = document.getElementById("playingBoard")
        const getForm = document.getElementById("nameForm")

        // get frontend
        const getFront = addVisual
        getFront.generateButtons()

        let currentPlayer = playerOne
        
        const newBoard = getBoard.cloneNode(true)
        getBoard.parentNode.replaceChild(newBoard, getBoard)

        newBoard.addEventListener("click", (event) => {
            const clicked = event.target
            clicked.innerText = currentPlayer.mark
            clicked.disabled = true

            // we get the button number and store it to each player
            const getPlayerInput = Number(clicked.dataset.index)
            currentPlayer.choice.push(getPlayerInput)
            occupiedPositions.push(getPlayerInput)

            // cwe theb check the combos
            const winVariable = checkWin(currentPlayer)

            checkAndAnnounceTie(currentPlayer)

            if (winVariable) {
                announceWinner(currentPlayer, winVariable)
            }

            checkAndAnnounceTie(occupiedPositions)

            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
        })

    }

    function resetGame() {
            const getForm = document.getElementById("nameForm")
            getForm.reset()
            
            window.location.reload()
        }

    return {
        getPlayersAndStartGame
    }

})()

// create the buttons dynamically

const addVisual = (function generateButtons() {
    const getBoard = document.getElementById("playingBoard")

    function generateButtons() {
            for (let i = 0; i < 9; i++) {
                const createButton = document.createElement("button")
                createButton.className = "dynamicButton"
                createButton.innerText = ""
                createButton.dataset.index = i

                getBoard.appendChild(createButton)
            }
    }

    // we need to get the form inputs and so well target their id and get their value

    function getInputs() {
        const getForm = document.getElementById("nameForm")

        getForm.addEventListener("submit", (event) => {

            const getFirstName = document.getElementById("firstPlayer").value
            const getLastName = document.getElementById("secondPlayer").value

            return [getFirstName, getLastName]
        })
    }

    return {
        generateButtons,
        getInputs,
    }
})()

// clicking event listner

const play = gameRules
play.getPlayersAndStartGame()