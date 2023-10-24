const resultsPerPage = 5; // Number of results per page
let currentPage = 1; // Current page
let data = []; // Data fetched from an external JSON file

// Fetch data from an external JSON file (you can host it online)
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function search() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const results = data.filter(document => document.toLowerCase().includes(query));
    displayResults(results, currentPage);
}

function clearResults() {
    document.getElementById("search-results").innerHTML = "";
    document.getElementById("pagination").innerHTML = "";
}

function displayResults(results, page) {
    const resultsContainer = document.getElementById("search-results");
    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = results.slice(start, end);
    
    resultsContainer.innerHTML = "";

    if (paginatedResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
        paginatedResults.forEach((result, index) => {
            const resultElement = document.createElement("div");
            resultElement.textContent = `${index + 1}. ${result}`;
            resultsContainer.appendChild(resultElement);
        });

        displayPagination(results.length);
    }
}

function displayPagination(totalResults) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.textContent = i;
            pageLink.href = "#";
            pageLink.addEventListener("click", () => {
                currentPage = i;
                search();
            });
            paginationContainer.appendChild(pageLink);
        }
    }
}
