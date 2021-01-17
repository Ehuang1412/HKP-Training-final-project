if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  ready();
}

window.onload=function(){
  document.getElementById("upload-item").addEventListener("click", uploadItem);
}

// Event listeners for elements already loaded into document
function ready(){
  fetch('https://install-gentoo.herokuapp.com/items',{
  method: 'GET',
  headers:{
    'Content-Type':'application/json',
    'Authorization':"Bearer " + sessionStorage.getItem('token'),
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
  document.getElementById("uploadform").style.display='block';
}

function displayFormData(){
  let itemname = document.getElementById("itemname").value;
  let price = document.getElementById("itemprice").value;
  // let detail = document.getElementById("itemdetail").value;
  let strPri = price.toString();
  let itemimg = document.getElementById("itemImg").value;
  let result = itemname.concat(strPri);
  document.getElementById('spanResult').textContent = result;
}
/*function displayData() {
  let x = document.getElementById("uploadform");
  let text = "";
  for (let i = 0; i < x.length ;i++) {
    text += x.elements[i].value + "<br>";
  }
  document.getElementById("data").innerHTML = text;
} */

function displayShopItem(title,details,img,price){
  
  let shopItemBox = document.createElement('div');
  shopItemBox.classList.add('shop-item');
  
  let shopItem = `
    <span class="shop-item-title">${title}</span>
    <img class="shop-item-image" src="${img}">
    <div class="shop-item-details">
        <div class="shop-item-description>${details}</div>
        <span class="shop-item-price">${price}</span>
< price
<div></div>
        <button class="btn btn-primary shop-item-button" type="button">REMOVE</button>

>> admin usage (either delete or keep item)
    </div>
  `
  
  let shopItems = document.getElementsByClassName('shop-items')[0];
  shopItemBox.innerHTML = shopItem;
  shopItems.append(shopItemBox);
}

// function uploadItemClicked(){

// }

function uploadItem(e){
   itemname = document.getElementById("itemname").value;
   price = document.getElementById("itemprice").value;
  
  const JWT = sessionStorage.getItem('token');
  fetch('https://install-gentoo.herokuapp.com/items', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    "authorization": 'Bearer ' + JWT
    },
    body: JSON.stringify({
      "itemname": itemname,
      "price": price
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}




// "itemname": itemname,
//       "price": price
// const delte = {};
// fetch('https://install-gentoo.herokuapp.com/items/:id', {
//   method: 'DELETE',
//   body: JSON.stringify(delte)
// })
// .then(response => response.json())
// .then(result => {
//   console.log('Success:', result);
// })
// .catch(error => {
//   console.error('Error:', error);
// });