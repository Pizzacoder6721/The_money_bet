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

let can67 = true;

// Spins a label a specific number of times
function startSpin(label, spinCountLimit, delay, onStop) {
    let spins = 0;
    let interval = setInterval(() => {
        const spinNum = Math.floor(Math.random() * (max - min)) + min;
        label.textContent = spinNum;
        label.style.border = "3px solid black";
        spins++;

        if (spins >= spinCountLimit) {
            clearInterval(interval);
            const finalNum = Math.floor(Math.random() * (max - min + 1)) + min;
            label.textContent = finalNum;
            onStop(finalNum);
        }
    }, delay); // How fast the number changes (lower = faster)
}

rollBtn.onclick = function () {
    if (!canClick) return;

    const bet = Number(betInput.value);

    if (isNaN(bet) || bet <= 0) {
        outcome.textContent = "You tryna steal my money?";
        money = 1;
        balance.textContent = money;
        return;
    }

    if (bet > money) {
        outcome.textContent = "You do not have that much money.";
        return;
    }

    if (bet === 67 && can67 == true) {
        money *= 67;
        balance.textContent = Math.floor(money);
        outcome.textContent = "67 67 67 67 67 67";
        can67 = false;
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
                console.log(loancount);
            }

            if (loancount === 20) {
                outcome.textContent = "STOP TAKING MY MONEY!!!!! I'VE LENT YOU MONEY 20 TIMES!!!!!";
                money = -999999999999999;
                balance.textContent = money;
                console.log(loancount);
            }

            setTimeout(() => {
                canClick = true;
                rollBtn.disabled = false;
                rollBtn.style.opacity = "1";
                rollBtn.style.cursor = "pointer";
            }, 500);
        }
    }

    // Start spinning each label with a specific spin count and speed
    startSpin(numLabel1, 10, 67, onFinalNumber);
    startSpin(numLabel2, 15, 67, onFinalNumber);
    startSpin(numLabel3, 20, 67, onFinalNumber);
    console.log(loancount);
};
const coinFlipBtn = document.getElementById("coinFlipBtn");

coinFlipBtn.onclick = function () {
    if (!canClick) return;

    if (money <= 0) {
        outcome.textContent = "You tryin to pull a fast one, you'll pay for that.";
        money = 1;
        balance.textContent = money;
        return;
    }

    canClick = false;
    coinFlipBtn.disabled = true;
    coinFlipBtn.style.opacity = "0.5";
    coinFlipBtn.style.cursor = "not-allowed";

    let allInBet = money;
    let flipOptions = ["Heads", "Tails"];
    let flipIndex = 0;

    const flipInterval = setInterval(() => {
        outcome.textContent = flipOptions[flipIndex % 2];
        flipIndex++;
    }, 100); // Switch every 100ms

    // Stop after some time and decide the result
    setTimeout(() => {
        clearInterval(flipInterval);

        const isWin = Math.random() < 0.5;
        const finalResult = isWin ? "Heads" : "Tails";
        outcome.textContent = `It landed on ${finalResult}!`;

        if (isWin) {
            money += allInBet;
            outcome.textContent += ` You won the coin flip!`;
        } else {
            money = 0;
            outcome.textContent += " You lost Womp Womp.";
        }

        balance.textContent = Math.floor(money);

        if (money === 0) {
            loancount += 1;
            if (loancount >= 20) {
                outcome.textContent = "STOP TAKING MY MONEY!!!!! I'VE LENT YOU MONEY 20 TIMES!!!!!";
                money = -999999999999999;
                console.log(loancount);
            } else {
                outcome.textContent += " Here's some money brokie.";
                money = 5;
                console.log(loancount);
            }
            balance.textContent = money;
        }

        // Re-enable the button
        setTimeout(() => {
            canClick = true;
            coinFlipBtn.disabled = false;
            coinFlipBtn.style.opacity = "1";
            coinFlipBtn.style.cursor = "pointer";
        }, 500);

    }, 2000);
};



