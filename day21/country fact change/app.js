const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const out = document.querySelector("#facts");

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

async function showCountry(name) {
  out.textContent = "Loading...";
  out.className = "output-area loading";
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=false`);
    if (!res.ok) throw new Error(`Country "${name}" not found.`);
    const data = await res.json();
    const c = data[0]; 
    out.innerHTML = "";
    out.className = "output-area";

    if (c.flags && c.flags.svg) {
      const flagImg = document.createElement("img");
      flagImg.src = c.flags.svg;
      flagImg.className = "flag-img";
      out.append(flagImg);
    }

    renderFact(out, "Name", c.name.common);
    renderFact(out, "Capital", c.capital ? c.capital[0] : "N/A");
    renderFact(out, "Population", c.population.toLocaleString());
    renderFact(out, "Region", c.region);
    
    let currencies = "N/A";
    if (c.currencies) {
      currencies = Object.values(c.currencies).map(curr => curr.name).join(", ");
    }
    renderFact(out, "Currencies", currencies);

  } catch (err) {
    out.textContent = err.message;
    out.className = "output-area error";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchVal = input.value.trim();
  if (searchVal) {
    showCountry(searchVal);
    input.value = ""; 
  }
});

showCountry("ethiopia");