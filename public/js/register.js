let api = "http://127.0.0.1:3000/";
let login = document.getElementById("login");
let form = document.getElementById("form-add");
let buttonRegister = document.getElementById("buttom-register");

login.addEventListener("click", () => {
  window.location.href = "/auth/login";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = form.email.value;
  let username = form.username.value;
  let password = form.password1.value;
  fetch(api + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // window.location.href = "login";
    })
    .catch((err) => {
      console.log(err);
    });
});
