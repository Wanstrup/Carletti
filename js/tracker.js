document.addEventListener("DOMContentLoaded", () => {

    const weightBox = document.querySelector(".weight-box");
    if (!weightBox) return;

    // --- Praline weights (from JSON)
    const pralineWeights = {
        "Milk chocolate cone": 8.5,
        "Dark chocolate cup": 10.0,
        "Marzipan ML SCHUBERT": 10.5,
        "Crispy toffee (bulk)": 10.0,
        "Almond chocolate": 8.0,
        "Double nougat": 9.2,
        "White frog": 11.5,
        "Milk chocolate with nougat filling frogs": 11.8,
        "White chocolate with nougat filling frogs": 11.6,
        "Mint frogs": 12.0,
        "Caramel frogs": 12.0,
        "Dark chocolate with mint filling praline": 13.6,
        "Crème brulée taste praline": 7.3,
        "Mint truffle in dark chocolate praline": 10.2,
        "Dark chocolate with mint filling": 9.0,
        "Rum taste truffle praline": 9.4,
        "Cherry praline": 11.0,
        "Orange truffle": 7.5,
        "Milk chocolate with toffee filling": 13.6,
        "Salty toffee praline": 9.3,
        "Toffee praline": 11.5,
        "Toffee praline ": 9.3,
        "Toffee praline  ": 8.5,
        "Twin hazelnut": 10.9,
        "Hazelnut nougat": 11.0,
        "Almond nougat": 8.2,
        "Hazelnut in milk chocolate": 8.7,
        "Coconut": 11.0,
        "White tear shape praline": 8.2,
        "Cappuccino praline": 8.2,
        "Milky praline": 8.8,
        "Crunchy hazelnut": 11.0,
        "White heart J - Lemon taste": 10.2,
        "Milk chocolate with strawberry-yoghurt filling": 10.2,
        "White chocolate with strawberry-yoghurt filling": 10.2,
        "Dubai style praline": 9.1
    };

    // Packaging limits
    const packagingCaps = {
        giftbox: { small: 24, medium: 36, large: 64 },
        box: { small: 135, medium: 400 },
        bag: { small: 100, medium: 350, large: 1800 }
    };

    function calculateTotals() {
        let pralineCount = 0;
        let gramTotal = 0;

        document.querySelectorAll(".praline-card").forEach(card => {
            const name = card.querySelector("h4").textContent.trim();
            const count = parseInt(card.querySelector(".count").textContent, 10);

            pralineCount += count;
            gramTotal += count * (pralineWeights[name] || 0);
        });

        return { pralineCount, gramTotal };
    }

    function getMax() {
        const pg = window.config?.selectedPackaging;
        const size = window.config?.selectedSize;

        if (!pg || !size) return null;

        if (pg === "giftbox") return packagingCaps.giftbox[size];
        if (pg === "box") return packagingCaps.box[size];
        if (pg === "bag") return packagingCaps.bag[size];

        return null;
    }

    function updateTracker() {
        const pg = window.config?.selectedPackaging;
        const size = window.config?.selectedSize;

        if (!pg || !size) {
            weightBox.textContent = "0 of x g";
            return;
        }

        const { pralineCount, gramTotal } = calculateTotals();
        const max = getMax();

        if (pg === "giftbox") {
            weightBox.textContent = `${pralineCount} of ${max}`;
        } else {
            weightBox.textContent = `${gramTotal.toFixed(1)} of ${max} g`;
        }

        lockPlusButtons();
    }

    function lockPlusButtons() {
        const pg = window.config?.selectedPackaging;
        const size = window.config?.selectedSize;
        const max = getMax();

        if (!pg || !size) return;

        const { pralineCount, gramTotal } = calculateTotals();

        document.querySelectorAll(".praline-card").forEach(card => {
            const name = card.querySelector("h4").textContent.trim();
            const count = parseInt(card.querySelector(".count").textContent, 10);
            const weight = pralineWeights[name] || 0;

            const plusBtn = card.querySelector(".plus");

            // Check what would happen if we add ONE MORE
            const nextPralineCount = pralineCount + 1;
            const nextGramTotal = gramTotal + weight;

            let lock = false;

            if (pg === "giftbox") {
                if (nextPralineCount > max) lock = true;
            } else {
                if (nextGramTotal > max) lock = true;
            }

            plusBtn.disabled = lock;
            plusBtn.classList.toggle("locked", lock);
        });
    }

    // Listen to plus/minus clicks
    document.addEventListener("click", e => {
        if (e.target.closest(".plus") || e.target.closest(".minus")) {
            setTimeout(updateTracker, 10);
        }
    });

    // Packaging changed event
    document.addEventListener("packagingChanged", updateTracker);

    // Initial
    updateTracker();
});
