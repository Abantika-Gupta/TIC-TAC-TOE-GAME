let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let rewindButton = document.querySelector("#rewind");   // NEW
let newGame = document.querySelector(".new-game");
let msgContain = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;    //playerX, playerO
let count = 0;
let moves = [];      // NEW: remembers which box was clicked, in order

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    moves = [];                      // NEW: clear history
    enableBoxes();
    msgContain.classList.add("hide");
};

// NEW: undo the last move
const rewindMove = () => {
    if (moves.length === 0) return;  // nothing to undo

    let lastIndex = moves.pop();
    boxes[lastIndex].innerText = "";
    count--;
    turnO = !turnO;                  // give the turn back
    msgContain.classList.add("hide");

    // re-enable empty boxes (needed if the game had ended)
    boxes.forEach((box) => {
        box.disabled = box.innerText !== "";
    });
};

boxes.forEach((box, index) => {      // CHANGED: added index
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        moves.push(index);           // NEW: save this move
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = 'Game was draw';
    msgContain.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgContain.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner is", pos1);
                showWinner(pos1);
                return true;
            }
        }
    }
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
rewindButton.addEventListener("click", rewindMove);   // now both names exist