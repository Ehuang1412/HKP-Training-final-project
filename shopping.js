if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  ready();
}

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
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total
}
// const url = 'https://install-gentoo.herokuapp.com/users/signup';
// fetch(url,{
//   method: 'POST',
//   headers:{
//     'Content-Type':'application/json'
//   },
//   body: JSON.stringify({
//     item: 'item1'
//   })
// }).then(res => {
//   return res.json()
// }).then(data =>console.log(data))
// .catch(error=>console.log('Error'))

//for loop{
let itemBox = document.createElement("div");
  let itemTitle = document.createElement("span");
  let itemImg = document.createElement("img");
  let itemDetails = document.createElement("div");
    let itemPrice = document.createElement("span");
    let itemAddButton = document.createElement("button");

// itemBox.innerText="";
  itemTitle.innerText = "shop-item-title"
  itemImg.innerText = "shop-item-image"
  itemDetails.innerText = "shop-item-details"
    itemPrice.innerText = "shop-item-price"
    itemAddButton.innerText = "ADD TO CART"

itemBox.setAttribute("class","shop-item");
  itemTitle.setAttribute("class","shop-item-title");
  itemImg.setAttribute("class", "shop-item-image");
  itemDetails.setAttribute("class","shop-item-details");
    itemPrice.setAttribute("class","shop-item-price");
    itemAddButton.setAttribute("class","btn btn-primary shop-item-button");

const storeItems = document.querySelector(".shop-items");
storeItems.appendChild(itemBox);
itemBox.appendChild(itemTitle);
itemBox.appendChild(itemImg);
itemBox.appendChild(itemDetails);
itemDetails.appendChild(itemPrice);
itemDetails.appendChild(itemAddButton)

//}