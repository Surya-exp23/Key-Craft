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


// document.getElementById("loginid12").addEventListener("click", function () {
//     window.location.href = "../stats_dashboard/index.html";
// });


// document.getElementById("createacc12").addEventListener("click", function () {
//     window.location.href = "../stats_dashboard/index.html";
// });
