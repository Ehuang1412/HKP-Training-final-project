role="";
// let token="tojen";
function signIn(e){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  e.preventDefault();

  fetch('https://install-gentoo.herokuapp.com/users/login',{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({
    "username":username,
    "password":password
  })
  }).then(res=>{
    if(res.ok){
      setFormMessage( "success", "You are now logged in")
      console.log('SUCCESS ');
      // role = JSON.parse(res.json());
      // role = JSON.stringify(res.json())
      // console.log('res.json() role:'+res.json());
      // Object.keys(res.json()).forEach((prop)=> console.log('key: '+prop));
  
      return res.json()
    } else{
      setFormMessage( "error", "Invalid username/password combination");
      console.log("NOT SUCEES")
    }
  })
  .then(data=>{
    // data is now parsed JSON
    //***data[prop]['role'] to get role type
    // console.log("second then "+data);
    // Object.keys(data).forEach((prop)=> console.log('KEY: '+prop+' VALUE:'+data[prop]));
    sessionStorage.setItem("token", data["token"]);
    // token = data["token"];

    console.log(typeof data["token"]+" token: "+data["token"]);
  //  sleep(10000);
    let loginButton = document.getElementById("loginButton");
    if(data['user']['role'] == 'admin'){
      // loginButton.setAttribute("onclick","document.location='admin.html'");
      window.location.href = 'admin.html';
    }else{
      //  loginButton.setAttribute("onclick","document.location='shopping.html'");
      window.location.href = 'shopping.html';
    }
  })
  .catch(error=>{
    console.log('Error:'+error);
    // console.log('role: '+role);
    // Object.keys(role).forEach((prop)=> console.log('key: '+prop));
  
  })




  
  // for(let i=0; i<sampleLogins.length; i++){
  //   if(username == sampleLogins[i].username && password == sampleLogins[i].password){
  //     console.log(username + "logged in!!!")
  //     setFormMessage( "success", "You are now loggin in")
  //     return
  //   }
  // }
  
  // console.log("Incorrect username or password");
  // setFormMessage( "error", "Invalid username/password combination");
}

function setFormMessage(type, message) {
    const messageElement = document.getElementById("form__message--error");
    messageElement.innerText = message;
       // messageElement.classList.remove("form__message");
    // messageElement.classList.add(`form__message--${type}`);
    console.log(" msg:"+messageElement+" messageElement.innerText:"+messageElement.innerText)
}
// console.log('document.getElementById("loginButton"): '+document.getElementById("loginButton"))
window.onload=function(){
  document.getElementById("loginButton").addEventListener("click", signIn);
}





// const loginForm = document.querySelector("#loginForm");
    // const createAccountForm = document.querySelector("#createAccount");

    // document.querySelector("#linkCreateAccount").addEventListener("click", e => {
    //     e.preventDefault();
    //     loginForm.classList.add("form--hidden");
    //     createAccountForm.classList.remove("form--hidden");
    // });

    // document.querySelector("#linkLogin").addEventListener("click", e => {
    //     e.preventDefault();
    //     loginForm.classList.remove("form--hidden");
    //     createAccountForm.classList.add("form--hidden");
    // });

// loginForm.addEventListener("submit", e => {
//     e.preventDefault();

//     // Perform your AJAX/Fetch login

//     setFormMessage(loginForm, "error", "Invalid username/password combination");
// });

    // document.querySelectorAll(".form__input").forEach(inputElement => {
    //     inputElement.addEventListener("blur", e => {
    //         if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
    //             setInputError(inputElement, "Username must be at least 10 characters in length");
    //         }
    //     });

    //     inputElement.addEventListener("input", e => {
    //         clearInputError(inputElement);
    //     });
    // });​

