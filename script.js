document.addEventListener('DOMContentLoaded', () => {
    const storeSelect = document.getElementById('store-select');
    const purchaseDateInput = document.getElementById('purchase-date');
    const calcBtn = document.getElementById('calc-btn');
    const resultDisplay = document.getElementById('result-display');

    // 1. data.js의 데이터를 드롭다운에 자동으로 채우기
    RETURN_DATA.forEach(store => {
        const option = document.createElement('option');
        option.value = store.id;
        option.textContent = store.name;
        storeSelect.appendChild(option);
    });

    // 2. 계산 버튼 클릭 이벤트
    calcBtn.addEventListener('click', () => {
        const selectedId = storeSelect.value;
        const dateValue = purchaseDateInput.value;

        if (!selectedId || !dateValue) {
            alert("Please select both a store and a date.");
            return;
        }

        const store = RETURN_DATA.find(s => s.id === selectedId);
        const purchaseDate = new Date(dateValue);
        const deadlineDate = new Date(purchaseDate);
        
        // 날짜 계산
        deadlineDate.setDate(purchaseDate.getDate() + store.standardDays);

        // 결과 출력
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deadlineDate.toLocaleDateString('en-US', options);

        resultDisplay.style.display = 'block';
        resultDisplay.innerHTML = `
            <h3 style="color: #d9534f; margin-bottom: 10px;">Return Deadline: ${formattedDate}</h3>
            <p><strong>Standard Policy:</strong> ${store.standardDays} Days</p>
            <p><strong>Important Exceptions:</strong> ${store.exceptions}</p>
            <p><strong>Holiday Rule:</strong> ${store.holiday}</p>
            <div style="margin-top: 15px; padding: 10px; background: #fff; border-radius: 5px; font-size: 0.9rem;">
                <strong>Pro Tip:</strong> ${store.tip}
            </div>
        `;
    });
});