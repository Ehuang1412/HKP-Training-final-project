if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  ready();
}

window.onload=function(){
  document.getElementById("upload-item").addEventListener("click", uploadItem);
}

<<<<<<< HEAD
let idMap = new Map();

=======
>>>>>>> 8eb6eca8b09e98e9ec8c80395d3ba4f7e9066ddb
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
      idMap.set(data.items[i].itemname,data.items[i]._id);
      // console.log("item:",idMap.get(data.items[i].itemname))
    }
    console.log("length:"+data.items.length)
    })
<<<<<<< HEAD
  .catch(error=>console.log('Error:',error))

=======
  .catch(error=>console.log('Error'))

  
>>>>>>> 8eb6eca8b09e98e9ec8c80395d3ba4f7e9066ddb
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
        <button class="btn btn-primary remove-item-button" type="button">REMOVE</button>


    </div>
  `
  //>> admin usage (either delete or keep item)



  
  let shopItems = document.getElementsByClassName('shop-items')[0];
  shopItemBox.innerHTML = shopItem;
  shopItems.append(shopItemBox);
  shopItemBox.getElementsByClassName('remove-item-button')[0].addEventListener('click',removeItem);
  
  // let removeItemButtons = document.getElementsByClassName("remove-item-button");
  // console.log('removeItemButtons: '+removeItemButtons)
  // for(let i=0; i<removeItemButtons.length; i++){
  //   let button = removeItemButtons[i];
  //   console.log("button"+i+" :"+button);
  //   button.addEventListener('click', removeItem)
  // }
  
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

function removeItem(event){

  const JWT = sessionStorage.getItem('token');
  let buttonClicked = event.target;
  console.log("buttonClicked.parentElement.parentElement.: "+buttonClicked.parentElement.parentElement.parentElement.classList)
  buttonClicked.parentElement.parentElement.parentElement.remove();
  console.log("buttonClicked.parentElement.parentElement.: "+buttonClicked.parentElement.parentElement.parentElement.innerText)
  let itemID = idMap.get(buttonClicked.parentElement.parentElement.parentElement.getElementsByClassName("shop-item-title")[0].innerText);
  console.log("CLICKED: "+itemID)
  console.log("itemiD: "+typeof itemID)
  fetch('https://install-gentoo.herokuapp.com/items/'+itemID,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json',
      "authorization": 'Bearer ' + JWT
    },
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

