function renderDishes() {
  let dishesRef = document.getElementById("dishes");

  dishesRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    dishesRef.innerHTML += `
    <div class="ctnMealsCategory">
          <h1 id="category">${menu[indexMenu].category}</h1>
          <div id="ctnSingleMeal${indexMenu}" class="ctnSingleMeal"></div>`;

    let ctnSingleMealRef = document.getElementById("ctnSingleMeal" + indexMenu);
    ctnSingleMealRef.innerHTML = "";

    for (
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      ctnSingleMealRef.innerHTML += `
    
        <div class="singleMeal">
              <div class="mealDetails">
                <p class="meal">${menu[indexMenu].dishes[indexDishes].name}</p>
                <p class="description">${
                  menu[indexMenu].dishes[indexDishes].description
                }</p>
                <p class="price">${menu[indexMenu].dishes[
                  indexDishes
                ].price.toFixed(2).replace(".",",")} €</p>
              </div>
              <div class="mealImageAdd">
                <img
                  id="imageSingleMenu"
                  src=${menu[indexMenu].dishes[indexDishes].image}
                  alt="imageSalat"
                />
                
                <img
                onclick="addMealToBasket(${indexMenu}, ${indexDishes})"
                id="imageAmount${indexMenu}${indexDishes}"
                class="imageAmount"
                src="./assets/icons/plus-30.png"
                alt="iconPlus"
                />
                <div 
                    onclick="addMealToBasket(${indexMenu}, ${indexDishes})" 
                    id="imageAmountNumber${indexMenu}${indexDishes}"
                    class="numberAmount dnone">
                </div>
              </div>
            </div>
          </div>`;
    }
  }
}

function addMealToBasket(indexMenu, indexDishes) {
  menu[indexMenu].dishes[indexDishes].amount++;
  renderBasket();
}



function renderBasket() {
  let ctnBasketRef = document.getElementById("ctnBasket");
  ctnBasketRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    for (
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      let imageAmountRef = document.getElementById(
        "imageAmount" + indexMenu + indexDishes
      );
      let imageAmountNumberRef = document.getElementById(
        "imageAmountNumber" + indexMenu + indexDishes
      );

      if (menu[indexMenu].dishes[indexDishes].amount >= 1) {
        imageAmountRef.classList.add("dnone");
        imageAmountNumberRef.classList.remove("dnone");
        imageAmountNumberRef.innerHTML =
          menu[indexMenu].dishes[indexDishes].amount;

        ctnBasketRef.innerHTML += `
            <div id="dishesBasket${indexMenu}${indexDishes}" class="dishesBasket">
              <p class="titleDishesBasket">${menu[indexMenu].dishes[indexDishes].name}</p>
              <div class="ctnTotalAmountBasket">
                <div class="totalAmountBasket">
                  <img onclick="decreaseAmount(${indexMenu}, ${indexDishes})"
                    class="plusMinusBasket"
                    src="./assets/icons/minus-30.png"
                    alt="iconMinus"
                  />
                  <p id="singleAmountBasket${indexMenu}${indexDishes}">${menu[indexMenu].dishes[indexDishes].amount}</p>
                  <img onclick="increaseAmount(${indexMenu}, ${indexDishes})"
                    class="plusMinusBasket"
                    src="./assets/icons/plus-30.png"
                    
                  />
                </div>
                <div class="summaryDish">
                  <p id="priceAmount">${(menu[indexMenu].dishes[indexDishes].price*menu[indexMenu].dishes[indexDishes].amount).toFixed(2).replace(".",",")} €</p>
                  <img onclick="deleteDishesOnBasket(${indexMenu}, ${indexDishes})"
                    class="plusMinusBasket"
                    src="./assets/icons/trash-48.png"
                    alt="iconTrash"
                  />
                </div>
              </div>
            </div>
            `;
      } else {
        imageAmountRef.classList.remove("dnone");
        imageAmountNumberRef.classList.add("dnone");
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
// console.table(menu[0].dishes)


