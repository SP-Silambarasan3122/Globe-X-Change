const rates = {
    USD: 1,
    INR: 83.0,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 157.0,
    CAD: 1.36,
    AUD: 1.51,
    CHF: 0.90,
    SGD: 1.35,
    AED: 3.67
};
 
const currencyNames = {
    USD: "US Dollar",
    INR: "Indian Rupee",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    SGD: "Singapore Dollar",
    AED: "UAE Dirham"
};
 
const currencies = Object.keys(rates);
 
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const historyList = document.getElementById("historyList");
const ratesTableBody = document.getElementById("ratesTableBody");
 
function populateCurrencies() {
    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = `${currency} - ${currencyNames[currency]}`;
        fromCurrency.appendChild(option1);
 
          const option2 = document.createElement("option");
          option2.value = currency;
          option2.textContent = `${currency} - ${currencyNames[currency]}`;
          toCurrency.appendChild(option2);
    });
 
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}
 
function validateAmount(amount) {
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return false;
    }
    return true;
}
 
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
 
    if (!validateAmount(amount)) {
        return;
    }
 
    const amountInUSD = amount / rates[from];
    const convertedAmount = amountInUSD * rates[to];
 
    const exchangeRate = rates[to] / rates[from];
 
    result.textContent =
        `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
 
    rateInfo.textContent =
        `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;
 
    saveHistory({
        amount,
        from,
        to,
        convertedAmount: Number(convertedAmount.toFixed(2)),
        time: new Date().toLocaleString()
    });
 
    renderHistory();
}
 
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
 
    if (amountInput.value) {
        convertCurrency();
    }
}
 
function saveHistory(entry) {
    let history =
        JSON.parse(localStorage.getItem("conversionHistory")) || [];
 
    history.unshift(entry);
    history = history.slice(0, 5);
 
    localStorage.setItem(
        "conversionHistory",
        JSON.stringify(history)
    );
}
 
function renderHistory() {
    const history =
        JSON.parse(localStorage.getItem("conversionHistory")) || [];
 
    if (history.length === 0) {
        historyList.innerHTML =
            '<p class="empty">No conversions yet.</p>';
        return;
    }
 
    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <strong>
                 ${item.amount} ${item.from} → ${item.convertedAmount} ${item.to}
            </strong>
            <small>${item.time}</small>
        </div>
    `).join("");
}
 
function clearHistory() {
    localStorage.removeItem("conversionHistory");
    renderHistory();
}
 
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
 
    const isDarkMode =
        document.body.classList.contains("dark-mode");
 
    localStorage.setItem("darkMode", isDarkMode);
    updateThemeButton();
}
 
function updateThemeButton() {
    const button = document.getElementById("darkModeBtn");
    const isDarkMode =
        document.body.classList.contains("dark-mode");
 
    button.textContent = isDarkMode
        ? "☀ Light Mode"
        : "☀ Dark Mode";
}
 
function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
 
    updateThemeButton();
}
 
function renderRatesTable() {
    ratesTableBody.innerHTML = currencies.map(currency => `
        <tr>
             <td><strong>${currency}</strong></td>
             <td>${currencyNames[currency]}</td>
             <td>${rates[currency].toFixed(2)}</td>
        </tr>
    `).join("");
}
 
document.getElementById("convertBtn")
    .addEventListener("click", convertCurrency);
 
document.getElementById("swapBtn")
    .addEventListener("click", swapCurrencies);
 
document.getElementById("clearHistoryBtn")
    .addEventListener("click", clearHistory);
 
document.getElementById("darkModeBtn")
    .addEventListener("click", toggleDarkMode);
 
amountInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        convertCurrency();
    }
});
 
populateCurrencies();
renderRatesTable();
renderHistory();
loadDarkMode();
