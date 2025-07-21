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


// let board = gameBoard()
// let player1 = createPlayer("Player 1", "X")
// let player2 = createPlayer("Player 2", "O")

// let currPlayer = player1

// while (true) {
//     let input = Number(prompt("Enter the index where you would like to play your move"))
//     let result = turn(currPlayer, input)

//     if (result) {
//         console.log("Board: \n" + board.getBoard().join(" | "))
//         break
//     }

//     currPlayer = currPlayer === player1 ? player2 : player1
// }