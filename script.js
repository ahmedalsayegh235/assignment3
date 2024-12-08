// Function to get data from api
const fetchData = async () => {
    const apiUrl = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";
    try {
      console.log("Fetching data...");
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      //debug
      console.log("Fetched Data:", data); 
      // JSON response key is "results"
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  };
  
  // Function to add data to table
  const populateTable = (results) => {
    const tableBody = document.querySelector("#data-table tbody");
    //remove existing tables
    tableBody.innerHTML = ""; 
  
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.nationality || "N/A"}</td>
        <td>${result.colleges || "N/A"}</td>
        <td>${result.the_programs || "N/A"}</td>
        <td>${result.year || "N/A"}</td>
        <td>${result.semester || "N/A"}</td>
        <td>${result.number_of_students || "N/A"}</td>
      `;
      tableBody.appendChild(row);
    });
  
    // show table and hide loading
    document.getElementById("data-table").style.display = "table";
    document.getElementById("loading").style.display = "none";
  };
  
  // for errors
  const showError = () => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
  };
  
  // Fetch data and add to the table on load
  fetchData()
    .then((data) => {
      if (data) populateTable(data);
    })
    .catch(() => {
      showError();
    });
  