// --- 1. State ---
const state = {
  products: [],
  cart: [],
  searchQuery: '',
  brandFilter: 'All'
};

// --- NEW: Load Cart from LocalStorage on Startup ---
const savedCart = localStorage.getItem('addisCart');
if (savedCart) {
  state.cart = JSON.parse(savedCart);
}

// DOM Elements
const els = {
  grid: document.getElementById('product-grid'),
  searchInput: document.getElementById('search-input'),
  brandFilters: document.getElementById('brand-filters'),
  cartList: document.getElementById('cart-list'),
  cartTotal: document.getElementById('cart-total-amount'),
  telebirrBtn: document.getElementById('telebirr-btn'),
  deliveryForm: document.getElementById('delivery-form')
};    

// --- 2. Load Data ---
async function loadProducts() {
  try {
    const response = await fetch('./data/watches.json');
    if (!response.ok) throw new Error('Network response was not ok');
    state.products = await response.json();
    renderProducts();
    updateCartUI(); // Renders the saved cart from localStorage
  } catch (error) {
    els.grid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    console.error('Fetch error:', error);
  }
}

// --- 3. Render Main View ---
function renderProducts() {
  const filtered = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesBrand = state.brandFilter === 'All' || product.brand === state.brandFilter;
    return matchesSearch && matchesBrand;
  });

  if (filtered.length === 0) {
    els.grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No watches found matching your criteria.</p>';
    return;
  }

  els.grid.innerHTML = filtered.map(product => `
    <div class="card">
      <div class="emoji">${product.image}</div>
      <h3>${product.name}</h3>
      <p>${product.brand} - $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// --- 4. Render Cart & Update Button ---
function updateCartUI() {
  els.telebirrBtn.disabled = state.cart.length === 0;

  if (state.cart.length === 0) {
    els.cartList.innerHTML = '<li>Your cart is empty.</li>';
    els.cartTotal.textContent = '0';
    // Save the empty state to localStorage
    localStorage.setItem('addisCart', JSON.stringify(state.cart));
    return;
  }

  // Show quantity and +/- buttons
  els.cartList.innerHTML = state.cart.map(item => `
    <li>
      <span>${item.name} ($${item.price})</span>
      <div class="qty-controls">
        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    </li>
  `).join('');

  // Multiply price by quantity
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  els.cartTotal.textContent = total;

  // --- NEW: Save the populated cart to LocalStorage ---
  localStorage.setItem('addisCart', JSON.stringify(state.cart));
}

// --- 5. Core Interactions (Events) ---

// Search
els.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderProducts();
});

// Brand Filter Buttons (Event Delegation)
els.brandFilters.addEventListener('click', (e) => {
  if (e.target.classList.contains('brand-btn')) {
    document.querySelectorAll('.brand-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    state.brandFilter = e.target.dataset.brand;
    renderProducts();
  }
});

// Cart Actions
window.addToCart = (productId) => {
  const product = state.products.find(p => p.id === productId);
  if (product) {
    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
  }
};

window.updateQuantity = (productId, change) => {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
    updateCartUI();
  }
};

// Telebirr Checkout Integration & Form Validation
els.deliveryForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  if (state.cart.length === 0) return;

  const nameInput = document.getElementById('cust-name');
  const addressInput = document.getElementById('cust-address');
  const phoneInput = document.getElementById('cust-phone');

  const nameError = document.getElementById('error-name');
  const addressError = document.getElementById('error-address');
  const phoneError = document.getElementById('error-phone');

  [nameInput, addressInput, phoneInput].forEach(input => input.classList.remove('input-error'));
  [nameError, addressError, phoneError].forEach(msg => msg.classList.remove('visible'));

  let isValid = true;

  const nameVal = nameInput.value.trim();
  const hasNumbers = /\d/.test(nameVal); 

  if (!nameVal || nameVal.length > 20 || hasNumbers) {
    nameInput.classList.add('input-error');
    nameError.classList.add('visible');

    if (hasNumbers) nameError.textContent = "Numbers are not allowed in the full name.";
    else if (nameVal.length > 20) nameError.textContent = "Name cannot exceed 20 characters.";
    else nameError.textContent = "Full name is required.";

    isValid = false;
  }

  const addressVal = addressInput.value.trim();
  if (!addressVal || addressVal.length > 30) {
    addressInput.classList.add('input-error');
    addressError.classList.add('visible');

    if (addressVal.length > 30) addressError.textContent = "Address cannot exceed 30 characters.";
    else addressError.textContent = "Delivery address is required.";

    isValid = false;
  }

  const phoneVal = phoneInput.value.trim();
  const phoneRegex = /^\+251\d{9}$/; 

  if (!phoneRegex.test(phoneVal)) {
    phoneInput.classList.add('input-error');
    phoneError.classList.add('visible');
    phoneError.textContent = "Must start with +251 followed by exactly 9 digits.";

    isValid = false;
  }

  if (!isValid) return;

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  alert(`Validation Successful!\nThank you, ${nameVal}.\nInitiating secure Telebirr transaction for $${total}...`);

  // Clear cart and form after successful checkout
  state.cart = [];
  els.deliveryForm.reset();
  updateCartUI(); // This will also clear it from localStorage!
});

// Initialize App
loadProducts();