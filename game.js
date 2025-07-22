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


let board = gameBoard()
let player1 = createPlayer("Player 1", "X")
let player2 = createPlayer("Player 2", "O")

let currPlayer = player1

// while (true) {
//     let input = Number(prompt("Enter the index where you would like to play your move"))
//     let result = turn(currPlayer, input)

//     if (result) {
//         console.log("Board: \n" + board.getBoard().join(" | "))
//         break
//     }

//     currPlayer = currPlayer === player1 ? player2 : player1
// }

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

let display = handleDisplay()
display.addToCell()