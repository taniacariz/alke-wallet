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

// Send money

const sendMoneyForm = document.getElementById("send-money-form");
if (sendMoneyForm) {
  sendMoneyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selected = document.querySelector(
      'input[name="selected-contact"]:checked',
    );
    if (!selected) {
      alert("Debes seleccionar un contacto");
      return;
    }

    const row = selected.closest("tr");
    const recipientName = row.dataset.name;

    const amountToSend = Number(document.getElementById("send-amount").value);
    const balance = Number(localStorage.getItem("balance")) || 100000;

    if (amountToSend <= 0) {
      alert("El monto debe ser mayor a 0");
      return;
    }
    if (amountToSend > balance) {
      alert("¡Saldo insuficiente! Tu saldo actual es de $" + balance);
      return;
    }

    const newBalance = balance - amountToSend;
    localStorage.setItem("balance", newBalance);

    alert(
      "¡Envío realizado correctamente a " +
        recipientName +
        "! Tu nuevo saldo es de $" +
        newBalance,
    );
    window.location.href = "/dashboard/menu.html";
  });
}


// Contact list

const contactListElement = document.getElementById("contact-list");

if (contactListElement) {
  const storedContacts = localStorage.getItem("contact-list");
  const savedContacts = storedContacts ? JSON.parse(storedContacts) : [];

  // Recorremos el arreglo y pintamos cada contacto en la tabla
  savedContacts.forEach(function (contact) {
    contactListElement.insertAdjacentHTML(
      "beforeend",
      `<tr data-name="${contact.name}">
        <td><input type="radio" name="selected-contact"></td>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.bank}</td>
        <td>${contact.account}</td>
        <td>${contact.alias}</td>
      </tr>`,
    );
  });
}

// 2. La lógica de tu formulario
const addContactForm = document.getElementById("add-contact-form");
if (addContactForm) {
  addContactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Capturamos los datos
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const bank = document.getElementById("contact-bank").value.trim();
    const account = document.getElementById("contact-account").value.trim();
    const alias = document.getElementById("contact-alias").value.trim();

    document.getElementById("contact-list").insertAdjacentHTML(
      "beforeend",
      `<tr data-name="${name}">
        <td><input type="radio" name="selected-contact"></td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${bank}</td>
        <td>${account}</td>
        <td>${alias}</td>
      </tr>`,
    );

    const newContactObj = {
      name: name,
      email: email,
      bank: bank,
      account: account,
      alias: alias,
    };

    const storedContacts = localStorage.getItem("contact-list");
    const existingContacts = storedContacts ? JSON.parse(storedContacts) : [];

    existingContacts.push(newContactObj);

    localStorage.setItem("contact-list", JSON.stringify(existingContacts));

    addContactForm.reset();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addContactModal"),
    );
    if (modal) {
      modal.hide();
    }
  });
}
