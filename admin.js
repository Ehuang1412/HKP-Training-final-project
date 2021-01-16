if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  
  ready();
}
// Event listeners for elements already loaded into document
function ready(){
  fetch('https://install-gentoo.herokuapp.com/items',{
  method: 'GET',
  headers:{
    'Content-Type':'application/json',
    'authorization':"Bearer " + sessionStorage.getItem('token'),

  }
  }).then(res => {
    console.log("first then")
    return res.json()
  }).then(data =>{
    console.log("second then")
    console.log(data);
    
  console.log("TOKEN: "+sessionStorage.getItem('token'));
    for(let i=0; i<data.items.length; ++i){

      displayShopItem(data.items[i].itemname, data.items[i].description, data.items[i].picture, data.items[i].price);
      

    }
    console.log("length:"+data.items.length)
    })
  .catch(error=>console.log('Error'))
}


function revealform(){
  document.getElementById("hiddenform").style.display='block';
}

function displayShopItem(title,details,img,price){
  let shopItemBox = document.createElement('div');
  shopItemBox.classList.add('shop-item');
  
  let shopItem = `
    <span class="shop-item-title">${title}</span>
    <img class="shop-item-image" src="${img}">
    <div class="shop-item-details">
        <div class="shop-item-description>${details}</div>
        <span class="shop-item-price">${price}</span>
<<<<<<< HEAD
        <button class="btn btn-primary shop-item-button" type="button">REMOVE</button>
=======
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
>>>>>>> d37cd4b80efae18815a9e635b68908fcf08dd183
    </div>
  `
  let shopItems = document.getElementsByClassName('shop-items')[0];
  shopItemBox.innerHTML = shopItem;
  shopItems.append(shopItemBox);
}

