// Cache element references once
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Form submit listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const n = nameInput.value.trim();
  const p = Number(priceInput.value);
  
  // Validate that both fields are filled
  if (!n || !p) return;
  
  addRow(n, p);
  form.reset();
  updateTotal();
});

// Delegated listener on the parent <ul>
list.addEventListener("click", (e) => {
  // If delete button is clicked
  if (e.target.matches(".del")) { 
    e.target.closest("li").remove(); 
    updateTotal(); 
  }
  // If the li itself is clicked (toggles bought state)
  else if (e.target.matches("li")) {
    e.target.classList.toggle("bought");
  }
});

// Helper function to build and append the DOM node
function addRow(name, price) {
  const li = document.createElement("li");
  // Store the price in a data attribute to easily calculate the total later
  li.dataset.price = price; 
  li.textContent = `${name} - ${price} ETB `;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del");

  // Append button to list item, then list item to the list
  li.append(delBtn);
  list.append(li);
}

// Helper function to calculate the running total
function updateTotal() {
  let runningTotal = 0;
  
  // Select all current list items and sum their dataset.price values
  const allItems = list.querySelectorAll("li");
  allItems.forEach(item => {
    runningTotal += Number(item.dataset.price);
  });
  
  // Update the DOM element
  totalEl.textContent = runningTotal.toFixed(2);
}