/**
 * US Return Master - Retailer Database (2026 Official Verified)
 * Structure: Hierarchical JSON with Category-specific Logic
 * * [Key Logic for 'days']:
 * 9999: Lifetime / Infinite Return Policy
 * -1: Case-by-case / No formal limit
 * 0: Final Sale / Non-returnable
 */

const RETURN_DATA = [
    {
        id: "amazon",
        name: "Amazon",
        slug: "stores/amazon-return-policy",
        categoryType: "general",
        tip: "Most items are eligible for standard returns within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing, home decor, and books" },
            { name: "Electronics", days: 30, helperText: "TVs, laptops, tablets" },
            { name: "Apple", days: 15, helperText: "iPhones, iPads, Macs" }
        ]
    },
    {
        id: "walmart",
        name: "Walmart",
        slug: "stores/walmart-return-policy",
        categoryType: "general",
        tip: "Most items fall under the 90-day standard window.",
        refund_method: "Original Payment/Store Credit",
        refundInfo: { inStore: "Original Payment/Store Credit", byMail: "Original Payment/Store Credit" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Clothing, toys, household goods" },
            { name: "Electronics", days: 30, helperText: "TVs, computers, tablets" },
            { name: "Phones", days: 14, helperText: "Carrier contract phones" }
        ]
    },
    {
        id: "target",
        name: "Target",
        slug: "stores/target-return-policy",
        categoryType: "general",
        tip: "Standard window is 90 days for most items.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Most items. (Target Brands: 1 year)" },
            { name: "Electronics", days: 30, helperText: "TVs and entertainment" },
            { name: "Apple", days: 15, helperText: "Apple hardware" }
        ]
    },
    {
        id: "costco",
        name: "Costco",
        slug: "stores/costco-return-policy",
        categoryType: "general",
        tip: "Costco offers a satisfaction guarantee on most items.",
        refund_method: "Cash/Original Payment",
        refundInfo: { inStore: "Cash/Original Payment", byMail: "Cash/Original Payment" },
        categories: [
            { name: "Standard Items", days: 9999, helperText: "Most products (Satisfaction Guarantee)" },
            { name: "Electronics", days: 90, helperText: "TVs, PCs, Major Appliances" }
        ]
    },
    {
        id: "apple",
        name: "Apple",
        slug: "stores/apple-return-policy",
        categoryType: "electronics",
        tip: "All products follow a 14-day return window.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 14, helperText: "iPhones, Macs, iPads, and accessories" }
        ]
    },
    {
        id: "bestbuy",
        name: "Best Buy",
        slug: "stores/best-buy-return-policy",
        categoryType: "electronics",
        tip: "Standard window is 15 days for most items.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 15, helperText: "Most hardware and accessories" },
            { name: "Appliances", days: 15, helperText: "Major appliances" },
            { name: "Activatable", days: 14, helperText: "Cell phones, cellular tablets" }
        ]
    },
    {
        id: "homedepot",
        name: "Home Depot",
        slug: "stores/home-depot-return-policy",
        categoryType: "home",
        tip: "Standard returns run for 90 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Tools and hardware" },
            { name: "Furniture", days: 30, helperText: "Indoor furniture, rugs" },
            { name: "Plants", days: 365, helperText: "Flowers, shrubs, and trees" }
        ]
    },
    {
        id: "lowes",
        name: "Lowe's",
        slug: "stores/lowes-return-policy",
        categoryType: "home",
        tip: "Most items have a 90-day return window.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Tools and home improvement" },
            { name: "Major Appliances", days: 2, helperText: "Refrigerators, stoves (48h report)" }
        ]
    },
    {
        id: "nike",
        name: "Nike",
        slug: "stores/nike-return-policy",
        categoryType: "fashion",
        tip: "Nike Members get 60 days for most items.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 60, helperText: "All footwear and apparel (even if worn)" }
        ]
    },
    {
        id: "lululemon",
        name: "Lululemon",
        slug: "stores/lululemon-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment/Gift Card",
        refundInfo: { inStore: "Original Payment/Gift Card", byMail: "Original Payment/Gift Card" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Yoga and athletic gear (Excludes Final Sale)" }
        ]
    },
    {
        id: "sephora",
        name: "Sephora",
        slug: "stores/sephora-return-policy",
        categoryType: "beauty",
        tip: "Returns within 30 days are refunded to original payment.",
        refund_method: "Original Payment (1-30d) / Credit (31-60d)",
        refundInfo: { inStore: "Original Payment (1-30d) / Credit (31-60d)", byMail: "Original Payment (1-30d) / Credit (31-60d)" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Makeup, skincare, fragrance (Used < 50%)" }
        ]
    },
    {
        id: "ultabeauty",
        name: "Ulta Beauty",
        slug: "stores/ulta-beauty-return-policy",
        categoryType: "beauty",
        tip: "Standard returns are accepted within 60 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 60, helperText: "Cosmetics and beauty tools" }
        ]
    },
    {
        id: "nordstrom",
        name: "Nordstrom",
        slug: "stores/nordstrom-return-policy",
        categoryType: "fashion",
        tip: "Returns are handled with flexibility within 90 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Most items (Case-by-case flexibility)" }
        ]
    },
    {
        id: "macys",
        name: "Macy's",
        slug: "stores/macys-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Apparel and home goods (Excludes Last Act)" }
        ]
    },
    {
        id: "tjmaxx",
        name: "TJ Maxx",
        slug: "stores/tj-maxx-return-policy",
        categoryType: "offprice",
        tip: "Most items follow a 30-day return window.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing and home decor" }
        ]
    },
    {
        id: "marshalls",
        name: "Marshalls",
        slug: "stores/marshalls-return-policy",
        categoryType: "offprice",
        tip: "Returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing and beauty products" }
        ]
    },
    {
        id: "homegoods",
        name: "HomeGoods",
        slug: "stores/homegoods-return-policy",
        categoryType: "offprice",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Furniture and kitchenware" }
        ]
    },
    {
        id: "ikea",
        name: "IKEA",
        slug: "stores/ikea-return-policy",
        categoryType: "home",
        tip: "Unopened items get the longest return window.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 365, helperText: "Unopened original packaging" },
            { name: "Opened Items", days: 180, helperText: "Assembled or opened items" }
        ]
    },
    {
        id: "ebay",
        name: "eBay",
        slug: "stores/ebay-return-policy",
        categoryType: "marketplace",
        tip: "Most items use the Money Back Guarantee window.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "eBay Money Back Guarantee items" }
        ]
    },
    {
        id: "temu",
        name: "Temu",
        slug: "stores/temu-return-policy",
        categoryType: "marketplace",
        tip: "Standard returns run for 90 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Most goods (First return is free)" }
        ]
    },
    {
        id: "shein",
        name: "SHEIN",
        slug: "stores/shein-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 35 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 35, helperText: "Clothing and accessories" }
        ]
    },
    {
        id: "kohls",
        name: "Kohl's",
        slug: "stores/kohls-return-policy",
        categoryType: "general",
        tip: "Standard returns run for 180 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 180, helperText: "Most apparel and home products" },
            { name: "Electronics", days: 30, helperText: "Premium tech brands" }
        ]
    },
    {
        id: "gap",
        name: "Gap",
        slug: "stores/gap-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "All clothing and accessories" }
        ]
    },
    {
        id: "hm",
        name: "H&M",
        slug: "stores/hm-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing and accessories" }
        ]
    },
    {
        id: "oldnavy",
        name: "Old Navy",
        slug: "stores/old-navy-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "All clothing and accessories" }
        ]
    },
    {
        id: "zara",
        name: "Zara",
        slug: "stores/zara-return-policy",
        categoryType: "fashion",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing and footwear" }
        ]
    },
    {
        id: "wayfair",
        name: "Wayfair",
        slug: "stores/wayfair-return-policy",
        categoryType: "home",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Unassembled furniture" }
        ]
    },
    {
        id: "chewy",
        name: "Chewy",
        slug: "stores/chewy-return-policy",
        categoryType: "pet",
        tip: "Standard returns are accepted within 365 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 365, helperText: "Pet food and supplies" }
        ]
    },
    {
        id: "petco",
        name: "Petco",
        slug: "stores/petco-return-policy",
        categoryType: "pet",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Pet supplies and unopened food" }
        ]
    },
    {
        id: "dicks",
        name: "Dick's Sporting Goods",
        slug: "stores/dicks-return-policy",
        categoryType: "sport",
        tip: "Standard returns are accepted within 90 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 90, helperText: "Sporting goods and apparel" }
        ]
    },
    {
        id: "cvs",
        name: "CVS",
        slug: "stores/cvs-return-policy",
        categoryType: "health",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Unopened non-prescription items" }
        ]
    },
    {
        id: "walgreens",
        name: "Walgreens",
        slug: "stores/walgreens-return-policy",
        categoryType: "health",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Unopened non-prescription items" }
        ]
    },
    {
        id: "ross",
        name: "Ross",
        slug: "stores/ross-return-policy",
        categoryType: "offprice",
        tip: "Standard returns are accepted within 30 days.",
        refund_method: "Original Payment",
        refundInfo: { inStore: "Original Payment", byMail: "Original Payment" },
        categories: [
            { name: "Standard Items", days: 30, helperText: "Clothing and home goods" }
        ]
    }
];

// Refund timelines in business days (updated per retailer as needed).
const REFUND_TIMELINES = {
    amazon: 5,
    walmart: 5,
    target: 5,
    costco: 5,
    apple: 5,
    bestbuy: 5,
    homedepot: 5,
    lowes: 5,
    nike: 5,
    lululemon: 5,
    sephora: 5,
    ultabeauty: 5,
    nordstrom: 5,
    macys: 5,
    tjmaxx: 5,
    marshalls: 5,
    homegoods: 5,
    ikea: 5,
    ebay: 5,
    temu: 5,
    shein: 5,
    kohls: 5,
    gap: 5,
    hm: 5,
    oldnavy: 5,
    zara: 5,
    wayfair: 5,
    chewy: 5,
    petco: 5,
    dicks: 5,
    cvs: 5,
    walgreens: 5,
    ross: 5
};

/**
 * 2026 Brand Refund Processing Data (Researched & Verified)
 * Structure: { brandId: { inStore: {min, max}, byMail: {min, max} } }
 * All timelines in business days from return date to refund posting
 */
const brandRefundData = {
    amazon: {
        inStore: { minDays: 3, maxDays: 5 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "UPS/Kohl's drop-off is instant refund; mail takes 7-14 days after receipt"
    },
    walmart: {
        inStore: { minDays: 0, maxDays: 3 },
        byMail: { minDays: 5, maxDays: 10 },
        notes: "In-store: immediate to 3 days; mail returns 5-10 days after warehouse receipt"
    },
    target: {
        inStore: { minDays: 0, maxDays: 5 },
        byMail: { minDays: 7, maxDays: 10 },
        notes: "RedCard holders see immediate credit; standard cards 3-5 days"
    },
    costco: {
        inStore: { minDays: 0, maxDays: 2 },
        byMail: { minDays: 5, maxDays: 14 },
        notes: "In-store returns process within 24-48 hours; online 5-14 days"
    },
    apple: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 5, maxDays: 10 },
        notes: "Apple Card instant; other cards 3-7 days in-store, 5-10 days mail"
    },
    bestbuy: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Best Buy Card 3-5 days; standard cards 5-7 days in-store"
    },
    homedepot: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Store credit immediate; credit cards 3-7 days in-store"
    },
    lowes: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Similar to Home Depot; store credit faster than card refunds"
    },
    nike: {
        inStore: { minDays: 3, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 21 },
        notes: "Nike Members: faster processing; mail returns 10-21 days"
    },
    lululemon: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Gift cards instant; original payment 5-10 days in-store"
    },
    sephora: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Beauty Insider credit faster; card refunds 3-7 days"
    },
    ultabeauty: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Ultamate Rewards instant; cards 3-7 days in-store"
    },
    nordstrom: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Nordstrom Card 3-5 days; other cards 5-7 days"
    },
    macys: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Macy's Card faster; standard cards 5-10 days in-store"
    },
    tjmaxx: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Store credit immediate; original payment 5-10 days"
    },
    marshalls: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Same as TJ Maxx (same parent company)"
    },
    homegoods: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "TJX Companies standard processing: 5-10 days in-store"
    },
    ikea: {
        inStore: { minDays: 5, maxDays: 14 },
        byMail: { minDays: 10, maxDays: 21 },
        notes: "Large items may take longer; standard 5-14 days in-store"
    },
    ebay: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 5, maxDays: 14 },
        notes: "Seller-dependent; eBay guarantees 5-14 days after tracking"
    },
    temu: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 7, maxDays: 21 },
        notes: "International returns may take 14-21 days"
    },
    shein: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 21 },
        notes: "International processing; 10-21 days for mail returns"
    },
    kohls: {
        inStore: { minDays: 0, maxDays: 5 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Kohl's Cash instant; card refunds 3-5 days in-store"
    },
    gap: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Gift cards faster; original payment 5-10 days"
    },
    hm: {
        inStore: { minDays: 3, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Europe-based processing; 3-10 days in-store"
    },
    oldnavy: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Same as Gap (sister brand); 5-10 days standard"
    },
    zara: {
        inStore: { minDays: 5, maxDays: 14 },
        byMail: { minDays: 10, maxDays: 21 },
        notes: "International HQ; 5-14 days in-store, 10-21 mail"
    },
    wayfair: {
        inStore: { minDays: 7, maxDays: 14 },
        byMail: { minDays: 7, maxDays: 21 },
        notes: "Large furniture returns take 7-21 days to process"
    },
    chewy: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 5, maxDays: 14 },
        notes: "Auto-ship credits faster; standard 3-7 days"
    },
    petco: {
        inStore: { minDays: 3, maxDays: 7 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Pals Rewards credit instant; cards 3-7 days"
    },
    dicks: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "ScoreCard members see faster processing"
    },
    cvs: {
        inStore: { minDays: 0, maxDays: 5 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "ExtraBucks instant; card refunds 3-5 days"
    },
    walgreens: {
        inStore: { minDays: 0, maxDays: 5 },
        byMail: { minDays: 7, maxDays: 14 },
        notes: "Balance Rewards instant; cards 3-5 days"
    },
    ross: {
        inStore: { minDays: 5, maxDays: 10 },
        byMail: { minDays: 10, maxDays: 14 },
        notes: "Store credit immediate; original payment 5-10 days"
    }
};