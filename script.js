document.addEventListener('DOMContentLoaded', () => {
    const storeSelect = document.getElementById('store-select');
    const purchaseDateInput = document.getElementById('purchase-date');
    const calcBtn = document.getElementById('calc-btn');
    const resultDisplay = document.getElementById('result-display');

    // 1. 드롭다운 메뉴 자동 생성
    RETURN_DATA.forEach(store => {
        const option = document.createElement('option');
        option.value = store.id;
        option.textContent = store.name;
        storeSelect.appendChild(option);
    });

    // 2. 날짜 계산 헬퍼 함수
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const calculateRefundDate = (daysStr) => {
        if (!daysStr || daysStr === "N/A") return "Not Available";
        if (daysStr.toLowerCase().includes("immediate")) return "Instant / Today";

        const today = new Date();
        const dayRange = daysStr.match(/\d+/g);
        
        if (dayRange) {
            const minDays = parseInt(dayRange[0]);
            const maxDays = dayRange[1] ? parseInt(dayRange[1]) : minDays;
            
            const minDate = new Date();
            minDate.setDate(today.getDate() + minDays);
            const maxDate = new Date();
            maxDate.setDate(today.getDate() + maxDays);

            return `${formatDate(minDate)} ~ ${formatDate(maxDate)}`;
        }
        return daysStr;
    };

    // 3. 계산 버튼 클릭 이벤트
    calcBtn.addEventListener('click', () => {
        const selectedId = storeSelect.value;
        const dateValue = purchaseDateInput.value;

        if (!selectedId || !dateValue) {
            alert("Please select both a store and a purchase date.");
            return;
        }

        const store = RETURN_DATA.find(s => s.id === selectedId);
        const purchaseDate = new Date(dateValue);
        const deadlineDate = new Date(purchaseDate);
        
        // 반품 마감일 계산
        deadlineDate.setDate(purchaseDate.getDate() + store.standardDays);

        // 결과창 활성화 및 HTML 생성
        resultDisplay.style.display = 'block';
        resultDisplay.innerHTML = `
            <div class="result-header">
                <i class="fa-solid fa-calendar-check"></i>
                <h3>Return Deadline: <span>${formatDate(deadlineDate)}</span></h3>
            </div>

            <div class="refund-roadmap">
                <h4><i class="fa-solid fa-money-bill-trend-up"></i> Expected Refund Timeline</h4>
                <p class="roadmap-desc">If you initiate your return <strong>Today</strong>, here is when you'll get your money back:</p>
                
                <div class="path-container">
                    <div class="path-item">
                        <span class="path-label"><i class="fa-solid fa-store"></i> In-Store Return</span>
                        <span class="path-date">${calculateRefundDate(store.refundInStore)}</span>
                    </div>
                    <div class="path-item">
                        <span class="path-label"><i class="fa-solid fa-truck-fast"></i> By Mail Return</span>
                        <span class="path-date">${calculateRefundDate(store.refundByMail)}</span>
                    </div>
                </div>
            </div>

            <div class="policy-details">
                <p><strong>Standard Policy:</strong> ${store.standardDays} Days</p>
                <p><strong>Exceptions:</strong> ${store.exceptions}</p>
                <p><strong>Holiday Rule:</strong> ${store.holiday}</p>
            </div>

            <div class="pro-tip-box">
                <strong><i class="fa-solid fa-lightbulb"></i> Expert Tip:</strong> ${store.tip}
            </div>

            <div style="margin-top: 25px; text-align: center;">
                <a href="${store.slug}.html" class="calc-btn" style="display: inline-block; text-decoration: none; background: #000; color: #fff; padding: 12px 25px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                    View Full ${store.name} Policy Guide <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
                </a>
            </div>
        `;
        
        // 결과창으로 부드럽게 스크롤 이동
        resultDisplay.scrollIntoView({ behavior: 'smooth' });
    });
});