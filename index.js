const totalBalance = document.querySelector(".total_balance");
const incomeBalance = document.querySelector(".income_balance");
const expenseBalance = document.querySelector(".expense_balance");
const list = document.querySelector(".list_history");
const noList = document.querySelector(".no_list");
const form = document.querySelector(".form");

const transactions = [];
let sign = "";

form.addEventListener("submit", addTransaction);

function updateTotalBalance() {
  if ((sign = "+")) {
    const totalAmount = transactions.reduce((total, oneTransaction) => {
      return total + oneTransaction.amount;
    }, 0);
    console.log(totalAmount);
    totalBalance.innerHTML = totalAmount;
    return totalAmount;
  }
}

function createListTransaction() {
  if (transactions.length === 0) {
    noList.textContent = "You don`t have any transaction!";
  }
  const markup = transactions
    .map(({ name, sign, amount }) => {
      return `<li class="list_item"><span>${name}</span><span class="sign">${sign}</span><span>${amount}</span></li>`;
    })
    .join("");

  list.innerHTML = markup;
}

function addTransaction(evt) {
  evt.preventDefault();

  const nameInput = form.elements.name.value;
  const amountInput = form.elements.number.value;
  console.log(amountInput);

  if (amountInput > 0) {
    sign = "+";
  }

  transactions.push({
    id: transactions.length + 1,
    name: nameInput.trim(),
    sign,
    amount: +amountInput,
  });

  form.reset();
  console.log(transactions);

  createListTransaction();
  updateTotalBalance();
}

console.log(transactions);
