const totalBalance = document.querySelector(".total_balance");
const incomeBalance = document.querySelector(".income_balance");
const expenseBalance = document.querySelector(".expense_balance");
const list = document.querySelector(".list_history");
const noList = document.querySelector(".no_list");
const form = document.querySelector(".form");

const formatter = new Intl.NumberFormat("en-US", {
  signDisplay: "always",
});

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let total = 0;
let type = "";

createListTransaction();
incomeTotal();
expenseTotal();
updateTotal();

form.addEventListener("submit", addTransaction);

function incomeTotal() {
  const income = transactions
    .filter((oneTransaction) => oneTransaction.type === "+income")
    .reduce((total, oneTransaction) => +total + +oneTransaction.amount, 0);

  incomeBalance.textContent = income.toFixed(2);

  return income;
}

function expenseTotal() {
  const expense = transactions
    .filter((oneTransaction) => oneTransaction.type === "expense")
    .reduce((total, oneTransaction) => +total + +oneTransaction.amount, 0);

  expenseBalance.textContent = expense.toFixed(2);

  return expense;
}

function updateTotal() {
  total = incomeTotal() + expenseTotal();
  totalBalance.textContent = total.toFixed(2);
}

function createListTransaction() {
  if (transactions.length === 0) {
    noList.textContent = "You don`t have any transaction!";
  }
  const markup = transactions
    .map(({ id, name, amount }) => {
      return `<li class="list_item"><button id="btn_delete" class="btn_delete" onclick="deleteTransaction(${id})">delete</button><p class="item_text">${name}</p><p class="item_text">${formatter.format(
        amount
      )}</p></li>`;
    })
    .join("");

  list.innerHTML = markup;
}

function addTransaction(evt) {
  evt.preventDefault();

  const nameInput = form.elements.name.value;
  const amountInput = +form.elements.number.value;

  if (amountInput > 0) {
    type = "+income";
  } else {
    type = "expense";
  }

  transactions.push({
    id: transactions.length + 1,
    name: nameInput.trim(),
    amount: amountInput.toFixed(2),
    type,
  });

  form.reset();

  saveLocaleStorage();
  updateTotal();
  createListTransaction();
}

function deleteTransaction(id) {
  alert("delete");
  const index = transactions.findIndex(
    (oneTransaction) => oneTransaction.id === id
  );
  transactions.splice(index, 1);

  updateTotal();
  saveLocaleStorage();
  createListTransaction();
}

function saveLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
