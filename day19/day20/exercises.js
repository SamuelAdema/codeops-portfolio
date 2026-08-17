// --- Exercise 1: Fetch USD to ETB rate ---
async function getExchangeRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("Failed to fetch exchange rate");
    const data = await res.json();
    console.log(`Exercise 1 - USD to ETB: ${data.rates.ETB}`);
    return data.rates.ETB;
  } catch (err) {
    console.error("Exercise 1 Error:", err);
  }
}
getExchangeRate();

// --- Exercise 2: Rewrite .then chain as async/await ---
/* 
// OLD .then CHAIN:
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => console.log(data.name))
  .catch(err => console.error(err));
*/

// NEW ASYNC/AWAIT:
async function getUserInfo() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("User fetch failed");
    const data = await res.json();
    console.log(`Exercise 2 - User Name: ${data.name}`);
  } catch (err) {
    console.error("Exercise 2 Error:", err);
  }
}
getUserInfo();

// --- Exercise 3: Wrong URL (catch) vs 404 URL (res.ok) ---
async function testErrors() {
  // 1. Wrong URL (Network Error -> goes straight to catch)
  try {
    await fetch("https://this-website-does-not-exist.com/api");
  } catch (err) {
    console.log("Exercise 3a (Network Error) caught:", err.message);
  }

  // 2. 404 URL (HTTP Error -> promise resolves, but res.ok is false)
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/9999");
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    const data = await res.json();
  } catch (err) {
    console.log("Exercise 3b (HTTP Error) caught because of res.ok check:", err.message);
  }
}
testErrors();

// --- Exercise 4: Promise.all to fetch details in parallel ---
async function fetchParallelUsers() {
  try {
    // First fetch the list
    const listRes = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!listRes.ok) throw new Error("Failed to fetch list");
    const users = await listRes.json();

    // Take the first two IDs and fetch their detailed posts in parallel
    const [user1, user2] = users;
    
    const [posts1Res, posts2Res] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${user1.id}/posts`),
      fetch(`https://jsonplaceholder.typicode.com/users/${user2.id}/posts`)
    ]);

    const posts1 = await posts1Res.json();
    const posts2 = await posts2Res.json();

    console.log(`Exercise 4 - User 1 has ${posts1.length} posts, User 2 has ${posts2.length} posts.`);
  } catch (err) {
    console.error("Exercise 4 Error:", err);
  }
}
fetchParallelUsers();

// --- Exercise 5: Tiny Page (Loading, Success, Error States) ---
const fetchBtn = document.querySelector("#fetch-btn");
const statusDisplay = document.querySelector("#status-display");

fetchBtn.addEventListener("click", async () => {
  // 1. Loading State
  statusDisplay.textContent = "Loading...";
  statusDisplay.className = "loading";

  try {
    // Simulated delay to visually see the "Loading..." state
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    // Deliberately using a working API to show success. 
    // To test the error state, disconnect your Wi-Fi or change the URL to something broken!
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("Could not load data");
    
    const data = await res.json();
    
    // 2. Success State
    statusDisplay.textContent = `Success! Fetched user: ${data.name}`;
    statusDisplay.className = "success";
  } catch (err) {
    // 3. Error State
    statusDisplay.textContent = `Error: ${err.message}`;
    statusDisplay.className = "error";
  }
});