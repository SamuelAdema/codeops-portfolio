// --- 1. State ---
const state = {
  products: [],
  cart: [],
  searchQuery: '',
  brandFilter: 'All'
};

// DOM Elements
const els = {
  grid: document.getElementById('product-grid'),
  searchInput: document.getElementById('search-input'),
  brandFilter: document.getElementById('brand-filter'),
  cartList: document.getElementById('cart-list'),
  cartTotal: document.getElementById('cart-total-amount')
};

// --- 2. Load Data ---
async function loadProducts() {
  try {
    const response = await fetch('./data/watches.json');
    if (!response.ok) throw new Error('Network response was not ok');
    state.products = await response.json();
    renderProducts();
  } catch (error) {
    els.grid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    console.error('Fetch error:', error);
  }
}

// --- 3. Render Main View ---
function renderProducts() {
  // Apply filters
  const filtered = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesBrand = state.brandFilter === 'All' || product.brand === state.brandFilter;
    return matchesSearch && matchesBrand;
  });

  // Render HTML
  if (filtered.length === 0) {
    els.grid.innerHTML = '<p>No watches found matching your criteria.</p>';
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

// --- 4. Render Cart ---
function renderCart() {
  if (state.cart.length === 0) {
    els.cartList.innerHTML = '<li>Your cart is empty.</li>';
    els.cartTotal.textContent = '0';
    return;
  }

  els.cartList.innerHTML = state.cart.map((item, index) => `
    <li>
      <span>${item.name} ($${item.price})</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
    </li>
  `).join('');

  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  els.cartTotal.textContent = total;
}

// --- 5. Core Interactions (Events) ---

// Search
els.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderProducts();
});

// Filter
els.brandFilter.addEventListener('change', (e) => {
  state.brandFilter = e.target.value;
  renderProducts();
});

// Cart Actions
window.addToCart = (productId) => {
  const product = state.products.find(p => p.id === productId);
  if (product) {
    state.cart.push(product);
    renderCart();
  }
};

window.removeFromCart = (cartIndex) => {
  state.cart.splice(cartIndex, 1);
  renderCart();
};

// Initialize App
loadProducts();