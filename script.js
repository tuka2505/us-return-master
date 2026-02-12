/**
 * US Return Master - Core Logic (Final Apple Style)
 * Features: Apple-style Combo Box, Business Day Calculation, Smooth UI
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const brandSearch = document.getElementById('brand-search');
    const brandToggle = document.getElementById('brand-toggle'); // The arrow icon div
    const suggestionsBox = document.getElementById('search-suggestions');
    const brandSelect = document.getElementById('brand-select'); // Hidden logic select

    const categoryGroup = document.getElementById('category-group');
    const categorySelect = document.getElementById('category-select');
    const categoryInfo = document.getElementById('category-info');
    const categoryHelper = document.getElementById('category-helper');

    const dateInput = document.getElementById('purchase-date');
    const calcBtn = document.getElementById('calculate-btn');
    
    const resultBox = document.getElementById('result-display');
    const retailerGrid = document.getElementById('retailer-grid');

    // Result Elements
    const resDaysMessage = document.getElementById('res-days-message');
    const resDeadlineDate = document.getElementById('res-deadline-date');
    const resRefundDate = document.getElementById('res-refund-date');
    const resPolicyName = document.getElementById('res-policy-name');
    const resRefundMethod = document.getElementById('res-refund-method');
    const resProgressBar = document.getElementById('res-progress-bar');
    const resProgressLabel = document.getElementById('res-progress-label');
    const viewPolicyBtn = document.getElementById('view-policy-btn');

    let selectedBrandData = null;

    // --- 1. Initialization ---
    function init() {
        // Set today as default
        dateInput.valueAsDate = new Date();
        renderRetailerGrid(RETURN_DATA);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!brandSearch.contains(e.target) && !brandToggle.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.style.display = 'none';
            }
        });
        
        checkInputs();
    }

    // --- 2. Search & Dropdown Logic (Apple Style) ---
    
    // Toggle dropdown on arrow click
    brandToggle.addEventListener('click', () => {
        if (suggestionsBox.style.display === 'block') {
            suggestionsBox.style.display = 'none';
        } else {
            // Show all brands if input is empty, otherwise filter
            const query = brandSearch.value.trim().toLowerCase();
            const matches = query 
                ? RETURN_DATA.filter(b => b.name.toLowerCase().includes(query)) 
                : RETURN_DATA;
            renderSuggestions(matches);
            brandSearch.focus();
        }
    });

    // Filter on typing
    brandSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        // Reset if empty
        if (!query) {
            selectedBrandData = null;
            categoryGroup.style.display = 'none';
            resultBox.style.display = 'none';
            renderSuggestions(RETURN_DATA); // Show all
            return;
        }

        const matches = RETURN_DATA.filter(b => b.name.toLowerCase().includes(query));
        renderSuggestions(matches);
    });

    // Focus opens dropdown
    brandSearch.addEventListener('focus', () => {
        const query = brandSearch.value.trim().toLowerCase();
        const matches = query 
            ? RETURN_DATA.filter(b => b.name.toLowerCase().includes(query)) 
            : RETURN_DATA;
        renderSuggestions(matches);
    });

    function renderSuggestions(matches) {
        if (!matches.length) {
            suggestionsBox.innerHTML = '<div class="suggestion-item" style="cursor:default; color:#999;">No stores found</div>';
            suggestionsBox.style.display = 'block';
            return;
        }

        suggestionsBox.innerHTML = matches
            .map(brand => `<div class="suggestion-item" data-id="${brand.id}">${brand.name}</div>`)
            .join('');
        
        suggestionsBox.style.display = 'block';

        // Add click listeners to items
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const brandId = item.dataset.id;
                selectBrand(brandId);
            });
        });
    }

    function selectBrand(brandId) {
        const brand = RETURN_DATA.find(b => b.id === brandId);
        if (!brand) return;

        selectedBrandData = brand;
        brandSearch.value = brand.name;
        suggestionsBox.style.display = 'none';
        
        // Reset next steps
        categorySelect.innerHTML = '<option value="" disabled selected>What did you buy?</option>';
        categoryGroup.style.display = 'block';
        resultBox.style.display = 'none';
        
        // Populate Categories
        brand.categories.forEach((cat, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${cat.name} (${formatDays(cat.days)})`;
            categorySelect.appendChild(option);
        });

        // Add "Not Sure" option
        const fallback = document.createElement('option');
        fallback.value = 'not-sure';
        fallback.textContent = "I'm not sure / Other";
        categorySelect.appendChild(fallback);

        checkInputs();
    }

    // --- 3. Category & Inputs ---
    
    categorySelect.addEventListener('change', () => {
        checkInputs();
        
        // Helper Text Logic
        if (categorySelect.value === 'not-sure') {
            categoryInfo.textContent = "We'll apply the standard return policy.";
            categoryInfo.style.display = 'block';
            return;
        }

        const catIdx = Number(categorySelect.value);
        if (selectedBrandData && selectedBrandData.categories[catIdx]) {
            const cat = selectedBrandData.categories[catIdx];
            const info = cat.helperText || cat.description || cat.tip;
            if (info) {
                categoryInfo.textContent = info;
                categoryInfo.style.display = 'block';
            } else {
                categoryInfo.style.display = 'none';
            }
        }
    });

    dateInput.addEventListener('change', checkInputs);

    function checkInputs() {
        if (selectedBrandData && categorySelect.value && dateInput.value) {
            calcBtn.disabled = false;
        } else {
            calcBtn.disabled = true;
        }
    }

    // --- 4. Calculation Logic (The Brain) ---
    
    calcBtn.addEventListener('click', () => {
        if (!selectedBrandData) return;

        // 1. Get Category Data
        let category;
        if (categorySelect.value === 'not-sure') {
            // Default to first category (usually standard)
            category = selectedBrandData.categories[0]; 
        } else {
            category = selectedBrandData.categories[Number(categorySelect.value)];
        }

        const purchaseDate = new Date(dateInput.value);
        const limitDays = category.days;
        
        // 2. Calculate Final Deadline
        let deadlineDate;
        let daysLeft;
        let isLifetime = false;
        let isFinalSale = false;

        if (limitDays >= 9999) {
            isLifetime = true;
            daysLeft = "Lifetime";
        } else if (limitDays === 0) {
            isFinalSale = true;
            daysLeft = 0;
        } else {
            deadlineDate = new Date(purchaseDate);
            deadlineDate.setDate(purchaseDate.getDate() + limitDays);
            
            // Days Left Calc
            const today = new Date();
            today.setHours(0,0,0,0);
            const dDate = new Date(deadlineDate);
            dDate.setHours(0,0,0,0);
            
            const diffTime = dDate - today;
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        // 3. Calculate Refund Date (Business Days)
        // Check if refund_days exists in data, else default to 5
        const refundDays = (selectedBrandData.refund_days !== undefined) ? selectedBrandData.refund_days : 5;
        const estimatedRefund = addBusinessDays(new Date(), refundDays);

        // 4. Render Results
        renderDashboard(daysLeft, deadlineDate, estimatedRefund, category, isLifetime, isFinalSale, limitDays, purchaseDate);
    });

    function renderDashboard(daysLeft, deadline, refundDate, category, isLifetime, isFinalSale, totalDays, purchaseDate) {
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');

        // A. Main Hero Text
        if (isLifetime) {
            resDaysMessage.textContent = "No Deadline";
            resDaysMessage.style.color = "#0071e3"; // Blue
            resDeadlineDate.textContent = "Forever";
        } else if (isFinalSale) {
            resDaysMessage.textContent = "No Returns";
            resDaysMessage.style.color = "#ff3b30"; // Red
            resDeadlineDate.textContent = "Final Sale";
        } else {
            if (daysLeft < 0) {
                resDaysMessage.textContent = `Expired (${Math.abs(daysLeft)} days ago)`;
                resDaysMessage.style.color = "#ff3b30";
            } else if (daysLeft === 0) {
                resDaysMessage.textContent = "Due Today!";
                resDaysMessage.style.color = "#ff9f0a"; // Orange
            } else {
                resDaysMessage.textContent = `${daysLeft} Days Left`;
                resDaysMessage.style.color = daysLeft <= 7 ? "#ff9f0a" : "#0071e3";
            }
            resDeadlineDate.textContent = formatDate(deadline);
        }

        // B. Refund Date
        resRefundDate.textContent = formatDate(refundDate);
        
        // C. Policy & Method
        resPolicyName.textContent = `${category.name}`;
        resRefundMethod.textContent = selectedBrandData.refund_method || "Original Payment";

        // D. Progress Bar
        updateProgressBar(daysLeft, totalDays);

        // E. Link Button
        if (selectedBrandData.slug) {
            viewPolicyBtn.href = normalizePolicyPath(selectedBrandData.slug);
            viewPolicyBtn.style.display = 'flex';
            viewPolicyBtn.innerHTML = `View Full ${selectedBrandData.name} Policy <i class="fa-solid fa-arrow-right"></i>`;
        } else {
            viewPolicyBtn.style.display = 'none';
        }

        // Smooth Scroll to result
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // --- Helpers ---

    function updateProgressBar(daysLeft, totalDays) {
        if (typeof daysLeft !== 'number') {
            resProgressBar.style.width = '100%';
            resProgressBar.className = 'progress-bar progress-safe';
            return;
        }

        if (daysLeft < 0) {
            resProgressBar.style.width = '100%';
            resProgressBar.className = 'progress-bar progress-urgent';
            return;
        }

        const elapsed = Math.max(0, totalDays - daysLeft);
        const percent = Math.min(100, Math.round((elapsed / totalDays) * 100));
        
        resProgressBar.style.width = `${percent}%`;
        
        if (daysLeft <= 3) {
            resProgressBar.className = 'progress-bar progress-urgent'; // Red
        } else if (daysLeft <= 10) {
            resProgressBar.className = 'progress-bar progress-caution'; // Orange
        } else {
            resProgressBar.className = 'progress-bar progress-safe'; // Green
        }
    }

    function addBusinessDays(date, days) {
        let count = 0;
        let current = new Date(date);
        while (count < days) {
            current.setDate(current.getDate() + 1);
            const day = current.getDay();
            if (day !== 0 && day !== 6) { // Skip Sun(0) and Sat(6)
                count++;
            }
        }
        return current;
    }

    function formatDate(dateObj) {
        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function formatDays(d) {
        if (d >= 9999) return "Lifetime";
        if (d === 0) return "No Returns";
        return `${d} Days`;
    }

    function normalizePolicyPath(slug) {
        if (!slug) return '#';
        const normalized = slug.startsWith('stores/') ? slug : `stores/${slug}`;
        return normalized.endsWith('.html') ? normalized : `${normalized}.html`;
    }

    // Render Bottom Grid
    function renderRetailerGrid(data) {
        if (!retailerGrid) return;
        retailerGrid.innerHTML = '';
        data.forEach(brand => {
            const a = document.createElement('a');
            a.className = 'mini-card';
            a.href = normalizePolicyPath(brand.slug);
            
            // Simple Icon Logic (You can expand this map)
            let iconClass = 'fa-solid fa-store';
            if (brand.id === 'amazon') iconClass = 'fa-brands fa-amazon';
            if (brand.id === 'apple') iconClass = 'fa-brands fa-apple';
            if (brand.id === 'walmart') iconClass = 'fa-solid fa-star';
            if (brand.id === 'target') iconClass = 'fa-solid fa-bullseye';
            if (brand.id === 'costco') iconClass = 'fa-solid fa-cart-shopping';
            
            a.innerHTML = `<i class="${iconClass}"></i><span>${brand.name}</span>`;
            retailerGrid.appendChild(a);
        });
    }

    // Run Init
    init();
});