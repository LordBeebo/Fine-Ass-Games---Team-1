//Initialize global variables at zero
let bankQty = 0;
let cashFlow = 0;

//Reach out to HTML for buttons
const counter = document.getElementById("counter");
const mainButton = document.getElementById("main-click");
const childButton = document.getElementById("child");
const factoryButton = document.getElementById("factory");

//"Tiers" class allows for easy construction of new tiers
class Tiers {
    currentNum = 0

    constructor(baseCost, baseDPS){
        this.baseCost = baseCost
        this.baseDPS = baseDPS
    }

    purchase() {
        if (bankQty >= this.baseCost) {
            bankQty -= this.baseCost;
            cashFlow += this.baseDPS;
            counterUpdate();
        }
    }
}

//Create instances of "Tiers"
const child = new Tiers(50, 2);
const factory = new Tiers(200, 10);

//Generic counter updater
function counterUpdate() {
    counter.innerHTML = 
    `<p> Money: \$${bankQty} </p>
    <p> Dollars per second: \$${cashFlow}`  
}

//Main money clicker function
function clicker() {
    bankQty ++;
    counterUpdate();
}

//Action to be taken every turn (one second)
function turn() {
    bankQty += cashFlow;
    counterUpdate()
}

//Assign functions to buttons
mainButton.addEventListener('click', clicker);
childButton.addEventListener('click', child.purchase.bind(child));
factoryButton.addEventListener('click', factory.purchase.bind(factory));

//Start the 1Hz actions
setInterval(turn, 1000);