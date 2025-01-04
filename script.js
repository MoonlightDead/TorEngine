const JACKETT_API_URL = "https://crossorigin.me/http://217.196.99.51:9117/api/v2.0/indexers/all/results";
const API_KEY = "eitzmnqozcot9i3p7lb4c507q6z229el";

let results = [];
let animationInterval; 

document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = document.getElementById("query").value;
    const resultsDiv = document.getElementById("results");

    startLoadingAnimation(resultsDiv); 

    try {
        const response = await fetch(`${JACKETT_API_URL}?apikey=${API_KEY}&Query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Ошибка запроса");

        const data = await response.json();
        results = data.Results || [];

        results = sortResults(results);

        clearLoadingAnimation(resultsDiv); 
        displayResults(results);
    } catch (error) {
        clearLoadingAnimation(resultsDiv); 
        resultsDiv.innerHTML = `<p>Произошла ошибка: ${error.message}</p>`;
    }
});

document.querySelector(".search-icon").addEventListener("click", () => {
    document.getElementById("search-form").dispatchEvent(new Event("submit"));
});

function startLoadingAnimation(element) {
    let dots = 0;
    element.innerHTML = "<p>Поиск</p>"; 

    // Запускаем анимацию
    animationInterval = setInterval(() => {
        dots = (dots + 1) % 4; 
        element.innerHTML = `<p>Поиск${'.'.repeat(dots)}</p>`; 
    }, 350); 
}

function clearLoadingAnimation(element) {
    clearInterval(animationInterval); 
    element.innerHTML = ""; 
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>Ничего не найдено.</p>";
    } else {
        resultsDiv.innerHTML = results
            .map(result => {
                const downloadLink = result.Link ? result.Link : `magnet:?xt=urn:btih:${result.Guid}`;
                const buttonText = result.Link ? "Скачать" : "Magnet";

                return `
                    <div class="result">
                        <div class="result-left">
                            <div class="tracker">${result.Tracker || "Unknown Tracker"}</div>
                            <div class="title">
                                <a href="${result.Details}" target="_blank" class="result-title-link">
                                    <h3>${result.Title}</h3>
                                </a>
                            </div>
                            <div class="size">${formatSize(result.Size)}</div>
                            <div class="download">
                                <a href="${downloadLink}" target="_blank" class="download-button">
                                    ${buttonText}
                                </a>
                            </div>
                        </div>
                        <div class="result-right">
                            <div class="peers-seeders">
                                ▲${result.Seeders || 0}&nbsp;&nbsp;▼${result.Peers || 0}
                            </div>
                        </div>
                    </div>
                `;
            })
            .join("");
    }
}

function sortResults(results) {
    const sortBySize = document.getElementById("sort-by-size").checked;
    const sortBySeeders = document.getElementById("sort-by-seeders").checked;

    if (sortBySize) {
        return results.sort((a, b) => b.Size - a.Size);
    } else if (sortBySeeders) {
        return results.sort((a, b) => b.Seeders - a.Seeders);
    }
    return results;
}

function formatSize(size) {
    if (!size) return "N/A";
    const units = ["KB", "MB", "GB", "TB"];
    let unitIndex = -1;
    do {
        size /= 1024;
        unitIndex++;
    } while (size > 1024 && unitIndex < units.length - 1);
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

document.querySelectorAll('input[name="sort"]').forEach(input => {
    input.addEventListener("change", () => {
        if (results.length > 0) {
            const sortedResults = sortResults(results);
            displayResults(sortedResults);
        }
    });
});

const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = "flex";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
