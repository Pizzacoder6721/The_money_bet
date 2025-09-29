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

    outcome.textContent = ""; // Clear old result

    let spinCount = 0;
    let spinIntervals = [];

    // Create a spinning effect for each slot
    function startSpin(label, delay, onStop) {
        let count = 0;
        let interval = setInterval(() => {
            const spinNum = Math.floor(Math.random() * (max - min)) + min;
            label.textContent = spinNum;
            label.style.border = "3px solid black";
            count++;
        }, 50);

        spinIntervals.push(interval);

        // Stop the spin after some time
        setTimeout(() => {
            clearInterval(interval);
            const finalNum = Math.floor(Math.random() * (max - min + 1)) + min;
            label.textContent = finalNum;
            onStop(finalNum);
        }, delay);
    }

    let finalNumbers = [];

    function onFinalNumber(num) {
        finalNumbers.push(num);
        spinCount++;
        if (spinCount === 3) {
            // All slots finished spinning
            const [n1, n2, n3] = finalNumbers;
            randomNum1 = n1;
            randomNum2 = n2;
            randomNum3 = n3;

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

            // Re-enable button
            setTimeout(() => {
                canClick = true;
                rollBtn.disabled = false;
                rollBtn.style.opacity = "1";
                rollBtn.style.cursor = "pointer";
            }, 500);
        }
    }

    // Start the slot spins with staggered delays
    startSpin(numLabel1, 1000, onFinalNumber); // stops after 1s
    startSpin(numLabel2, 1300, onFinalNumber); // stops after 1.3s
    startSpin(numLabel3, 1600, onFinalNumber); // stops after 1.6s
};
