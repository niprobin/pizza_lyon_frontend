  document.addEventListener("DOMContentLoaded", function() {
    const url = "https://raw.githubusercontent.com/niprobin/pizzalyon/main/pizzeria.json";  // Update with your GitHub URL
    const pizzeriasList = document.getElementById("pizzerias-list");
  
    // Function to fetch and display the data
    function fetchData() {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          let html = "";
          data.forEach(pizzeria => {
            html += `
              <div class="pizzeria">
              <h2>${pizzeria.name}</h2>
              <p><strong>Notre note :</strong> ${pizzeria.rating}/5</p><br>
              <p><strong>Leur adresse:</strong> ${pizzeria.address}</p><br>
              <p>${pizzeria.comment}</p>
            </div>
            `;
          });
          pizzeriasList.innerHTML = html;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          pizzeriasList.innerHTML = "<p>Sorry, we couldn't load the pizzeria data at the moment.</p>";
        });
    }
  
    // Initial data fetch
    fetchData();
  
    // Fetch data every 30 seconds
    setInterval(fetchData, 30000); // 30 seconds
  });
  
  