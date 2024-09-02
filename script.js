let emptyBasket = true;
let subCostsDishes = 0;
let subCostsTotal = 0;
let delivery = false;
let deliveryCosts = 5.9;

function init() {
  renderDishes();
  renderEmptyBasket();
  const sections = document.querySelectorAll(".ctnMealsCategory"); 
  const navLinks = document.querySelectorAll(".linkNavbar"); 

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;

      // Überprüfen, ob der Abschnitt im Sichtbereich ist
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.querySelector("h1").id;
      }
    });

    // Entferne die 'active'-Klasse von allen Links
    navLinks.forEach((link) => {
      link.classList.remove("activeNav");
    });

    // Füge die 'active'-Klasse nur dem passenden Link hinzu
    if (current) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("activeNav");
        }
      });
    }
  });
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
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      let imageAmountRef = document.getElementById("imageAmount" + indexMenu + indexDishes);
      let imageAmountNumberRef = document.getElementById("imageAmountNumber" + indexMenu + indexDishes);
      let ctnSwitchRef = document.getElementById("ctnSwitch");
      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        emptyBasket = false;
        
        imageAmountRef.classList.add("dnone");
        imageAmountNumberRef.classList.remove("dnone");
        ctnSwitchRef.classList.remove("dnone");
        imageAmountNumberRef.innerHTML =menu[indexMenu].dishes[indexDishes].amount;
        ctnBasketRef.innerHTML += getBasketTemplate(indexMenu, indexDishes);
        subCostsDishes = menu[indexMenu].dishes[indexDishes].price * menu[indexMenu].dishes[indexDishes].amount;
        subCostsTotal = subCostsTotal + subCostsDishes;
        renderSummary(subCostsTotal);
      } else {
        imageAmountRef.classList.remove("dnone");
        imageAmountNumberRef.classList.add("dnone");
      }
    }
  }
  renderEmptyBasket();
  showBasketButtonResponive();
  quantityBasket(subCostsTotal);
}

function quantityBasket(subCostsTotal) {
  let quantitiy = 0;
  let numberAmountBasketRef = document.getElementById("numberAmountBasket");
  let basketButtonTotalCostsRef = document.getElementById("basketButtonTotalCosts");
  numberAmountBasketRef.innerHTML = "";
  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        quantitiy = quantitiy + menu[indexMenu].dishes[indexDishes].amount;
      }
    }
  }
  basketButtonTotalCostsRef.innerHTML = ((subCostsTotal).toFixed(2) + " €");
  numberAmountBasketRef.innerHTML = quantitiy;
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
  let ctnSwitchRef = document.getElementById("ctnSwitch");
  if (emptyBasket === true) {
    ctnSwitchRef.classList.add("dnone");
    ctnSummaryRef.innerHTML = "";
    document.getElementById("delivery").classList.remove("active");
    document.getElementById("pickup").classList.add("active");
    delivery = false;
    ctnEmptyBasketRef.innerHTML = getEmptyBasket();
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
  ctnBasketWrapperRef.classList.toggle("active");
  if (ctnBasketWrapperRef.classList.contains("active")) {
    basketButtonTextRef.innerText = "Warenkorb schließen";
  } else {
    basketButtonTextRef.innerText = "Warenkorb";
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
