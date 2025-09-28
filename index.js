const rollBtn = document.getElementById("rollBtn");
const numLabel1 = document.getElementById("numLabel1");
const numLabel2 = document.getElementById("numLabel2");
const numLabel3 = document.getElementById("numLabel3");
let balance = document.getElementById("balance");
let betInput = document.getElementById("betAmount")
let money = Number(50);
balance.textContent = money;
let outcome = document.getElementById("outcome");
const min = 1;
const max = 7;
let randomNum1;
let randomNum2;
let randomNum3;

let canClick = true;



rollBtn.onclick = function () {
    if(!canClick) return;
    //check if can bet
    const bet = Number(betInput.value);

    if (isNaN(bet) || bet <= 0) {
        outcome.textContent = "Enter a valid bet amount.";
        return;
    }
    if(bet > money){
        outcome.textContent = "You do not have that much money"
        return;
    }
    money -= bet;

    // random numbers
    randomNum1 = Math.floor(Math.random() * max) + min;
    randomNum2 = Math.floor(Math.random() * max) + min;
    randomNum3 = Math.floor(Math.random() * max) + min;
    //display random numbers
    numLabel1.textContent = randomNum1;
    numLabel2.textContent = randomNum2;
    numLabel3.textContent = randomNum3;
    //display borders for numbers
    numLabel1.style.border = "3px solid black";
    numLabel2.style.border = "3px solid black";
    numLabel3.style.border = "3px solid black";

    //set winnings variable

    let winnings = 0;

    //find if numbers same
    if (randomNum1 === 7 && randomNum2 === 7 && randomNum3 === 7) {
    outcome.textContent = "You got jackpot!!!";
    winnings = bet * 25;
    }
    else if (
        (randomNum1 === 7 && randomNum2 === 7 && randomNum3 !== 7) ||
        (randomNum1 === 7 && randomNum3 === 7 && randomNum2 !== 7) ||
        (randomNum2 === 7 && randomNum3 === 7 && randomNum1 !== 7)
    ) {
        outcome.textContent = "You got double sevens!";
        winnings = bet * 8;
    }
    else if (randomNum1 === randomNum2 && randomNum2 === randomNum3) {
        outcome.textContent = "You got a triple-match!";
        winnings = bet * 8;
    }
    else if (randomNum1 === randomNum2 ||
             randomNum1 === randomNum3 ||
             randomNum2 === randomNum3) {
        outcome.textContent = "You got a double-match";
        winnings = bet * 3;
    }
    else {
        outcome.textContent = "You lost :(";
    }
    money += winnings;
    balance.textContent = Math.floor(money);
    //disable clicking
    canClick = false;
    rollBtn.disabled = true;
    rollBtn.style.opacity = "0.5";
    rollBtn.style.cursor = "not-allowed";
    //enable clicking
    setTimeout(() => {
        canClick = true;
        rollBtn.disabled = false
        rollBtn.style.opacity = "1";
        rollBtn.style.cursor = "pointer";
    }, 500);
}
