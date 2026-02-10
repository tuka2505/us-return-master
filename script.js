/**
 * US Return Master - Core Logic (Ver 2.0)
 * Features: Dynamic Category Loading, Search Filter, Date Calculation
 * Dependencies: data.js (Must be loaded before this script)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const brandSearch = document.getElementById('brand-search');
    const brandSelect = document.getElementById('brand-select');
    const categoryGroup = document.getElementById('category-group');
    const categorySelect = document.getElementById('category-select');
    const categoryHelper = document.getElementById('category-helper');
    const categoryInfo = document.getElementById('category-info');
    const dateInput = document.getElementById('purchase-date');
    const calcBtn = document.getElementById('calculate-btn');
    const resultBox = document.getElementById('result-display');
    const retailerGrid = document.getElementById('retailer-grid');
    const suggestionsBox = document.getElementById('search-suggestions');

    // Result Elements
    const resDate = document.getElementById('res-date');
    const resDaysLeft = document.getElementById('res-days-left');
    const resPolicy = document.getElementById('res-policy');
    const resTip = document.getElementById('res-tip');
    const resRefund = document.getElementById('res-refund');

    let selectedBrandData = null;

    // ============================================
    // 1. Initialize & Populate Brands
    // ============================================
    function init() {
        // Set today's date as default
        dateInput.valueAsDate = new Date();
        populateBrandOptions(RETURN_DATA);
        renderRetailerGrid(RETURN_DATA);
        checkInputs();
    }

    function renderRetailerGrid(data) {
        if (!retailerGrid) return;

        const iconMap = {
            amazon: 'fa-brands fa-amazon',
            walmart: 'fa-solid fa-star',
            target: 'fa-solid fa-bullseye',
            costco: 'fa-solid fa-cart-shopping',
            ebay: 'fa-brands fa-ebay',
            temu: 'fa-solid fa-truck-fast',
            apple: 'fa-brands fa-apple',
            bestbuy: 'fa-solid fa-tag',
            homedepot: 'fa-solid fa-hammer',
            lowes: 'fa-solid fa-paint-roller',
            wayfair: 'fa-solid fa-couch',
            ikea: 'fa-solid fa-warehouse',
            nike: 'fa-solid fa-person-running',
            lululemon: 'fa-solid fa-spa',
            zara: 'fa-solid fa-shirt',
            hm: 'fa-solid fa-vest',
            shein: 'fa-solid fa-bag-shopping',
            nordstrom: 'fa-solid fa-crown',
            gap: 'fa-solid fa-socks',
            macys: 'fa-solid fa-star',
            tjmaxx: 'fa-solid fa-tags',
            ross: 'fa-solid fa-tag',
            marshalls: 'fa-solid fa-layer-group',
            homegoods: 'fa-solid fa-house-chimney',
            sephora: 'fa-solid fa-wand-magic-sparkles',
            ultabeauty: 'fa-solid fa-brush',
            kohls: 'fa-solid fa-store',
            chewy: 'fa-solid fa-paw',
            petco: 'fa-solid fa-dog',
            cvs: 'fa-solid fa-prescription-bottle',
            walgreens: 'fa-solid fa-plus',
            dicks: 'fa-solid fa-basketball'
        };

        retailerGrid.innerHTML = '';
        data.forEach((brand) => {
            const card = document.createElement('a');
            card.className = 'mini-card';
            card.href = `${brand.slug}.html`;

            const icon = document.createElement('i');
            icon.className = iconMap[brand.id] || 'fa-solid fa-store';

            const label = document.createElement('span');
            label.textContent = brand.name;

            card.appendChild(icon);
            card.appendChild(label);
            retailerGrid.appendChild(card);
        });
    }

    // Populate the dropdown with brands from data.js
    function populateBrandOptions(data) {
        brandSelect.innerHTML = '<option value="" disabled selected>Select a Store...</option>';
        data.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.textContent = brand.name;
            brandSelect.appendChild(option);
        });
    }

    // ============================================
    // 2. Search & Filter Logic
    // ============================================
    brandSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            clearBrandSelection();
            renderSuggestions([]);
            return;
        }

        const filtered = RETURN_DATA.filter(brand => 
            brand.name.toLowerCase().includes(query)
        );

        renderSuggestions(filtered);

        const exactMatch = RETURN_DATA.find(
            brand => brand.name.toLowerCase() === query
        );

        if (exactMatch) {
            selectBrand(exactMatch);
        } else {
            brandSelect.value = '';
            selectedBrandData = null;
            categoryGroup.style.display = 'none';
            categorySelect.innerHTML = '<option value="" disabled selected>Select Item Category...</option>';
            categoryHelper.textContent = '';
            checkInputs();
        }
    });

    brandSearch.addEventListener('focus', () => {
        const query = brandSearch.value.trim().toLowerCase();
        if (!query) return;
        const filtered = RETURN_DATA.filter(brand =>
            brand.name.toLowerCase().includes(query)
        );
        renderSuggestions(filtered);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-group')) {
            renderSuggestions([]);
        }
    });

    // ============================================
    // 3. Handle Brand Selection (Category Logic)
    // ============================================
    brandSelect.addEventListener('change', (e) => {
        handleBrandChange(e.target.value);
    });

    function handleBrandChange(brandId) {
        selectedBrandData = RETURN_DATA.find(b => b.id === brandId);
        
        if (!selectedBrandData) {
            checkInputs();
            return;
        }

        // Reset & Show Category Section
        categorySelect.innerHTML = '<option value="" disabled selected>Select Item Category...</option>';
        categoryGroup.style.display = 'block';
        categoryHelper.textContent = '';
        if (categoryInfo) {
            categoryInfo.textContent = '';
            categoryInfo.style.display = 'none';
        }
        resultBox.classList.add('hidden'); // Hide previous results

        // Populate Categories
        selectedBrandData.categories.forEach((cat, index) => {
            const option = document.createElement('option');
            option.value = index; // Use index to retrieve data later
            option.textContent = `${cat.label} (${formatDays(cat.days)})`;
            categorySelect.appendChild(option);
        });

        const fallbackOption = document.createElement('option');
        fallbackOption.value = 'not-sure';
        fallbackOption.textContent = 'I\'m not sure / Other categories';
        categorySelect.appendChild(fallbackOption);

        checkInputs();
    }

    function renderSuggestions(matches) {
        if (!suggestionsBox) return;

        if (!matches.length) {
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
            return;
        }

        suggestionsBox.innerHTML = matches
            .slice(0, 8)
            .map(match =>
                `<div class="suggestion-item" data-id="${match.id}">${match.name}</div>`
            )
            .join('');
        suggestionsBox.style.display = 'block';
    }

    function selectBrand(brand) {
        brandSearch.value = brand.name;
        brandSelect.value = brand.id;
        renderSuggestions([]);
        handleBrandChange(brand.id);
    }

    function clearBrandSelection() {
        brandSelect.value = '';
        selectedBrandData = null;
        categoryGroup.style.display = 'none';
        categorySelect.innerHTML = '<option value="" disabled selected>Select Item Category...</option>';
        categoryHelper.textContent = '';
        if (categoryInfo) {
            categoryInfo.textContent = '';
            categoryInfo.style.display = 'none';
        }
        checkInputs();
    }

    if (suggestionsBox) {
        suggestionsBox.addEventListener('click', (event) => {
            const item = event.target.closest('.suggestion-item');
            if (!item) return;
            const brand = RETURN_DATA.find(b => b.id === item.dataset.id);
            if (brand) {
                selectBrand(brand);
            }
        });
    }

    // Helper: Format day text for dropdown
    function formatDays(days) {
        if (days === 999) return "Lifetime";
        if (days === 0) return "Final Sale";
        if (days === -1) return "Case-by-case";
        return `${days} Days`;
    }

    // Handle Category Selection to show helper text
    categorySelect.addEventListener('change', (e) => {
        const catIndex = e.target.value;
        if (!selectedBrandData) {
            checkInputs();
            return;
        }

        if (catIndex === 'not-sure') {
            if (categoryInfo) {
                categoryInfo.textContent = "Select this if you can\u2019t find your item\u2019s category. The standard return policy will be applied.";
                categoryInfo.style.display = 'block';
            }
            categoryHelper.textContent = '';
            checkInputs();
            return;
        }

        const category = selectedBrandData.categories[catIndex];
        const helperText = category.helperText || category.description || category.examples || category.tip || '';

        if (categoryInfo) {
            categoryInfo.textContent = helperText;
            categoryInfo.style.display = helperText ? 'block' : 'none';
        }
        categoryHelper.textContent = '';
        checkInputs();
    });

    // ============================================
    // 4. Validation & Calculation
    // ============================================
    dateInput.addEventListener('change', checkInputs);

    function checkInputs() {
        if (brandSelect.value && categorySelect.value && dateInput.value) {
            calcBtn.disabled = false;
            calcBtn.style.opacity = "1";
            calcBtn.style.cursor = "pointer";
        } else {
            calcBtn.disabled = true;
            calcBtn.style.opacity = "0.5";
            calcBtn.style.cursor = "not-allowed";
        }
    }

    calcBtn.addEventListener('click', calculateDeadline);

    function calculateDeadline() {
        if (!selectedBrandData || !categorySelect.value || !dateInput.value) {
            checkInputs();
            return;
        }
        const catIndex = categorySelect.value === 'not-sure' ? 0 : categorySelect.value;
        const category = selectedBrandData.categories[catIndex];
        const purchaseDate = new Date(dateInput.value);
        const days = category.days;

        // 1. Handle Special Cases (Lifetime / Final Sale)
        if (days === 999) {
            displayResult("No Deadline (Lifetime)", "Forever", category);
            return;
        }
        if (days === 0) {
            displayResult("No Returns", "Final Sale", category);
            return;
        }
        if (days === -1) {
            displayResult("Varies", "Case-by-Case", category);
            return;
        }

        // 2. Standard Calculation
        const deadline = new Date(purchaseDate);
        deadline.setDate(purchaseDate.getDate() + days);

        // 3. Days Left Calculation
        const today = new Date();
        // Reset time to midnight for accurate day calc
        today.setHours(0,0,0,0);
        deadline.setHours(0,0,0,0);
        
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        displayResult(deadline.toDateString(), diffDays, category);
    }

    // ============================================
    // 5. Display Results
    // ============================================
    function displayResult(dateText, daysLeft, category) {
        resultBox.classList.remove('hidden');
        
        // Date Display
        resDate.textContent = dateText;

        // Days Left Logic
        if (typeof daysLeft === 'number') {
            if (daysLeft < 0) {
                resDaysLeft.textContent = `❌ Expired ${Math.abs(daysLeft)} days ago`;
                resDaysLeft.style.color = "red";
            } else if (daysLeft === 0) {
                resDaysLeft.textContent = "⚠️ Return by TODAY!";
                resDaysLeft.style.color = "orange";
            } else {
                resDaysLeft.textContent = `⏳ ${daysLeft} days left`;
                resDaysLeft.style.color = "#2ecc71";
            }
        } else {
            // Lifetime or Final Sale text
            resDaysLeft.textContent = daysLeft; 
            resDaysLeft.style.color = daysLeft === "Final Sale" ? "red" : "blue";
        }

        // Details
        resPolicy.textContent = `${category.label} (${formatDays(category.days)})`;
        resTip.textContent = category.tip || selectedBrandData.tip || "No specific tip available.";
        resRefund.textContent = `Store: ${selectedBrandData.refundInfo.inStore} | Mail: ${selectedBrandData.refundInfo.byMail}`;
    }

    // Run Initialization
    init();
});