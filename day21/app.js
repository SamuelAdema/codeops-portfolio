const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const n = nameInput.value.trim();
  const p = Number(priceInput.value);
  if (!n || !p) return;
  addRow(n, p);
  form.reset();
  updateTotal();
});

list.addEventListener("click", (e) => {
  if (e.target.matches(".del")) { 
    e.target.closest("li").remove(); 
    updateTotal(); 
  }
  else if (e.target.matches("li")) {
    e.target.classList.toggle("bought");
  }
});

function addRow(name, price) {
  const li = document.createElement("li");
  li.dataset.price = price; 
  li.textContent = `${name} - ${price} ETB `;
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del");
  li.append(delBtn);
  list.append(li);
}

function updateTotal() {
  let runningTotal = 0;
  const allItems = list.querySelectorAll("li");
  allItems.forEach(item => { runningTotal += Number(item.dataset.price); });
  totalEl.textContent = runningTotal.toFixed(2);
}