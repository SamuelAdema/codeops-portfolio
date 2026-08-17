const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const out = document.querySelector("#facts");

// Helper function to create and append fact rows
function renderFact(parent, label, value) {
  const row = document.createElement("div");
  row.className = "fact-row";

  const labelEl = document.createElement("span");
  labelEl.className = "fact-label";
  labelEl.textContent = `${label}:`;

  const valueEl = document.createElement("span");
  valueEl.textContent = value;

  row.append(labelEl, valueEl);
  parent.append(row);
}

// Main async fetch function
async function showCountry(name) {
  // 1. Set Loading State
  out.textContent = "Loading...";
  out.className = "output-area loading";

  try {
    // 2. Fetch Data
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=false`);
    
    // 3. Check for HTTP errors (like 404 Country Not Found)
    if (!res.ok) {
      throw new Error(`Country "${name}" not found.`);
    }

    const data = await res.json();
    const c = data[0]; // Get the first match

    // Clear output container and update class for success state
    out.innerHTML = "";
    out.className = "output-area";

    // 4. Render Flag
    if (c.flags && c.flags.svg) {
      const flagImg = document.createElement("img");
      flagImg.src = c.flags.svg;
      flagImg.alt = `Flag of ${c.name.common}`;
      flagImg.className = "flag-img";
      out.append(flagImg);
    }

    // 5. Extract and Format Data
    const countryName = c.name.common;
    const capital = c.capital ? c.capital[0] : "N/A";
    const population = c.population.toLocaleString(); // Commas for readability
    const region = c.region;
    
    // Extract currency names (REST countries nests them dynamically inside an object)
    let currencies = "N/A";
    if (c.currencies) {
      currencies = Object.values(c.currencies).map(curr => curr.name).join(", ");
    }

    // 6. Render Data into DOM
    renderFact(out, "Name", countryName);
    renderFact(out, "Capital", capital);
    renderFact(out, "Population", population);
    renderFact(out, "Region", region);
    renderFact(out, "Currencies", currencies);

  } catch (err) {
    // 7. Handle network or HTTP errors cleanly
    out.textContent = err.message;
    out.className = "output-area error";
  }
}

// Event Listener for the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchVal = input.value.trim();
  if (searchVal) {
    showCountry(searchVal);
    input.value = ""; // Clear input after search
  }
});

// Default behavior on first load
showCountry("ethiopia");