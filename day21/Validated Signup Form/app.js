const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const STORAGE_KEY = "signup_entries";

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const messageArea = document.querySelector("#message-area");
const countDisplay = document.querySelector("#signup-count");

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try { return JSON.parse(raw); } 
  catch (err) { return []; }
}

function validate(name, phone) {
  if (name.length < 2) return "Enter your full name (at least 2 characters).";
  if (!PHONE_REGEX.test(phone)) return "Enter a valid Ethiopian phone number.";
  return ""; 
}

function updateCount() {
  const entries = load(STORAGE_KEY);
  countDisplay.textContent = entries.length;
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  
  const errorMsg = validate(nameVal, phoneVal);
  if (errorMsg) {
    messageArea.textContent = errorMsg;
    messageArea.className = "error";
    return;
  }
  
  const entries = load(STORAGE_KEY);
  entries.push({ name: nameVal, phone: phoneVal });
  save(STORAGE_KEY, entries);
  
  form.reset();
  messageArea.textContent = "Signup successful!";
  messageArea.className = "success";
  updateCount();
});

updateCount();