let emptyBasket = true;
let subCostsDishes = 0;
let subCostsTotal = 0;
let delivery = 0;

function init() {
  emptyBasket = true;
  renderDishes();
  renderEmptyBasket() 
}

function renderDishes() {
  let dishesRef = document.getElementById("dishes");
  dishesRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    dishesRef.innerHTML += getCategoryTemplate(indexMenu);

    let ctnSingleMealRef = document.getElementById("ctnSingleMeal" + indexMenu);
    ctnSingleMealRef.innerHTML = "";

    for (
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      ctnSingleMealRef.innerHTML += getDishesTemplate(indexMenu, indexDishes);
    }
  }
}

function addMealToBasket(indexMenu, indexDishes) {
  menu[indexMenu].dishes[indexDishes].amount++;
  renderBasket();
  renderSummary(subCostsTotal);
  renderEmptyBasket();
}

function renderBasket() {
  emptyBasket = true;
  subCostsTotal = 0;

  let ctnBasketRef = document.getElementById("ctnBasket");
  ctnBasketRef.innerHTML = "";


  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (
      let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
      let imageAmountRef = document.getElementById("imageAmount" + indexMenu + indexDishes);
      let imageAmountNumberRef = document.getElementById("imageAmountNumber" + indexMenu + indexDishes);
      let ctnSwitchRef = document.getElementById('ctnSwitch');

      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        emptyBasket = false;
        imageAmountRef.classList.add("dnone");
        imageAmountNumberRef.classList.remove("dnone");
        ctnSwitchRef.classList.remove("dnone");

        imageAmountNumberRef.innerHTML = menu[indexMenu].dishes[indexDishes].amount;

        ctnBasketRef.innerHTML += getBasketTemplate(indexMenu, indexDishes);

        subCostsDishes = menu[indexMenu].dishes[indexDishes].price*menu[indexMenu].dishes[indexDishes].amount;
        subCostsTotal = (subCostsTotal + subCostsDishes); 
        renderSummary(subCostsTotal);
        
      } else {
        imageAmountRef.classList.remove("dnone");
        imageAmountNumberRef.classList.add("dnone");

      }
    }
  }
  renderEmptyBasket();
}

function decreaseAmount(indexMenu, indexDishes) {
  menu[indexMenu].dishes[indexDishes].amount--;
  renderBasket();
}

function increaseAmount(indexMenu, indexDishes) {
  menu[indexMenu].dishes[indexDishes].amount++;
  renderBasket();
}

function deleteDishesOnBasket(indexMenu, indexDishes) {
  menu[indexMenu].dishes[indexDishes].amount = 0;
  renderBasket();
}

function renderSummary(subCostsTotal) {
  let ctnSummaryRef = document.getElementById("ctnSummary");
  let ctnEmptyBasketRef = document.getElementById("ctnEmptyBasket");

  if (emptyBasket === false) {
    ctnEmptyBasketRef.innerHTML = "";
    ctnSummaryRef.innerHTML = getRenderSummaryTemplate();
  }
}

function renderEmptyBasket() {
  let ctnSummaryRef = document.getElementById("ctnSummary");
  let ctnEmptyBasketRef = document.getElementById("ctnEmptyBasket");
  let ctnSwitchRef = document.getElementById('ctnSwitch');
  if (emptyBasket === true) {
    ctnSwitchRef.classList.add("dnone");
    ctnSummaryRef.innerHTML = "";
    ctnEmptyBasketRef.innerHTML = 
    `           
    <img src="./assets/icons/basket.png" alt="iconBasket" />
    <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menu.</p>`;
  }
}

function activate(activeId, inactiveId) {
  document.getElementById(activeId).classList.add('active');
  document.getElementById(inactiveId).classList.remove('active');
  addDeliveryCosts();
} 
 
function addDeliveryCosts(){
  if (document.getElementById('delivery').classList.contains('active')) {
    delivery = 5.90;
    document.getElementById('deliveryCost').innerHTML = "5,90 €";
  } else  {
    document.getElementById('deliveryCost').innerHTML = "0,00 €";
  }
}


// document.getElementById('delivery').classList.add('active');
// document.getElementById('pickup').classList.remove('active');