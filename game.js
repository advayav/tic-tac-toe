let gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = () => {
        return board
    }

    const resetBoard = () => {
        board.forEach((_, i) => board[i] = "")
        return board
    }

    const setCell = (index, value) => {
        board[index] = value
        return board
    }

    const checkDraw = (player) => {
        const winResult = checkWinner(player)
        let count = 0
        board.forEach((e) => {
            if (e !== "") {
                count++
            }
        })

        if ((count === board.length) && (!winResult)) {
            return true
        }
        return false
    }

    const checkWinner = (player) => {
        const wins = [
            [0, 1 ,2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]]

        for (const win of wins) {
            const [a, b, c] = win

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(player.name + " wins!")
                return true
            }
        }

        return false
    }


    return {setCell, getBoard, resetBoard, checkWinner, checkDraw}
}

let createPlayer = (name, value) => {
    return {name, value}
}


function turn(player, index) {
    console.log("Board before your move: \n" + board.getBoard().join(" | "))

    if (board.getBoard()[index] !== "") {
        console.log("That cell is taken :((")
        return
    }

    board.setCell(index, player.value)
    if (board.checkWinner(player)) {
        return true
    }

    if (board.checkDraw(player)) {
        console.log("The game is a draw")
        return true
    }
}

// while (true) {
//     let input = Number(prompt("Enter the index where you would like to play your move"))
//     let result = turn(currPlayer, input)

//     if (result) {
//         console.log("Board: \n" + board.getBoard().join(" | "))
//         break
//     }

//     currPlayer = currPlayer === player1 ? player2 : player1
// }

let board = gameBoard()
let player1, player2, currPlayer


let handleDisplay = () => {
    let game = true
    const addToCell = () => {
        
        let boardGrid = document.querySelector(".board-grid")
        
        const round = document.querySelector(".round")
        const playerTurn = document.createElement("p")
        playerTurn.className = "round-info"
        playerTurn.innerHTML = `${currPlayer.name}'s turn`
        round.appendChild(playerTurn)

        boardGrid.addEventListener("click", (e) => {
            if (!game) {
                return
            }
            const cell = e.target.closest(".board-cell")
            if (!cell) {
                return
            }
            const cellID = cell.getAttribute("data-index")

            if (board.getBoard()[cellID] !== "") {
                return
            }
            const value = currPlayer.value
            cell.innerHTML = value
            board.setCell(cellID, value)
            displayResult()
            currPlayer = currPlayer === player1 ? player2 : player1

            if (game) {
                playerTurn.innerHTML = `${currPlayer.name}'s turn`

                round.appendChild(playerTurn)
            }

            
        })
    }

    const displayResult = () => {
        const round = document.querySelector(".round")
        const result = document.createElement("p")
        round.innerHTML = ""
        result.className = "round-info"
        result.id = "result"

        if (board.checkDraw(currPlayer)) {
            result.innerHTML = "The game is a draw"
            game = false
        }
        if (board.checkWinner(currPlayer)) {
            result.innerHTML = `${currPlayer.name} WINS!!`
            
            game = false
        }

        round.appendChild(result)
    }

    return {addToCell, displayResult}
}


const dialog = document.querySelector("dialog")
const form = document.querySelector(".player-choice-form")
console.log("dialog"+ dialog)

let player1Name = ""
let player2Name = ""

let player1Value = ""
let player2Value = ""

// window.addEventListener("DOMContentLoaded", () => {
//     dialog.showModal()
// })


form.addEventListener("submit", (e) => {
    console.log("Submit button was clicked")
    e.preventDefault()

    player1Name = document.getElementById("p1name").value
    player2Name = document.getElementById("p2name").value

    player1Value = document.querySelector('input[name="p1value"]:checked').value;
    player2Value = document.querySelector('input[name="p2value"]:checked').value;

    if (!player1Name || !player2Name || !player1Value || !player2Value) {
        alert("Please fill out all fields")
        return
    }

    if (player1Value === player2Value) {
        alert("Players must choose different symbols!")
        return
    }

    player1 = createPlayer(player1Name, player1Value)
    player2 = createPlayer(player2Name, player2Value)

    currPlayer = player1

    console.log("Before close")
    dialog.remove()
    console.log("After close")
    let display = handleDisplay()
    display.addToCell()
})
