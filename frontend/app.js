const state = {
  products: []
};

const form = document.getElementById("createForm");
const tableBody = document.getElementById("productsTableBody");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const data = readForm();

  if (validate(data)) {
    addItem(data);
    form.reset();
  }
});

clearBtn.addEventListener("click", function() {
  form.reset();
  clearErrors();
});

function readForm() {
  return {
    software: document.getElementById("softInput").value.trim(),
    license: document.getElementById("licenseSelect").value,
    request: document.getElementById("requestInput").value.trim(),
    user: document.getElementById("userInput").value.trim()
  };
}

function validate(data) {
  let valid = true;
  clearErrors();

  if (!data.software) {
    showError("softInput", "softError", "Введіть назву!");
    valid = false;
  }

  if (!data.license) {
    showError("licenseSelect", "licenseError", "Оберіть ліцензію!");
    valid = false;
  }

  if (!data.request) {
    showError("requestInput", "requestError", "Введіть ID!");
    valid = false;
  }

  if (!data.user || !data.user.includes("@")) {
    showError("userInput", "userError", "Некоректний email!");
    valid = false;
  }

  return valid;
}

function showError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearErrors() {
  document.querySelectorAll("input, select").forEach(el => {
    el.classList.remove("invalid");
  });

  document.querySelectorAll(".error-text").forEach(el => {
    el.textContent = "";
  });
}

function addItem(data) {
  const newItem = {
    id: Date.now(),
    ...data
  };

  state.products.push(newItem);
  renderTable();
}

function deleteItem(id) {
  state.products = state.products.filter(item => item.id !== id);
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";

  state.products.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.software}</td>
      <td>${item.license}</td>
      <td>${item.request}</td>
      <td>${item.user}</td>
      <td><button onclick="deleteItem(${item.id})">Видалити</button></td>
    `;

    tableBody.appendChild(row);
  });
}




