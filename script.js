// ------------------------------------------------------------ NEW JS

const webAppUrl = "https://opensheet.elk.sh/1PuFhutQPBSHnyl8VZPgyteMux6ughDb-zGv8nmgHQVs/pizza_data"; // Replace with your Google Web App URL
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

function formatDate(dateString) {
  // Define the months in an array
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"
  ];

  // Split the input string (assumes format "DD/MM/YYYY")
  const [day, month, year] = dateString.split('/');

  // Convert the month from string to number and get the month name
  const monthName = months[parseInt(month, 10) - 1]; // Month is 1-indexed

  // Return the formatted string
  return `${monthName} ${year}`;
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
    const comRob = pizzeria.commentaire_robin || "-";
    const comViks = pizzeria.commentaire_viks || "-";
    const comCelia = pizzeria.commentaire_celia || "-";


    const pizzeriaHTML = `
    <div class="pizzeria">
              <div style="background-image:url(${pizzeriaImage})" class="pizzeria-bg">
                <div class="pizzeria-labels">
                  <p class="date">${visitedDate}</p>
                  <p class="rating">${pizzeria.note}/10</p>
                  <p class="hood">${pizzeria.arrondissement}</p>
                </div>
              </div>
              <div class="text">
                <div class="pizzeria-info">
                  <h2>${pizzeria.pizzeria}</h2>
                  <a href="${pizzeria.google_link_2}"><i class="fa-solid fa-location-dot"></i>&ensp;${pizzeria.adresse}</a>
                </div>
                <div class="comment">
                <h3>On en pense quoi ?</h3>
                  <div><span>👨‍💻</span><p><em>"${comRob}"</p></em></div>
                  <div><span>👨‍🔧</span><p><em>"${comViks}"</p></em></div>
                  <div><span>👩‍🎨</span><p><em>"${comCelia}"</p></em></div>
                </div>
              </div>
            </div>
    `;

    pizzeriaDiv.innerHTML = pizzeriaHTML;
    pizzeriasContainer.appendChild(pizzeriaDiv);
  });
}

// Fetch and display pizzerias when the page loads
fetchPizzerias(); 
  