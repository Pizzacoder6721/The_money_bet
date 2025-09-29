const rollBtn = document.getElementById("rollBtn");
const numLabel1 = document.getElementById("numLabel1");
const numLabel2 = document.getElementById("numLabel2");
const numLabel3 = document.getElementById("numLabel3");
const balance = document.getElementById("balance");
const betInput = document.getElementById("betAmount");
const outcome = document.getElementById("outcome");

let money = 50;
balance.textContent = money;

let canClick = true;
let loancount = 0;

const min = 1;
const max = 7;

function startSpin(label, delay, onStop) {
    let count = 0;
    let interval = setInterval(() => {
        const spinNum = Math.floor(Math.random() * (max - min)) + min;
        label.textContent = spinNum;
        label.style.border = "3px solid black";
        count++;
    }, 15);

    // Stop after the delay
    setTimeout(() => {
        clearInterval(interval);
        const finalNum = Math.floor(Math.random() * (max - min + 1)) + min;
        label.textContent = finalNum;
        onStop(finalNum);
    }, delay);
}

rollBtn.onclick = function () {
    if (!canClick) return;

    const bet = Number(betInput.value);

    if (isNaN(bet) || bet <= 0) {
        outcome.textContent = "Enter a valid bet amount.";
        return;
    }
    if (bet > money) {
        outcome.textContent = "You do not have that much money";
        return;
    }

    canClick = false;
    rollBtn.disabled = true;
    rollBtn.style.opacity = "0.5";
    rollBtn.style.cursor = "not-allowed";

    money -= bet;
    balance.textContent = money;
    outcome.textContent = "";

    let spinCount = 0;
    let finalNumbers = [];

    function onFinalNumber(num) {
        finalNumbers.push(num);
        spinCount++;

        if (spinCount === 3) {
            const [n1, n2, n3] = finalNumbers;
            let winnings = 0;

            if (n1 === 7 && n2 === 7 && n3 === 7) {
                outcome.textContent = "You got jackpot!!!";
                winnings = bet * 25;
            }
            else if (
                (n1 === 7 && n2 === 7 && n3 !== 7) ||
                (n1 === 7 && n3 === 7 && n2 !== 7) ||
                (n2 === 7 && n3 === 7 && n1 !== 7)
            ) {
                outcome.textContent = "You got double sevens!";
                winnings = bet * 8;
            }
            else if (n1 === n2 && n2 === n3) {
                outcome.textContent = "You got a triple-match!";
                winnings = bet * 8;
            }
            else if (n1 === n2 || n1 === n3 || n2 === n3) {
                outcome.textContent = "You got a double-match";
                winnings = bet * 3;
            }
            else {
                outcome.textContent = "You lost :(";
            }

            money += winnings;
            balance.textContent = Math.floor(money);

            if (money === 0) {
                outcome.textContent = "You're out of money brokie, here is some of mine.";
                loancount += 1;
                money = 5;
                balance.textContent = money;
            }

            if (loancount === 20) {
                outcome.textContent = "STOP TAKING MY MONEY!!!!! I'VE LENT YOU MONEY 20 TIMES!!!!!";
                money = -999999999999999;
                balance.textContent = money;
            }

            // Re-enable button after all spins
            setTimeout(() => {
                canClick = true;
                rollBtn.disabled = false;
                rollBtn.style.opacity = "1";
                rollBtn.style.cursor = "pointer";
            }, 500);
        }
    }

    // Start spinning one by one
    startSpin(numLabel1, 1000, onFinalNumber);
    startSpin(numLabel2, 1300, onFinalNumber);
    startSpin(numLabel3, 1600, onFinalNumber);
};


