// Login

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
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
}

// Deposit

const depositForm = document.getElementById("deposit-form");
if (depositForm) {
  depositForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = Number(document.getElementById("amount").value);
    const balance = Number(localStorage.getItem("balance")) || 100000;
    const newBalance = balance + amount;

    if (amount <= 0) {
      alert("El monto debe ser mayor a 0");
    } else {
      localStorage.setItem("balance", newBalance);
      alert(
        "¡Depósito realizado correctamente! Tu nuevo saldo es de $" +
          newBalance,
      );
      window.location.href = "/dashboard/menu.html";
    }
  });
}
