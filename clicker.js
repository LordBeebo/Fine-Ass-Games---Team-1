let bankQty = 0;
let cashFlow = 0;

function clicker() {
    bankQty ++;
    console.log(bankQty);
    counter.innerHTML = 
    `<p> Money: \$${bankQty} </p>
    <p> Dollars per second: \$${cashFlow}`;
}

function turn() {
    bankQty += cashFlow;
    console.log(cashFlow, bankQty);
    counter.innerHTML = 
    `<p> Money: \$${bankQty} </p>
    <p> Dollars per second: \$${cashFlow}`
}

setInterval(turn, 1000);

const mainButton = document.getElementById("main-click");
mainButton.addEventListener('click', clicker);

const counter = document.getElementById("counter");
counter.innerHTML = 
    `<p> Money: \$${bankQty} </p>
    <p> Dollars per second: \$${cashFlow}`;

const childButton = document.getElementById("child");
childButton.addEventListener('click', () => {
    if (bankQty >= 100){
        cashFlow += 5;
        bankQty -= 100;
    }
});