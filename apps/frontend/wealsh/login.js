function simulateLogin() {
    // Get references to the input fields
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Get references to the display containers
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content-wrapper');

    // ************* NEW VALIDATION LOGIC *************
    // Check if both fields actually have a value inputted
    if (emailInput.value && passwordInput.value) {
        // If they do, proceed with the login (simulation)
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Optional: Smooth scroll to the top of the newly displayed main content
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
        // If either field is empty, show an alert message and do not log in
        alert('Please enter both your email address and password to log in.');
    }
}

function simulateLogout() {
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content-wrapper');
    
    mainContent.style.display = 'none';
    // Use 'flex' to re-center the login box when it reappears
    loginContainer.style.display = 'flex'; 

    // Clear inputs for next login attempt
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Scroll back to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Data sourced from today's market data search results
const marketData = {
    spx: { price: '6,841.05', change: '-0.07%' },
    djia: { price: '47,564.97', change: '-0.36%' },
    btc: { price: '90,101.26', change: '-1.63%' }
};

// PFM Data Specification
const pfmSpec = {
  // ... (pfmSpec object remains the same as previous response) ...
  "title": "Monthly Spending Breakdown (USD)",
  "data": {
    "values": [
      {"Category": "Housing", "Amount": 1500},
      {"Category": "Groceries", "Amount": 600},
      {"Category": "Utilities", "Amount": 300},
      {"Category": "Dining Out", "Amount": 250},
      {"Category": "Transport", "Amount": 200}
    ]
  },
  "mark": {"type": "arc", "outerRadius": 120, "innerRadius": 70},
  "encoding": {
    "theta": {"field": "Amount", "type": "quantitative"},
    "color": {"field": "Category", "type": "nominal", "scale": {"range": ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#AA66CC"]}},
    "tooltip": [
      {"field": "Category", "type": "nominal"},
      {"field": "Amount", "type": "quantitative", "format": "$.2f"}
    ]
  }
};


function updateMarketWidget() {
    if (document.getElementById('spx-price')) {
        document.getElementById('spx-price').textContent = `$${marketData.spx.price}`;
        document.getElementById('djia-price').textContent = `$${marketData.djia.price}`;
        document.getElementById('btc-price').textContent = `$${marketData.btc.price}`;
    }
}

function renderPfmChart() {
    if (document.getElementById('pfm-chart') && typeof vegaEmbed !== 'undefined') {
        vegaEmbed('#pfm-chart', pfmSpec);
    }
}

// ************* NEW THEME TOGGLE LOGIC *************

// 1. Function to set the theme based on local storage
function setThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('wealshBankTheme') || 'light'; // Default to light
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 2. Function to toggle the theme when the button is clicked
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('wealshBankTheme', newTheme); // Save preference
}

// 3. Set the theme immediately when the script loads (prevents flash of incorrect theme)
setThemeFromLocalStorage();

// ************* END NEW THEME TOGGLE LOGIC *************


function simulateLogin() {
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content-wrapper');

    if (emailInput.value && passwordInput.value) {
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
        
        updateMarketWidget(); 
        renderPfmChart();

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
        alert('Please enter both your username and password to log in.');
    }
}

function simulateLogout() {
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content-wrapper');
    
    mainContent.style.display = 'none';
    loginContainer.style.display = 'flex'; 

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
