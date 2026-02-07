/**
 * US Return Master - Retailer Database (32 Major Retailers)
 * Last Updated: February 2026
 */

const RETURN_DATA = [
    // 1. General & Marketplace
    {
        id: "amazon",
        name: "Amazon",
        standardDays: 30,
        refundInStore: "2-3 Days (Drop-off)",
        refundByMail: "5-7 Business Days",
        exceptions: "Electronics & Apple products (15 days), Amazon Renewed (90 days).",
        holiday: "Items bought Nov 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Most items have free return drop-offs at Kohl's or Whole Foods without a box!"
    },
    {
        id: "walmart",
        name: "Walmart",
        standardDays: 90,
        refundInStore: "Immediate to 24 Hours",
        refundByMail: "7-10 Business Days",
        exceptions: "Electronics (15 days), Major Appliances (2 days), Post-paid Phones (14 days).",
        holiday: "Purchases made Oct 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Use the Walmart app to store your receipts digitally; it makes returns 10x faster."
    },
    {
        id: "target",
        name: "Target",
        standardDays: 90,
        refundInStore: "Immediate to 24 Hours",
        refundByMail: "7-10 Business Days",
        exceptions: "Electronics & Apple (15 days), Target Brands (365 days).",
        holiday: "30-day clock for electronics starts on Dec 26; return by Jan 24, 2026.",
        tip: "RedCard holders get an additional 30 days on top of the standard policy."
    },
    {
        id: "ebay",
        name: "eBay",
        standardDays: 30,
        refundInStore: "N/A",
        refundByMail: "5-10 Business Days",
        exceptions: "Policies vary by seller. Check the 'Shipping and Payments' tab on the listing.",
        holiday: "Varies by seller. Most follow a standard 30-day window without extension.",
        tip: "Always take photos of the item before shipping it back to protect your refund."
    },
    {
        id: "costco",
        name: "Costco",
        standardDays: 365,
        refundInStore: "Immediate",
        refundByMail: "Up to 14 Days",
        exceptions: "Electronics, TVs, Computers (90 days), Diamonds 1ct+ (Verification needed).",
        holiday: "No extension needed as most items have a lifetime return policy.",
        tip: "You don't need a receipt if you have your membership card. They track everything."
    },
    {
        id: "temu",
        name: "Temu",
        standardDays: 90,
        refundInStore: "N/A",
        refundByMail: "5-14 Business Days",
        exceptions: "First return for every order is free. Subsequent returns have a $7.99 fee.",
        holiday: "Standard 90-day policy applies. Credit refunds are often instant.",
        tip: "Choosing 'Temu Credit' for your refund is almost instant once the return is scanned."
    },

    // 2. Electronics & Home
    {
        id: "apple",
        name: "Apple Store",
        standardDays: 14,
        refundInStore: "5-7 Business Days",
        refundByMail: "3-5 Business Days",
        exceptions: "Standard 14 days for all hardware. Items must be in original condition.",
        holiday: "Items received between Nov 8 - Dec 25 can be returned until Jan 8, 2026.",
        tip: "Apple's policy is strict. Start your online return before the 14th day ends."
    },
    {
        id: "bestbuy",
        name: "Best Buy",
        standardDays: 14,
        refundInStore: "Immediate",
        refundByMail: "15-20 Business Days",
        exceptions: "Major Appliances (15 days), Activatable Devices (14 days + $45 fee).",
        holiday: "Purchases Oct 27 - Dec 31 can be returned until Jan 13, 2026.",
        tip: "My Best Buy Plus/Total members get an extended 60-day return window."
    },
    {
        id: "homedepot",
        name: "Home Depot",
        standardDays: 90,
        refundInStore: "Immediate (Cash/Card)",
        refundByMail: "10-17 Business Days",
        exceptions: "Furniture/Gas Equipment (30 days), Major Appliances (48 hours for damage).",
        holiday: "No specific extension; standard 90-day policy usually covers holiday gifts.",
        tip: "Keep the original packaging for gas-powered items, or they may deny the return."
    },
    {
        id: "lowes",
        name: "Lowe's",
        standardDays: 90,
        refundInStore: "Immediate",
        refundByMail: "Up to 15 Business Days",
        exceptions: "Major Appliances & Outdoor Power Equipment (30 days).",
        holiday: "Standard 90-day policy applies. Use MyLowe's Rewards for digital receipts.",
        tip: "Commercial account holders often get a full 365 days for most returns."
    },
    {
        id: "wayfair",
        name: "Wayfair",
        standardDays: 30,
        refundInStore: "N/A",
        refundByMail: "Up to 14 Days",
        exceptions: "Assembled furniture, Clearance, & Personalized items (Non-returnable).",
        holiday: "Purchases Nov 1 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Wayfair may charge shipping fees for returns. Check the quote before you ship."
    },

    // 3. Apparel & Beauty
    {
        id: "nike",
        name: "Nike",
        standardDays: 60,
        refundInStore: "Immediate",
        refundByMail: "Up to 10 Business Days",
        exceptions: "Items must be returned within 60 days. Nike members get free returns.",
        holiday: "No specific extension; the 60-day window is already very generous.",
        tip: "Nike even accepts returns on shoes you've already 'tested' or worn outside!"
    },
    {
        id: "lululemon",
        name: "Lululemon",
        standardDays: 30,
        refundInStore: "3-5 Business Days",
        refundByMail: "10-15 Business Days",
        exceptions: "Tags must be attached. 'We Made Too Much' items are final sale.",
        holiday: "Purchases Oct - Dec 2025 can be returned through Jan 25, 2026.",
        tip: "Lululemon's 'Quality Promise' may cover items even after the 30-day window."
    },
    {
        id: "zara",
        name: "Zara",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "Up to 14 Days",
        exceptions: "Swimwear, underwear, and jewelry must have the hygiene seal intact.",
        holiday: "Purchases Nov 15 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "In-store returns are free, but mail-in returns now incur a $4.95 fee."
    },
    {
        id: "hm",
        name: "H&M",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "Up to 14 Days",
        exceptions: "Final sale items and face masks are not returnable.",
        holiday: "Items bought in Nov/Dec 2025 can be returned until Jan 31, 2026.",
        tip: "H&M Loyalty Members get free returns. It's worth joining if you shop there often."
    },
    {
        id: "shein",
        name: "Shein",
        standardDays: 35,
        refundInStore: "N/A",
        refundByMail: "7-10 Business Days",
        exceptions: "Bodysuits, lingerie, and beauty products are final sale.",
        holiday: "Standard 35-day policy. Refunds to Shein Wallet take less than 24 hours.",
        tip: "Use your Shein Wallet for the refund if you plan to buy from them again."
    },
    {
        id: "sephora",
        name: "Sephora",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "Up to 30 Days",
        exceptions: "New or gently used. 31–60 days gives you store credit only.",
        holiday: "Standard 30-day policy usually applies for cash refunds.",
        tip: "You can return gently used makeup if it didn't work for your skin type."
    },
    {
        id: "ultabeauty",
        name: "Ulta Beauty",
        standardDays: 60,
        refundInStore: "Immediate",
        refundByMail: "7-10 Business Days",
        exceptions: "Items must have at least 50% of product remaining for a refund.",
        holiday: "Standard 60-day policy applies. Very generous for beauty products.",
        tip: "Ultamate Rewards points used for the purchase are also refunded to your account."
    },
    {
        id: "nordstrom",
        name: "Nordstrom",
        standardDays: 0,
        refundInStore: "3-5 Business Days",
        refundByMail: "12-17 Business Days",
        exceptions: "Fine Jewelry & Designer items often have more specific requirements.",
        holiday: "No official deadline; they handle returns on a case-by-case basis.",
        tip: "Nordstrom has the most legendary customer service. They prioritize your satisfaction."
    },
    {
        id: "gap",
        name: "Gap / Old Navy",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "10 Business Days",
        exceptions: "Final Sale items cannot be returned. Mail-only items can't go to stores.",
        holiday: "Purchases Oct - Dec 2025 can be returned through Jan 15, 2026.",
        tip: "Returns are free if you use their prepaid UPS label or take it to a store."
    },
    {
        id: "macys",
        name: "Macy's",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "Up to 10 Business Days",
        exceptions: "Fine Jewelry & Watches (30 days), Last Act items (Final sale/No return).",
        holiday: "Purchases Oct 6 - Dec 31 can be returned until Jan 31, 2026.",
        tip: "Mail-in returns cost $9.99 for non-members. Return in-store to save that fee!"
    },
    {
        id: "tjmaxx",
        name: "TJ Maxx",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "10-14 Business Days",
        exceptions: "In-store (30 days), Online (40 days). Jewelry has specific counters.",
        holiday: "Purchases Oct 5 - Dec 24 can be returned through Jan 25, 2026.",
        tip: "Online orders can be returned to any TJ Maxx store to avoid the $11.99 mail fee."
    },

    // 4. Pet & Health
    {
        id: "chewy",
        name: "Chewy",
        standardDays: 365,
        refundInStore: "N/A",
        refundByMail: "3-5 Business Days",
        exceptions: "Prescription medications are non-returnable unless incorrect.",
        holiday: "Standard 365-day policy. Best-in-class return experience.",
        tip: "Sometimes Chewy asks you to donate the item to a shelter instead of returning it!"
    },
    {
        id: "petco",
        name: "Petco",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "Up to 30 Days",
        exceptions: "Live Fish/Small Animals (No return). Prescription food (30 days).",
        holiday: "Standard 30-day policy applies.",
        tip: "Opened bags of pet food are usually returnable if your pet refused to eat it."
    },
    {
        id: "cvs",
        name: "CVS",
        standardDays: 60,
        refundInStore: "Immediate",
        refundByMail: "7-14 Business Days",
        exceptions: "Prescriptions are non-returnable. 100% satisfaction on Beauty products.",
        holiday: "Standard 60-day policy applies.",
        tip: "Opened beauty products can be returned if you're not satisfied with the results."
    },
    {
        id: "walgreens",
        name: "Walgreens",
        standardDays: 30,
        refundInStore: "Immediate",
        refundByMail: "7-10 Business Days",
        exceptions: "Cosmetics/Electronics (30 days with receipt). Prescriptions (No).",
        holiday: "Standard 30-day policy applies.",
        tip: "Bring your ID for any returns made without a physical or digital receipt."
    }
];