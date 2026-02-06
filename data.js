const RETURN_DATA = [
    {
        id: "amazon",
        name: "Amazon",
        standardDays: 30,
        exceptions: "Electronics & Apple products (15 days), Amazon Renewed (90 days).",
        holiday: "Items bought Nov 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Most items have free return drop-offs at Kohl's or Whole Foods without a box!"
    },
    {
        id: "walmart",
        name: "Walmart",
        standardDays: 90,
        exceptions: "Electronics (15 days), Major Appliances (2 days), Post-paid Phones (14 days).",
        holiday: "Purchases made Oct 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Use the Walmart app to store your receipts digitally; it makes returns 10x faster."
    },
    {
        id: "target",
        name: "Target",
        standardDays: 90,
        exceptions: "Electronics & Apple (15 days), Target Brands (365 days).",
        holiday: "30-day clock for electronics starts on Dec 26; return by Jan 24, 2026.",
        tip: "RedCard holders get an additional 30 days on top of the standard policy."
    },
    {
        id: "homedepot",
        name: "Home Depot",
        standardDays: 90,
        exceptions: "Furniture/Gas Equipment (30 days), Major Appliances (48 hours for damage).",
        holiday: "No specific extension; standard 90-day policy usually covers holiday gifts.",
        tip: "Keep the original packaging for gas-powered items, or they may deny the return."
    },
    {
        id: "costco",
        name: "Costco",
        standardDays: 365,
        exceptions: "Electronics, TVs, Computers (90 days), Diamonds 1ct+ (Verification needed).",
        holiday: "No extension needed as most items have a lifetime return policy.",
        tip: "You don't need a receipt if you have your membership card. They track everything."
    },
    {
        id: "bestbuy",
        name: "Best Buy",
        standardDays: 14,
        exceptions: "Major Appliances (15 days), Activatable Devices (14 days + $45 fee).",
        holiday: "Purchases Oct 27 - Dec 31 can be returned until Jan 13, 2026.",
        tip: "My Best Buy Plus/Total members get an extended 60-day return window."
    },
    {
        id: "macys",
        name: "Macy's",
        standardDays: 30,
        exceptions: "Fine Jewelry & Watches (30 days), Last Act items (Final sale/No return).",
        holiday: "Purchases Oct 6 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Mail-in returns cost $9.99 for non-members. Return in-store to save that fee!"
    },
    {
        id: "apple",
        name: "Apple Store",
        standardDays: 14,
        exceptions: "Standard 14 days for all hardware. Items must be in original condition.",
        holiday: "Items received between Nov 8 - Dec 25 can be returned until Jan 8, 2026.",
        tip: "Apple's policy is strict. Start your online return before the 14th day ends."
    },
    {
        id: "lowes",
        name: "Lowe's",
        standardDays: 90,
        exceptions: "Major Appliances & Outdoor Power Equipment (30 days).",
        holiday: "Standard 90-day policy applies. Use MyLowe's Rewards for digital receipts.",
        tip: "Commercial account holders often get a full 365 days for most returns."
    },
    {
        id: "kohls",
        name: "Kohl's",
        standardDays: 90,
        exceptions: "Premium Electronics & Watches (30 days), Sephora at Kohl's (30 days).",
        holiday: "Purchases Oct 5 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Kohl's is famous for taking Amazon returns. You might even get a coupon for it!"
    },
    {
        id: "nordstrom",
        name: "Nordstrom",
        standardDays: 0,
        exceptions: "Fine Jewelry & Designer items often have more specific requirements.",
        holiday: "No official deadline; they handle returns on a case-by-case basis.",
        tip: "Nordstrom has the most legendary customer service. They prioritize your satisfaction."
    },
    {
        id: "nike",
        name: "Nike",
        standardDays: 60,
        exceptions: "Items must be returned within 60 days. Nike members get free returns.",
        holiday: "No specific extension; the 60-day window is already very generous.",
        tip: "Nike even accepts returns on shoes you've already 'tested' or worn outside!"
    },
    {
        id: "sephora",
        name: "Sephora",
        standardDays: 30,
        exceptions: "New or gently used. 31–60 days gives you store credit only.",
        holiday: "Standard 30-day policy usually applies for cash refunds.",
        tip: "You can return gently used makeup if it didn't work for your skin type."
    },
    {
        id: "gap",
        name: "Gap / Old Navy",
        standardDays: 30,
        exceptions: "Final Sale items cannot be returned. Mail-only items can't go to stores.",
        holiday: "Purchases Oct - Dec 2025 can be returned through Jan 15, 2026.",
        tip: "Returns are free if you use their prepaid UPS label or take it to a store."
    },
    {
        id: "wayfair",
        name: "Wayfair",
        standardDays: 30,
        exceptions: "Assembled furniture, Clearance, & Personalized items (Non-returnable).",
        holiday: "Purchases Nov 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Wayfair may charge shipping fees for returns. Check the quote before you ship."
    },
    {
        id: "lululemon",
        name: "Lululemon",
        standardDays: 30,
        exceptions: "Tags must be attached. 'We Made Too Much' items are final sale.",
        holiday: "Purchases Oct - Dec 2025 can be returned through Jan 25, 2026.",
        tip: "Lululemon's 'Quality Promise' may cover items even after the 30-day window."
    },
    {
        id: "tjmaxx",
        name: "TJ Maxx",
        standardDays: 30,
        exceptions: "In-store (30 days), Online (40 days). Jewelry has specific counters.",
        holiday: "Purchases Oct 5 - Dec 24 can be returned through Jan 25, 2026.",
        tip: "Online orders can be returned to any TJ Maxx store to avoid the $11.99 mail fee."
    },
    {
        id: "cvs",
        name: "CVS",
        standardDays: 60,
        exceptions: "Prescriptions are non-returnable. 100% satisfaction on Beauty products.",
        holiday: "Standard 60-day policy applies.",
        tip: "Opened beauty products can be returned if you're not satisfied with the results."
    },
    {
        id: "walgreens",
        name: "Walgreens",
        standardDays: 30,
        exceptions: "Cosmetics/Electronics (30 days with receipt). Prescriptions (No).",
        holiday: "Standard 30-day policy applies.",
        tip: "Bring your ID for any returns made without a physical or digital receipt."
    },
    {
        id: "petco",
        name: "Petco",
        standardDays: 30,
        exceptions: "Live Fish/Small Animals (No return). Prescription food (30 days).",
        holiday: "Standard 30-day policy applies.",
        tip: "Opened bags of pet food are usually returnable if your pet refused to eat it."
    }
];