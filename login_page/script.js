const mainCard = document.querySelector(".maincard");
const toSignup = document.getElementById("toSignup");
const toLogin = document.getElementById("toLogin");

toSignup.addEventListener("click", (e) => {
    e.preventDefault();
    mainCard.classList.add("signup-active");
});

toLogin.addEventListener("click", (e) => {
    e.preventDefault();
    mainCard.classList.remove("signup-active");
});