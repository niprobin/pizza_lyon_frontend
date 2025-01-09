// ------------------------------------------------------------ NEW JS

const webAppUrl = "https://script.google.com/macros/s/AKfycbwZ5HBq9YuXBLaXEyfZhBtQrXDOAG9ns-wl3N9Dab70ElXFFJllymJkSAXPG1S90mjHhg/exec"; // Replace with your Google Web App URL
const pizzeriasContainer = document.getElementById("pizzerias-list");

// Fetch data from the Google Web App
async function fetchPizzerias() {
  try {
    const response = await fetch(webAppUrl);
    if (!response.ok) throw new Error("Failed to fetch data");
    const pizzerias = await response.json();
    displayPizzerias(pizzerias);
  } catch (error) {
    console.error("Error:", error);
    pizzeriasContainer.innerHTML = "<p>Petite erreur. Désolé !</p>";
  }
}

// Format a date in "Month Year" format
function formatDate(dateString) {
  if (!dateString) return "Unknown Date";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(date);
}

// Display pizzerias in the container
function displayPizzerias(pizzerias) {
  pizzeriasContainer.innerHTML = ""; // Clear any existing content

  pizzerias.forEach(pizzeria => {
    // Create pizzeria card
    const pizzeriaDiv = document.createElement("div");
    pizzeriaDiv.className = "pizzeria";

    const pizzeriaImage = pizzeria.image_url || "https://via.placeholder.com/80";
    const visitedDate = formatDate(pizzeria.date);


    const pizzeriaHTML = `
    <div class="pizzeria">
              <img src="${pizzaImage}" />
              <div class="pizzeria-title">
              <h2>${pizzeria.pizzeria}</h2>
              <p class="rating">${pizzeria.note} étoiles</p>
              </div>
              <p class="location">${pizzeria.addresse}</p>
              <p class="location">${visitedDate}</p>
              <div class="comment">
              <h3>On en pense quoi ?</h3>
              <p>${pizzeria.commentaire_robin}</p>
              </div>
            </div>
    `;

    pizzeriaDiv.innerHTML = pizzeriaHTML;
    pizzeriasContainer.appendChild(pizzeriaDiv);
  });
}

// Fetch and display pizzerias when the page loads
fetchPizzerias(); 
  