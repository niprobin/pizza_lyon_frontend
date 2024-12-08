document.addEventListener("DOMContentLoaded", function() {
    const url = "https://raw.githubusercontent.com/niprobin/pizzalyon/main/pizzeria.json";  // Replace with your actual GitHub URL
    const pizzeriasList = document.getElementById("pizzerias-list");
  
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
  });
  