function use(){
  const user = "username";
  const pas = "password";
}

const url = 'https://install-gentoo.herokuapp.com/users/signup';

//minor error:
console.log('document.getElementById("submitNewUser"): '+document.getElementById("submitNewUser"))


function submitUserAcc(e){
  e.preventDefault();
  const newUser = document.getElementById("newUserInput").value;
  const newPW = document.getElementById("newUserPW").value
  const newEmail = document.getElementById("newUserEmail").value;
  // console.log("deets:"+newUser+String(newUser)+typeof newUser+" "+typeof newPW+" "+typeof newEmail)
  fetch(url,{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({
    "username":newUser,
    "password":newPW,
    "email":newEmail
  })
  }).then(res => {
    console.log("res:"+res.value)
    return res.json()
  }).then(data =>console.log(data))
  .catch(error=>console.log('Error!'));
 
}
// "username":String(newUser),
//     "password":String(newPW),
//     "email":String(newEmail)
window.onload=function(){
  document.getElementById("submitNewUser").addEventListener("click", submitUserAcc);
}       