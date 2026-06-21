// Login

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "tania@sense.cl" && password === "123456") {
      alert("¡Login exitoso! Bienvenido, " + email);

      window.location.href = "/dashboard/menu.html";
    } else {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  });
