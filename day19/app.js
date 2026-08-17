// --- Exercise 1: Select <h1>, change textContent, toggle class ---
const h1 = document.querySelector("#main-heading");
h1.textContent = "Text Changed via JS!";
h1.classList.toggle("highlight");

// --- Exercise 2: Array of cities, createElement, append to <ul> ---
const cities = ["Addis Ababa", "Hawassa", "Bahir Dar"];
const cityList = document.querySelector("#city-list");

cities.forEach(city => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});

// --- Exercise 3: Click listener logging event.target, div listener for bubbling ---
const bubbleBtn = document.querySelector("#bubble-btn");
const bubbleContainer = document.querySelector("#bubble-container");

bubbleBtn.addEventListener("click", (e) => {
  console.log("Button clicked! Target:", e.target);
});

bubbleContainer.addEventListener("click", (e) => {
  console.log("Div caught the click via bubbling! Target is still:", e.target);
});

// --- Exercise 4: Single delegated listener to remove items ---
const delegationList = document.querySelector("#delegation-list");

delegationList.addEventListener("click", (e) => {
  if (e.target.matches(".del-btn")) {
    e.target.closest("li").remove(); // Removes the parent <li> of the clicked button
  }
});

// --- Exercise 5: Form preventDefault, read input, append, clear ---
const simpleForm = document.querySelector("#simple-form");
const simpleInput = document.querySelector("#simple-input");
const simpleList = document.querySelector("#simple-list");

simpleForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  
  const val = simpleInput.value.trim();
  if (val) {
    const li = document.createElement("li");
    li.textContent = val;
    simpleList.append(li);
    simpleInput.value = ""; // Clear field
  }
});