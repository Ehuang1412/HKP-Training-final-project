let removeCartItemButtons = document.getElementsByClassName("btn-danger");

console.log(removeCartItemButtons)

for(let i=0; i<removeCartItemButtons.length; i++){
  let button = removeCartItemButtons[i]
  button.addEventListener('click', function(event){
    console.log('removed')
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
  })

}

function updateCartTotal(){
  let cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for(let i=0; i<cartRows.length; i++){
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('$',''));
    let quantity = quantityElement.value;
    console.log(price*quantity);
    total = total + (price*quantity);
  }

}
const url = 'https://install-gentoo.herokuapp.com/users/signup';
fetch(url,{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({
    item: 'item1'
  })
}).then(res => {
  return res.json()
}).then(data =>console.log(data))
.catch(error=>console.log('Error'))

//for loop{
let itemBox = document.createElement("div");
  let itemTitle = document.createElement("span");
  let itemImg = document.createElement("img");
  let itemDetails = document.createElement("div");
    let itemPrice = document.createElement("span");
    let itemAddButton = document.createElement("button");

itemBox.innerText="shop-item";
  itemTitle.innerText = "shop-item-title"
  itemImg.innerText = "shop-item-image"
  itemDetails.innerText = "shop-item-details"
    itemPrice.innerText = "shop-item-price"
    itemAddButton.innerText = "btn btn-primary shop-item-button"

itemBox.setAttribute("class","shop-item");
  itemTitle.setAttribute("class","shop-item-title");
  itemImg.setAttribute("class", "shop-item-image");
  itemDetails.setAttribute("class","shop-item-details");
    itemPrice.setAttribute("class","shop-item-price");
    itemAddButton.setAttribute("class","btn btn-primary shop-item-button");

//const storeItems = document.querySelector(".shop-items");
storeItems.appendChild(itemBox);
itemBox.appendChild(itemTitle);
itemBox.appendChild(itemImg);
itemBox.appendChild(itemDetails);
itemDetails.appendChild(itemPrice);
itemDetails.appendChild(itemAddButton)

//}