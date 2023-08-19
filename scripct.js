//funktion zum öffnen und schließen von warenkorb

//function openForm() {
  //document.getElementById("myForm").style.display = "block";
  //class="open-button" onclick="openForm()" class="btn cancel" onclick="closeForm()"
//}
//function closeForm() {
  //document.getElementById("myForm").style.display = "none";
//}
//ende


  
//funktion zum ansprechen der auswahl button für alle 
let carts = document.querySelectorAll('.auswahl-btn');
//ende

//zum anzeigen der producte wenn die schleife ausgewählt wird
let products = [
  {
    name: "Chicken Tikka",
    tag:"chicken-tikka",
    price: 9.9,
    inCart: 0
  },
  {
    name: "Chicken Qorma",
    tag:"chicken-qorma",
    price: 10.90,
    inCart: 0
  },
  {
    name: "Chicken Masala",
    tag:"chicken-masala",
    price: 8.90,
    inCart: 0
  },
  {
    name: "Butter Chicken",
    tag:"butter-chicken",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Chicken Saag",
    tag:"chicken-saag",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Beef Kebaab",
    tag:"beef-kebaab",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Beef Spinat",
    tag:"beef-spinat",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Grill Kotelett",
    tag:"grill",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Mutton Masala",
    tag:"mutton-masala",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Mutton Saag",
    tag:"mutton-saag",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Mutton Spinat",
    tag:"mutton-spinat",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Mutton Spinat",
    tag:"mutton-spinat",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Palak Panir",
    tag:"palak-panir",
    price: 9.90,
    inCart: 0
  },
  {
    name: "Mix Sabsi",
    tag:"mix-sabsi",
    price: 10.90,
    inCart: 0
  },
  {
    name: "Saag",
    tag:"saag",
    price: 8.90,
    inCart: 0
  },
  {
    name: "Bindi",
    tag:"bindi",
    price: 11.90,
    inCart: 0
  },
  {
    name: "Hänchen Suppe",
    tag:"hänchen-suppe",
    price: 9.90,
    inCart: 0
  },
  {
    name: "Daal Suppe",
    tag:"daal-suppe",
    price: 10.90,
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

//funktion zu ausrechnen der gesammt preis für local storage
function totalCost(product){
  //console.log("the product proice is", product.price); 
  let cartCost = localStorage.getItem('totalCost');
  //console.log("my cart cost ist", cartCost)
  if(cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost +
    product.price);
  }else {
    localStorage.setItem("totalCost", product.price);
  }
}
  //.toFixed(2) für später benutzen, damit weniger kommastellen angezeigt werden.

//funktion zum anzeige der werte in warenkorb von local storage
function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector
  (".products");
  let cartCost = localStorage.getItem('totalCost');
 
  //console.log(cartItems);

  if( cartItems && productContainer ) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += 
      `
      <div class="product">
          
          <img src="./bilder/${item.tag}.jpg">
          <span> ${item.name} </span>
          
          <div class="price">${item.price}0 € 
          </div>
       
          <div class="quantity">
            <button class="plus-btn"> + </button>
            <button id="totalInCart" type="number" >${item.inCart}</button>
            <button class="minus-btn"> - </button>
          </div>

          <div>
          <button class="btn-remove"> LÖSCHEN </button>
          </div>
          
          <div class="total">
            ${item.inCart * item.price}0 €
          </div>
          
      </div>
      `
    });
    
    productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTittle">
          GesamtSumme:
        </h4>
        <h4 class"basketTotal">
          ${cartCost} €
        </h4>
        </div>
      `;
  }
}


  
//code für die funktion von remove button in warenkorb
function ready(){
  var removeCartItems = document.getElementsByClassName('btn-remove')
  //console.log(removeCartItems)
  for (var i = 0; i < removeCartItems.length; i++) {
    var  button = removeCartItems[i]
    button.addEventListener('click', removeFromCart)
  }
}
function removeFromCart(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  //console.log('clicked') 
}

// gesamtsumme muss noch geändert werden
// funktion von buttom für anzahl der artikal im korb muss noch addieren


//aufrufen der funtion
onloadCartNumbers();
displayCart();
ready();
//ende









