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
  currentNum = 0;

  constructor(name, baseCost, baseDPS) {
    this.name = name;
    this.baseCost = baseCost;
    this.baseDPS = baseDPS;
  }

  costAdjust() {
    return this.baseCost + (2 ** this.currentNum)
  }

  purchase(button) {
    if (bankQty >= this.costAdjust()) {
      bankQty -= this.costAdjust();
      cashFlow += this.baseDPS;
      this.currentNum ++
      console.log(button);
      button.innerHTML = `<p>${this.name}</p> <p>Price: \$${this.costAdjust()} </p><p>Quantity: ${this.currentNum}</p>`
      counterUpdate();
      console.log(this.costAdjust(), this.currentNum);
    }
  }
}

//Create instances of "Tiers"
const child = new Tiers('Small child', 50, 2);
const factory = new Tiers('Factory', 200, 10);

//Generic counter updater
function counterUpdate() {
  counter.innerHTML = `<h3> MONEY: \$${bankQty} </h3>
    <p> Dollars per second: \$${cashFlow}`;
}

//Main money clicker function
function clicker() {
  bankQty++;
  counterUpdate();
}

//Action to be taken every turn (one second)
function turn() {
  bankQty += cashFlow;
  counterUpdate();
}

//Assign functions to buttons
mainButton.addEventListener("click", clicker);
childButton.addEventListener("click", child.purchase.bind(child, childButton));
factoryButton.addEventListener("click", factory.purchase.bind(factory, factoryButton));

//Start the 1Hz actions
setInterval(turn, 1000);
