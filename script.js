let emptyBasket = true;
let subCostsDishes = 0;
let subCostsTotal = 0;
let delivery = false;
let deliveryCosts = 5.9;
let ordered = false;

function init() {
  renderDishes();
  renderEmptyBasket();
  scrolly();
}

function renderDishes() {
  let dishesRef = document.getElementById("dishes"); dishesRef.innerHTML = "";
  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    dishesRef.innerHTML += getCategoryTemplate(indexMenu);
    let ctnSingleMealRef = document.getElementById("ctnSingleMeal" + indexMenu);
    ctnSingleMealRef.innerHTML = "";
    for (let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
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
    for (let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
      updateDishInBasket(indexMenu, indexDishes, ctnBasketRef);
    }
  }
  renderEmptyBasket();
  showBasketButtonResponive();
  quantityBasket(subCostsTotal);
  handleBasketButtonResponiveActiveAmountTotalCosts();
}

function updateDishInBasket(indexMenu, indexDishes, ctnBasketRef) {
  let imageAmountRef = document.getElementById("imageAmount" + indexMenu + indexDishes);
  let imageAmountNumberRef = document.getElementById("imageAmountNumber" + indexMenu + indexDishes);
  let ctnSwitchRef = document.getElementById("ctnSwitch");
  if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
    handleDishWithAmount(indexMenu, indexDishes, ctnBasketRef, imageAmountRef, imageAmountNumberRef, ctnSwitchRef);
    renderSummary(subCostsTotal);
  } else {
    handleDishWithoutAmount(imageAmountRef, imageAmountNumberRef);
  }
}

function handleDishWithAmount(indexMenu,indexDishes,ctnBasketRef,imageAmountRef,imageAmountNumberRef,ctnSwitchRef) {
  emptyBasket = false;
  imageAmountRef.classList.add("dnone");
  imageAmountNumberRef.classList.remove("dnone");
  ctnSwitchRef.classList.remove("dnone");
  imageAmountNumberRef.innerHTML = menu[indexMenu].dishes[indexDishes].amount;
  ctnBasketRef.innerHTML += getBasketTemplate(indexMenu, indexDishes);
  let subCostsDishes = menu[indexMenu].dishes[indexDishes].price * menu[indexMenu].dishes[indexDishes].amount;
  subCostsTotal += subCostsDishes;
  renderSummary(subCostsTotal);
}

function handleDishWithoutAmount(imageAmountRef, imageAmountNumberRef) {
  imageAmountRef.classList.remove("dnone");
  imageAmountNumberRef.classList.add("dnone");
}

function quantityBasket(subCostsTotal) {
  let quantitiy = 0;
  let numberAmountBasketRef = document.getElementById("numberAmountBasket");
  let basketButtonTotalCostsRef = document.getElementById("basketButtonTotalCosts");
  numberAmountBasketRef.innerHTML = "";
  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        quantitiy = quantitiy + menu[indexMenu].dishes[indexDishes].amount;
      }
    }
  }
  basketButtonTotalCostsRef.innerHTML = subCostsTotal.toFixed(2) + " €";
  numberAmountBasketRef.innerHTML = quantitiy;
}

function calculateQuantityBasket(quantitiy) {
  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        quantitiy = quantitiy + menu[indexMenu].dishes[indexDishes].amount;
      }
    }
  }
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

function renderSummary() {
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
  let ctnSwitchRef = document.getElementById("ctnSwitch");
  if (emptyBasket === true) {
    showEmptyBasketOrderedMessage(ctnSummaryRef, ctnEmptyBasketRef, ctnSwitchRef);
  }
}

function showEmptyBasketOrderedMessage(ctnSummaryRef, ctnEmptyBasketRef, ctnSwitchRef) {
  ctnSwitchRef.classList.add("dnone");
  ctnSummaryRef.innerHTML = "";
  document.getElementById("delivery").classList.remove("active");
  document.getElementById("pickup").classList.add("active");
  delivery = false;
  if (ordered === false) {
    ctnEmptyBasketRef.innerHTML = getEmptyBasket();
    document.body.style.overflow = "scroll"; 
  } else {
    ctnEmptyBasketRef.innerHTML = getOrderedMessage();
    ordered = false;
  }
}

function addDeliveryCosts() {
  document.getElementById("delivery").classList.add("active");
  document.getElementById("pickup").classList.remove("active");
  delivery = true;
  renderSummary();
}

function removeDeliveryCosts() {
  document.getElementById("delivery").classList.remove("active");
  document.getElementById("pickup").classList.add("active");
  delivery = false;
  renderSummary();
}

function BasketToggle() {
  let ctnBasketWrapperRef = document.getElementById("ctnBasketWrapper");
  let basketButtonTextRef = document.getElementById("basketButtonText");
  let imageBasketNumberRef = document.getElementById("imageBasketNumber");
  let basketButtonTotalCostsRef = document.getElementById("basketButtonTotalCosts");
  ctnBasketWrapperRef.classList.toggle("active");
  handleBasketWrapperActiv(basketButtonTextRef, imageBasketNumberRef, basketButtonTotalCostsRef, ctnBasketWrapperRef);
}

function handleBasketWrapperActiv(basketButtonTextRef, ctnBasketWrapperRef) {
  if (ctnBasketWrapperRef.classList.contains("active")) {
    basketButtonTextRef.innerText = "Warenkorb schließen";
    handleBasketButtonResponiveActiveAmountTotalCosts();
  } else {
    basketButtonTextRef.innerText = "Warenkorb";
    handleBasketButtonResponiveActiveAmountTotalCosts();
  }
}

function showBasketButtonResponive() {
  let ctnBasketWrapperRef = document.getElementById("ctnBasketWrapper");
  let ctnBasketResponsiveRef = document.getElementById("ctnBasketResponsive");
  if (emptyBasket === false) {
    ctnBasketResponsiveRef.classList.remove("dnone");
  } else {
    ctnBasketResponsiveRef.classList.add("dnone");
    ctnBasketWrapperRef.classList.remove("active");
  }
}

function order() {
  let ctnBasketRef = document.getElementById("ctnBasket");
  let ctnBasketWrapperRef = document.getElementById("ctnBasketWrapper");
  ctnBasketRef.innerHTML = "";
  ordered = true;
  resetMenuDishes();
  ctnBasketRef.innerHTML = getOrderedMessage();
  renderBasket();
  ctnBasketWrapperRef.classList.add("active");
}

function resetMenuDishes() {
  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (let indexDishes = 0; indexDishes < menu[indexMenu].dishes.length; indexDishes++) {
      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        menu[indexMenu].dishes[indexDishes].amount = 0;
      }
    }
  }
}

function closeBasketAfterOrder() {
  init();
  let ctnBasketWrapperRef = document.getElementById("ctnBasketWrapper");
  let ctnBasketResponsiveRef = document.getElementById("ctnBasketResponsive");
  ctnBasketWrapperRef.classList.remove("active");
  ctnBasketResponsiveRef.classList.add("dnone");
}

function handleBasketButtonResponiveActiveAmountTotalCosts() {
  let ctnBasketWrapperRef = document.getElementById('ctnBasketWrapper');
  let imageBasketNumberRef = document.getElementById("imageBasketNumber");
  let basketButtonTotalCostsRef = document.getElementById("basketButtonTotalCosts");
  if (ctnBasketWrapperRef.classList.contains("active")) {
    imageBasketNumberRef.classList.add("dnone");
    basketButtonTotalCostsRef.classList.add("dnone");
    document.body.style.overflow = "hidden";
  } else {
    imageBasketNumberRef.classList.remove("dnone");
    basketButtonTotalCostsRef.classList.remove("dnone");  
    document.body.style.overflow = "scroll";
  }
}

