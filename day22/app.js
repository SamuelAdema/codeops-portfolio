// --- 1. State Object ---
const state = {
  rates: {},
  watchlist: [],
  status: 'loading' // 'loading', 'success', 'error'
};

// DOM Elements
const els = {
  status: document.getElementById('status'),
  convertForm: document.getElementById('convert-form'),
  amountInput: document.getElementById('amount-input'),
  currencySelect: document.getElementById('currency-select'),
  result: document.getElementById('result'),
  watchlistForm: document.getElementById('watchlist-form'),
  watchlistSelect: document.getElementById('watchlist-select'),
  watchlistUl: document.getElementById('watchlist-ul'),
  emptyMsg: document.getElementById('empty-watchlist-msg')
};

// --- 2. Load Rates & Initialize ---
async function init() {
  // Load watchlist from localStorage
  const savedWatchlist = localStorage.getItem('birrWatchlist');
  if (savedWatchlist) {
    state.watchlist = JSON.parse(savedWatchlist);
  }

  updateStatus('loading', 'Loading live ETB rates...');

  try {
    // Fetching rates where ETB is the base currency (or calculating relative to standard base)
    // Using an open API that provides standard rates
    const response = await fetch('https://open.er-api.com/v6/latest/ETB');
    if (!response.ok) throw new Error('Failed to fetch rates');
    
    const data = await response.json();
    state.rates = data.rates;
    
    updateStatus('success', `Rates updated: ${new Date(data.time_last_update_unix * 1000).toLocaleString()}`);
    renderDropdowns();
    renderWatchlist();
  } catch (error) {
    updateStatus('error', 'Error loading rates. Please try again later.');
    console.error(error);
  }
}

// --- 3. Status Handling ---
function updateStatus(type, message) {
  state.status = type;
  els.status.textContent = message;
  els.status.className = `status ${type}`;
}

// --- 4. Rendering ---
function renderDropdowns() {
  const currencies = Object.keys(state.rates).sort();
  
  const optionsHTML = currencies
    .filter(c => c !== 'ETB') // Don't convert ETB to ETB
    .map(c => `<option value="${c}">${c}</option>`)
    .join('');

  // Keep the placeholder, append the options
  els.currencySelect.innerHTML = `<option value="" disabled selected>Select Currency</option>` + optionsHTML;
  els.watchlistSelect.innerHTML = `<option value="" disabled selected>Add to Watchlist</option>` + optionsHTML;
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    els.watchlistUl.innerHTML = '';
    els.emptyMsg.classList.remove('hidden');
    return;
  }

  els.emptyMsg.classList.add('hidden');
  
  els.watchlistUl.innerHTML = state.watchlist.map(currency => {
    const rate = state.rates[currency];
    const rateDisplay = rate ? rate.toFixed(4) : 'N/A';
    return `
      <li data-currency="${currency}">
        <span><strong>1 ETB</strong> = ${rateDisplay} ${currency}</span>
        <button class="delete-btn">Remove</button>
      </li>
    `;
  }).join('');
}

// --- 5. Convert Form Logic ---
els.convertForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const amount = parseFloat(els.amountInput.value);
  const targetCurrency = els.currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }
  if (!targetCurrency) {
    alert('Please select a currency.');
    return;
  }

  const rate = state.rates[targetCurrency];
  if (rate) {
    const converted = (amount * rate).toFixed(2);
    els.result.textContent = `${amount} ETB = ${converted} ${targetCurrency}`;
    els.result.classList.remove('hidden');
  } else {
    els.result.textContent = 'Conversion error. Rate not found.';
    els.result.classList.remove('hidden');
  }
});

// --- 6. Watchlist Logic (Add & Delegate Delete) ---
els.watchlistForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const currency = els.watchlistSelect.value;
  if (!currency) return;

  // Prevent duplicates
  if (!state.watchlist.includes(currency)) {
    state.watchlist.push(currency);
    saveWatchlist();
    renderWatchlist();
  } else {
    alert(`${currency} is already in your watchlist!`);
  }
  
  // Reset select
  els.watchlistSelect.value = '';
});

// Event Delegation for Delete Buttons
els.watchlistUl.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    const currencyToRemove = li.getAttribute('data-currency');
    
    state.watchlist = state.watchlist.filter(c => c !== currencyToRemove);
    saveWatchlist();
    renderWatchlist();
  }
});

// Save to LocalStorage
function saveWatchlist() {
  localStorage.setItem('birrWatchlist', JSON.stringify(state.watchlist));
}

// Bootstrap the app
init();