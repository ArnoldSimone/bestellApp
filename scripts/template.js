function getCategoryTemplate(indexMenu){
return `
    <div class="ctnMealsCategory">
          <h1 id="category">${menu[indexMenu].category}</h1>
          <div id="ctnSingleMeal${indexMenu}" class="ctnSingleMeal"></div>`;
}

function getDishesTemplate(indexMenu, indexDishes){
    return `
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
function getBasketTemplate(indexMenu, indexDishes){
    return `
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
}

function getRenderSummaryTemplate(){
return `
    <div class="ctnTotal">
      <div id="subtotal">
        <p>Zwischensumme</p>
        <p>${(subCostsTotal).toFixed(2).replace(".",",")} €</p>
      </div>

      <div id="deliveryCosts">
        <p>Lieferkosten</p>
        <p id="deliveryCost">${(delivery === false ? "0,00" : deliveryCosts.toFixed(2).replace(".",","))} €</p>
      </div>

      <div id="totalCosts">
        <p>Gesamtkosten</p>
        <p>${(delivery === false ? subCostsTotal.toFixed(2).replace(".",",") : (subCostsTotal+deliveryCosts).toFixed(2).replace(".",","))} €</p>
      </div>
    </div>
    <div class="ctnButtonPay">
      <button class="pay">Zur Kasse</button>
    </div>`;
  }