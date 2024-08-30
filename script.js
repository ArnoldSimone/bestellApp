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
                ].price.toFixed(2)} €</p>
              </div>
              <div class="mealImageAdd">
                <img
                  id="imageSingleMenu"
                  src=${menu[indexMenu].dishes[indexDishes].image}
                  alt="imageSalat"
                />
                <img
                  onclick="addMealToBasket()"
                  id="imageAmount"
                  src="./assets/icons/plus-30.png"
                  alt="iconPlus"
                />
              </div>
            </div>
          </div>`;
    }
  }
}

function addMealToBasket() {}

function decreaseAmount() {}
