// Get Elements
const loginCard = document.querySelector(".LoginCard");
const registerNowBtn = document.querySelector("#Register-now");
const LoginNowBtn = document.querySelector("#Login-now");
const RegisterCard = document.querySelector(".RegisterCard");
const LoginSection = document.querySelector(".LoginSection");
const WebsiteNameContainer = document.querySelector(".WebsiteNameContainer");

RegisterCard.style.display = "none";
LoginSection.style.display='none'

// Show Registration Section
registerNowBtn.addEventListener("click", () => {
  loginCard.style.display = "none";
  WebsiteNameContainer.style.display='none'
  RegisterCard.style.display = "flex";

});


// Show Login Card 
LoginNowBtn.addEventListener('click',()=>{
loginCard.style.display='none'
RegisterCard.style.display='none'
WebsiteNameContainer.style.display = "none";
LoginSection.style.display='flex'
})

// Create Account Form

// const FormContainer = document
//   .querySelector(".FormContainer")
//   .addEventListener("click", (event) => {
//     // event.preventDefault();
//   });

