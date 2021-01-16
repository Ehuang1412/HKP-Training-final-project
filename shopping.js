if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  var token = sessionStorage.getItem('token');
  console.log("TOKEN: "+token);
  ready();
}



// Event listeners for elements already loaded into document
function ready(){
  
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  console.log(removeCartItemButtons)
  for(let i=0; i<removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i];
    console.log("button"+i+" :"+button);
    button.addEventListener('click', removeCartItem)
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for(let i=0; i<quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName('shop-item-button');
  for(let i=0; i<addToCartButtons.length; i++){
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  document.getElementById('checkOutbtn').addEventListener('click',purchaseClicked);

  

}

// Events
function purchaseClicked(){
  alert('Thank you for your purchase!')
  let cartItems = document.getElementsByClassName('cart-items')[0];
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event){
  console.log('removed')
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event){
  let input = event.target;
  if( isNaN(input.value) || input.value<=0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event){
  console.log('--addToCartClicked--')
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  console.log('shopItem attribute class:'+shopItem.classList)
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  console.log('\ntitle: ',title,'price: ',price,imageSrc);
  addItemToCart(title,price,imageSrc);
  updateCartTotal();
}

// Adding item to cart means creating a row for the item and listening to whenever the row will be removed
function addItemToCart(title,price,imageSrc){
  console.log("addItemToCart arguments:"+ typeof title+" "+typeof price)
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  let cartItems = document.getElementsByClassName('cart-items')[0];

  let cartItemNames = document.getElementsByClassName('cart-item-title');
  for(let i=0; i<cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
      alert(title +' is already added to the cart')
      return
    }
  }

  let cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  // Hook up all event listeners to the new elements added to the document since it was add after ready()
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
  
}


function updateCartTotal(){
  console.log("--updateCartTotal--")
  let cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for(let i=0; i<cartRows.length; i++){
    let cartRow = cartRows[i];
    // console.log("cartRow: "+cartRow);
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    // console.log("priceElement: "+priceElement)
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    console.log("cartRow.getElementsByClassName('cart-quantity-input')[0]: "+cartRow.getElementsByClassName('cart-quantity-input')[0])
    let price = parseFloat(priceElement.innerText.replace('$',''));
    let quantity = quantityElement.value;
    console.log("  price*quantity: "+price*quantity);
    console.log('  price:'+price)
    console.log('  quantity: '+quantity)
    total = total + (price*quantity);
    console.log('total: '+total);
      //Add to backend
    let title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
    saveCartItem(title,quantity);
  }
  total = Math.round(total*100)/100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total;

}

fetch('https://install-gentoo.herokuapp.com/items',{
  method: 'GET',
  headers:{
    'Content-Type':'application/json',
    'authorization':"Bearer " + token,

  }
}).then(res => {
  console.log("first then")
  return res.json()
}).then(data =>{
  console.log("second then")
  console.log(data);
  
  for(let i=0; i<data.items.length; ++i){

    displayShopItem(data.items[i].itemname, data.items[i].description, data.items[i].picture, data.items[i].price);
    

  }
  console.log("length:"+data.items.length)
  })
.catch(error=>console.log('Error'))

//for loop{
// let itemBox = document.createElement("div");
//   let itemTitle = document.createElement("span");
//   let itemImg = document.createElement("img");
//   let itemDetails = document.createElement("div");
//     let itemPrice = document.createElement("span");
//     let itemAddButton = document.createElement("button");

//   itemTitle.innerText = "shop-item-title"
//   itemImg.innerText = "shop-item-image"
//   itemDetails.innerText = "shop-item-details"
//     itemPrice.innerText = "shop-item-price"
//     itemAddButton.innerText = "ADD TO CART"

// itemBox.setAttribute("class","shop-item");
//   itemTitle.setAttribute("class","shop-item-title");
//   itemImg.setAttribute("class", "shop-item-image");
//   itemDetails.setAttribute("class","shop-item-details");
//     itemPrice.setAttribute("class","shop-item-price");
//     itemAddButton.setAttribute("class","btn btn-primary shop-item-button");

// const storeItems = document.querySelector(".shop-items");
// storeItems.appendChild(itemBox);
// itemBox.appendChild(itemTitle);
// itemBox.appendChild(itemImg);
// itemBox.appendChild(itemDetails);
// itemDetails.appendChild(itemPrice);
// itemDetails.appendChild(itemAddButton)

//}


// Displaying shop items means creating a box for an item and listening for whenever it will be added to cart 
function displayShopItem(title,details,img,price){
  let shopItemBox = document.createElement('div');
  shopItemBox.classList.add('shop-item');
  
  let shopItem = `
    <span class="shop-item-title">${title}</span>
    <img class="shop-item-image" src="${img}">
    <div class="shop-item-details">
      <div class="shop-item-description">${details}</div>
      <span class="shop-item-price">${price}</span>
      <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>
  `
   let shopItems = document.getElementsByClassName('shop-items')[0];
  shopItemBox.innerHTML = shopItem;
  shopItems.append(shopItemBox);


  shopItemBox.getElementsByClassName('shop-item-button')[0].addEventListener('click',addToCartClicked);
  console.log('--Done displaying item--')
  

}

function saveCartItem(title,quant){
  // num = parseInt(quant);
  fetch('https://install-gentoo.herokuapp.com/users/cart-items',{
  method: 'POST',
  headers:{
    'Content-Type':'application/json',
    'authorization':"Bearer " + token,
  },
  body: JSON.stringify({
    "itemname": title,
    "quantity": parseInt(quant),
  })
}).then(res => {
    if(res.ok){
      
      console.log('SUCCESS ');
      // role = JSON.parse(res.json());
      // role = JSON.stringify(res.json())
      // console.log('res.json() role:'+res.json());
      // Object.keys(res.json()).forEach((prop)=> console.log('key: '+prop));
  
      return res.json()
    } else{
     console.log(typeof title, typeof parseInt(quant))
      console.log("NOT SUCEES")
    }
  }).then(data => {
  console.log('Success:', data);
  Object.keys(data).forEach((prop)=> console.log('KEY: '+prop+' VALUE:'+data[prop]));
})
.catch((error) => {
  console.log('Error:');
});
}

