const webAppUrl = "https://opensheet.elk.sh/1PuFhutQPBSHnyl8VZPgyteMux6ughDb-zGv8nmgHQVs/pizza_data"; // Replace with your Google Web App URL
const pizzeriasContainer = document.getElementById("pizzerias-list");
const paginationContainer = document.getElementById("pagination-controls");
const filterDropdown = document.getElementById("filter");
const sortDropdown = document.getElementById("sort");

let allPizzerias = []; // Holds the full dataset
let filteredPizzerias = []; // Holds the filtered dataset
let currentPage = 1; // Tracks the current page
const itemsPerPage = 8; // Number of items per page

/* let sortOrder = {
  date: "desc", // Default to descending for date
  note: "desc"  // Default to descending for note
}; */

// Fetch data from the Google Web App
async function fetchPizzerias() {
  try {
    const response = await fetch(webAppUrl);
    if (!response.ok) throw new Error("Failed to fetch data");
    const pizzerias = await response.json();
    allPizzerias = pizzerias; // Store the full dataset
    filteredPizzerias = [...allPizzerias]; // Initialize filtered dataset
    displayPizzerias(filteredPizzerias); // Display the initial dataset
  } catch (error) {
    console.error("Error:", error);
    pizzeriasContainer.innerHTML = "<p>Petite erreur. Désolé !</p>";
  }
}

// Format date from "DD/MM/YYYY" to "Month Year"
function formatDate(dateString) {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const [day, month, year] = dateString.split('/');
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${year}`;
}

// Display pizzerias in the container
function displayPizzerias(pizzerias) {
  const paginatedPizzerias = paginatePizzerias(pizzerias);
  pizzeriasContainer.innerHTML = ""; // Clear any existing content

  paginatedPizzerias.forEach(pizzeria => {
    const pizzeriaImage = pizzeria.image_url || "https://via.placeholder.com/80";
    const visitedDate = formatDate(pizzeria.date);
    const comRob = pizzeria.commentaire_robin || "-";
    const comViks = pizzeria.commentaire_viks || "-";
    const comCelia = pizzeria.commentaire_celia || "-";

    const pizzeriaHTML = `
      <div>
        <div style="background-image:url(${pizzeriaImage})" class="pizzeria-hero">
          <a target="_blank" href="${pizzeria.google_link_2}">${pizzeria.pizzeria}</a>
        </div>
        <div class="text">
          <div class="pizzeria-info">
            <a target="_blank" href="${pizzeria.google_link_2}">
              <i class="fa-solid fa-map-location-dot"></i>&ensp;${pizzeria.adresse}
            </a>
            <p class="rating"><i class="fa-solid fa-star"></i>&ensp;${pizzeria.note}/10</p>
            <p class="date"><i class="fa-solid fa-calendar-days"></i>&ensp;${visitedDate}</p>
          </div>
          <div class="comment">
            <h3>On en pense quoi ?</h3>
            <div><span>👨‍💻</span><p><em>"${comRob}"</em></p></div>
            <div><span>👨‍🔧</span><p><em>"${comViks}"</em></p></div>
            <div><span>👩‍🎨</span><p><em>"${comCelia}"</em></p></div>
          </div>
        </div>
      </div>
    `;

    const pizzeriaDiv = document.createElement("div");
    pizzeriaDiv.className = "pizzeria";
    pizzeriaDiv.innerHTML = pizzeriaHTML;
    pizzeriasContainer.appendChild(pizzeriaDiv);
  });

  renderPaginationControls(pizzerias.length);
}

// Pagination logic
function paginatePizzerias(pizzerias) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return pizzerias.slice(startIndex, endIndex);
}

function renderPaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      currentPage = i;
      displayPizzerias(filteredPizzerias);
    });
    paginationContainer.appendChild(button);
  }
}

// Filtering logic
async function fetchPizzerias() {
  try {
    const response = await fetch(webAppUrl);
    if (!response.ok) throw new Error("Failed to fetch data");
    const pizzerias = await response.json();
    allPizzerias = pizzerias; // Store the full dataset
    filteredPizzerias = [...allPizzerias]; // Initialize filtered dataset

    populateFilterOptions(allPizzerias); // Populate filter dropdown dynamically
    displayPizzerias(filteredPizzerias); // Display the initial dataset
  } catch (error) {
    console.error("Error:", error);
    pizzeriasContainer.innerHTML = "<p>Petite erreur. Désolé !</p>";
  }
}

function populateFilterOptions(pizzerias) {
  const uniqueArrondissements = [...new Set(pizzerias.map(pizzeria => pizzeria.arrondissement))];
  uniqueArrondissements.sort(); // Sort the arrondissements for better UX

  // Clear existing options and add the "All" option
  filterDropdown.innerHTML = '<option value="all">Tous les arrondissements</option>';

  // Add unique arrondissements as options
  uniqueArrondissements.forEach(arrondissement => {
    const option = document.createElement("option");
    option.value = arrondissement;
    option.textContent = `${arrondissement}`; // Format as "690XX"
    filterDropdown.appendChild(option);
  });
}

filterDropdown.addEventListener("change", (event) => {
  const arrondissement = event.target.value;
  filteredPizzerias = filterPizzerias(allPizzerias, arrondissement);
  currentPage = 1; // Reset to the first page
  displayPizzerias(filteredPizzerias);
});

function filterPizzerias(pizzerias, arrondissement) {
  if (arrondissement === "all") return pizzerias;
  return pizzerias.filter(pizzeria => pizzeria.arrondissement === arrondissement);
}

/* Sorting logic
function sortPizzerias(pizzerias, criteria) {
  // Toggle the sorting order
  sortOrder[criteria] = sortOrder[criteria] === "desc" ? "asc" : "desc";

  if (criteria === "date") {
    return pizzerias.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder.date === "desc" ? dateB - dateA : dateA - dateB;
    });
  } else if (criteria === "note") {
    return pizzerias.sort((a, b) => {
      return sortOrder.note === "desc" ? b.note - a.note : a.note - b.note;
    });
  }
  return pizzerias;
} 

sortDropdown.addEventListener("change", (event) => {
  const criteria = event.target.value;
  filteredPizzerias = sortPizzerias(filteredPizzerias, criteria);
  displayPizzerias(filteredPizzerias);
}); */

// Fetch and display pizzerias when the page loads
fetchPizzerias();