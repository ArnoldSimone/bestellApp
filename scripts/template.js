function getCategoryTemplate(indexMenu) {
  return `
    <div class="ctnMealsCategory">
          <h1 id="category${indexMenu}" class="category${indexMenu} category">${menu[indexMenu].category}</h1>
          <div id="ctnSingleMeal${indexMenu}" class="ctnSingleMeal"></div>`;
}

function getDishesTemplate(indexMenu, indexDishes) {
  return `
        <div class="singleMeal">
              <div class="mealDetails">
                <p class="meal">${menu[indexMenu].dishes[indexDishes].name}</p>
                <p class="description">${
                  menu[indexMenu].dishes[indexDishes].description
                }</p>
                <p class="price">${menu[indexMenu].dishes[indexDishes].price
                  .toFixed(2)
                  .replace(".", ",")} €</p>
              </div>
              <div class="mealImageAdd">
                <img
                  id="imageSingleMenu"
                  src=${menu[indexMenu].dishes[indexDishes].image}
                  alt="imageDishes"
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
function getBasketTemplate(indexMenu, indexDishes) {
  return `
            <div id="dishesBasket${indexMenu}${indexDishes}" class="dishesBasket">
              <p class="titleDishesBasket">${
                menu[indexMenu].dishes[indexDishes].name
              }</p>
              <div class="ctnTotalAmountBasket">
                <div class="totalAmountBasket">
                  <img onclick="decreaseAmount(${indexMenu}, ${indexDishes})"
                    class="plusMinusBasket"
                    src="./assets/icons/minus-30.png"
                    alt="iconMinus"
                  />
                  <p id="singleAmountBasket${indexMenu}${indexDishes}">${
    menu[indexMenu].dishes[indexDishes].amount
  }</p>
                  <img onclick="increaseAmount(${indexMenu}, ${indexDishes})"
                    class="plusMinusBasket"
                    src="./assets/icons/plus-30.png"
                    
                  />
                </div>
                <div class="summaryDish">
                  <p id="priceAmount">${(
                    menu[indexMenu].dishes[indexDishes].price *
                    menu[indexMenu].dishes[indexDishes].amount
                  )
                    .toFixed(2)
                    .replace(".", ",")} €</p>
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

function getRenderSummaryTemplate() {
  return `
    <div class="ctnTotal">
      <div id="subtotal">
        <p>Zwischensumme</p>
        <p>${subCostsTotal.toFixed(2).replace(".", ",")} €</p>
      </div>

      <div id="deliveryCosts">
        <p>Lieferkosten</p>
        <p id="deliveryCost">${
          delivery === false
            ? "0,00"
            : deliveryCosts.toFixed(2).replace(".", ",")
        } €</p>
      </div>

      <div id="totalCosts">
        <p>Gesamtkosten</p>
        <p>${
          delivery === false
            ? subCostsTotal.toFixed(2).replace(".", ",")
            : (subCostsTotal + deliveryCosts).toFixed(2).replace(".", ",")
        } €</p>
      </div>
    </div>
    <div class="ctnButtonPay">
      <button onclick="order()" class="pay">Bestellen</button>
    </div>`;
}

function getEmptyBasket() {
  return `           
    <img src="./assets/icons/basket.png" alt="iconBasket" />
    <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menu.</p>`;
}

function getOrderedMessage() {
  return `           
    <img src="./assets/icons/basket.png" alt="iconBasket" />
    <p>Vielen Dank für Ihre Bestellung.</p>
    <p>Ihre Testbestellung ist bei uns eingegangen.</p>
    <div class="ctnButtonPay">
      <a href="#imageMenu">
        <button onclick="closeBasketAfterOrder()" class="ordered">Zurück zur Startseite</button>
      </>
    </div>`;
}
