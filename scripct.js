 
//funktion zum ansprechen der auswahl button für alle 
let carts = document.querySelectorAll('.auswahl-btn');
//ende

//zum anzeigen der producte wenn die schleife ausgewählt wird
let products = [
  {
    name: "Chicken Tikka",
    tag:"chicken-tikka",
    price: 9,
    inCart: 0
  },
  {
    name: "Chicken Qorma",
    tag:"chicken-qorma",
    price: 10,
    inCart: 0
  },
  {
    name: "Chicken Masala",
    tag:"chicken-masala",
    price: 8,
    inCart: 0
  },
  {
    name: "Butter Chicken",
    tag:"butter-chicken",
    price: 11,
    inCart: 0
  },
  {
    name: "Chicken Saag",
    tag:"chicken-saag",
    price: 11,
    inCart: 0
  },
  {
    name: "Beef Kebaab",
    tag:"beef-kebaab",
    price: 11,
    inCart: 0
  },
  {
    name: "Beef Spinat",
    tag:"beef-spinat",
    price: 11,
    inCart: 0
  },
  {
    name: "Grill Kotelett",
    tag:"grill",
    price: 11,
    inCart: 0
  },
  {
    name: "Mutton Masala",
    tag:"mutton-masala",
    price: 11,
    inCart: 0
  },
  {
    name: "Mutton Saag",
    tag:"mutton-saag",
    price: 11,
    inCart: 0
  },
  {
    name: "Mutton Spinat",
    tag:"mutton-spinat",
    price: 11,
    inCart: 0
  },
  {
    name: "Mutton Spinat",
    tag:"mutton-spinat",
    price: 11,
    inCart: 0
  },
  {
    name: "Palak Panir",
    tag:"palak-panir",
    price: 9,
    inCart: 0
  },
  {
    name: "Mix Sabsi",
    tag:"mix-sabsi",
    price: 10,
    inCart: 0
  },
  {
    name: "Saag",
    tag:"saag",
    price: 8,
    inCart: 0
  },
  {
    name: "Bindi",
    tag:"bindi",
    price: 11,
    inCart: 0
  },
  {
    name: "Hänchen Suppe",
    tag:"hänchen-suppe",
    price: 9,
    inCart: 0
  },
  {
    name: "Daal Suppe",
    tag:"daal-suppe",
    price: 10,
    inCart: 0
  },
]
//ende

//for schleife für die producte
for (let i=0; i < carts.length; i++){
  	carts[i].addEventListener('click' , () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
//ende

//funktion, die item nummer aus der localsorage zu bekommen und in der korb zu anzeigen
function onloadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers){
    document.querySelector('.open-button span').textContent = productNumbers;
  }
}
//ende

//funktion die item nummer von 1 zu starten, +1 zu addieren und string in nummer zu verwandeln
function cartNumbers(product){

  let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.open-button span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.open-button span').textContent = 1;
  }

  //aufrufen der funtion
  setItem(product);

}
//ende 

//funktion zum auswählen von mehr als 1 product für local storage 
function setItem(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {

    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
      }
  }
  localStorage.setItem("productsInCart",JSON.stringify
  (cartItems));
}

//funktion zum ausrechnen der gesammt preis für local storage
function totalCost(product){
  //console.log("the product price is", product.price); 
  let cartCost = localStorage.getItem('totalCost');
  //console.log("my cart cost ist", cartCost)
  if(cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }else {
    localStorage.setItem("totalCost", product.price);
  }
}

//chat GPT
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
        <img src="./bilder/${item.tag}.jpg">
        <span> ${item.name} </span>
        
        <div class="price">${item.price} € 
        </div>
     
        <div class="quantity">
          <div id="totalInCart"  style= "border: 1px solid black;"> ${item.inCart} </div>
        </div>

        <div>
          <button class="btn-remove" data-tag="${item.tag}"> LÖSCHEN </button>
        </div>
        <div class="total">
          ${item.inCart * item.price} €
        </div>
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTittle">
          Gesamt&#160;Summe:
        </h4>
        &nbsp; &nbsp; &#160; &nbsp; &#160; &nbsp; &#160; &nbsp;
        <h4 class="basketTotal">
         ${cartCost}&#160;€
        </h4>
      </div>
    `;

    // Jetzt hinzugefügt: Eventlistener für LÖSCHEN-Button
    let removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', removeFromCart);
    });
  }
}

// Funktion zum Aktualisieren der Warenkorb-Anzeige
function updateCartCount() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.open-button span').textContent = productNumbers;
  }
}

// Funktion, um einen Artikel aus dem Warenkorb zu entfernen
function removeFromCart(event) {
  let buttonClicked = event.target;
  let productTag = buttonClicked.getAttribute('data-tag');

  // Aktualisieren Sie den Warenkorb im localStorage
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems && cartItems[productTag]) {
    // Reduzieren Sie die Anzahl des ausgewählten Artikels im Warenkorb
    cartItems[productTag].inCart--;

    // Aktualisieren Sie die Anzahl der Artikel im Warenkorb im localStorage
    let cartNumbers = localStorage.getItem('cartNumbers');
    cartNumbers = parseInt(cartNumbers);
    cartNumbers--;
    localStorage.setItem('cartNumbers', cartNumbers);

    // Aktualisieren Sie den cartCost im localStorage
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseFloat(cartCost);
    cartCost -= cartItems[productTag].price;
    localStorage.setItem('totalCost', cartCost);

    // Wenn die Anzahl null erreicht, entfernen Sie den Artikel aus dem Warenkorb
    if (cartItems[productTag].inCart === 0) {
      delete cartItems[productTag];
    }

    // Aktualisieren Sie den localStorage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Aktualisieren Sie die Anzeige des Warenkorbs
    displayCart();
    updateCartCount();
  }
}

// Selektieren Sie alle Elemente mit der Klasse .auswahl-btn
const auswahlButtons = document.querySelectorAll('.auswahl-btn');

// Schleife durch jedes Button-Element
auswahlButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Speichern Sie den ursprünglichen Text in einem Datenattribut
    const originalText = button.getAttribute('data-original-text');

    // Ändern Sie die Hintergrundfarbe
    button.style.backgroundColor = "#595959";
    
    // Ändern Sie den Text auf "Add To Cart"
    button.innerHTML = "Added To Cart";

    // Nach 1 Sekunde die Hintergrundfarbe und den Text zurücksetzen
    setTimeout(() => {
      button.style.backgroundColor = "";
      button.innerHTML = originalText;
    }, 1000);
  });
});

//aufrufen der funtion
onloadCartNumbers();
displayCart();
//ende