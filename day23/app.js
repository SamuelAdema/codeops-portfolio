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
  brandFilters: document.getElementById('brand-filters'), // Updated
  cartList: document.getElementById('cart-list'),
  cartTotal: document.getElementById('cart-total-amount'),
  telebirrBtn: document.getElementById('telebirr-btn')    // Added
};

// --- 2. Load Data ---
async function loadProducts() {
  try {
    const response = await fetch('./data/watches.json');
    if (!response.ok) throw new Error('Network response was not ok');
    state.products = await response.json();
    renderProducts();
    updateCartUI(); // Ensure Telebirr button state is correct on load
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
  // Toggle Telebirr button state
  els.telebirrBtn.disabled = state.cart.length === 0;

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

// Brand Filter Buttons (Event Delegation)
els.brandFilters.addEventListener('click', (e) => {
  if (e.target.classList.contains('brand-btn')) {
    // 1. Remove active class from all buttons
    document.querySelectorAll('.brand-btn').forEach(btn => btn.classList.remove('active'));
    
    // 2. Add active class to clicked button
    e.target.classList.add('active');
    
    // 3. Update state and re-render
    state.brandFilter = e.target.dataset.brand;
    renderProducts();
  }
});

// Cart Actions
window.addToCart = (productId) => {
  const product = state.products.find(p => p.id === productId);
  if (product) {
    state.cart.push(product);
    updateCartUI();
  }
};

window.removeFromCart = (cartIndex) => {
  state.cart.splice(cartIndex, 1);
  updateCartUI();
};

// Telebirr Checkout Integration
els.telebirrBtn.addEventListener('click', () => {
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  
  // In a real production app, this is where you would post to your backend 
  // to generate a payment session URL. For now, we simulate the redirect.
  alert(`Initiating secure Telebirr transaction for $${total}...\n\n(Redirecting to payment gateway)`);
  
  // Clear cart after successful "checkout"
  state.cart = [];
  updateCartUI();
});

// Initialize App
loadProducts();