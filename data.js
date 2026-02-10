/**
 * US Return Master - Retailer Database (2026 Official Verified)
 * Structure: Hierarchical JSON with Category-specific Logic
 * * [Key Logic for 'days']:
 * 999: Lifetime / Infinite Return Policy
 * -1: Case-by-case / No formal limit
 * 0: Final Sale / Non-returnable
 */

const RETURN_DATA = [
    // ==========================================
    // 1. General & Marketplace (6 Brands)
    // ==========================================
    {
        id: "amazon",
        name: "Amazon",
        slug: "stores/amazon-return-policy",
        categoryType: "general",
        logo: "amazon.svg", // Placeholder for UI
        categories: [
            { label: "Most Items (Standard)", days: 30, examples: "Clothing, Books, Home Decor", tip: "Most items have free drop-offs at Kohl's or Whole Foods." },
            { label: "Electronics & Apple", days: 15, examples: "Laptops, Tablets, Apple Products", tip: "Data wipe recommended. Includes high-end tech." },
            { label: "Amazon Renewed", days: 90, examples: "Refurbished iPhones, Certified Used Gear", tip: "Specific guarantee for Renewed items only." },
            { label: "Luxury Stores", days: 30, examples: "High-end Designer Bags, Jewelry", tip: "Must include all security tags and original packaging." }
        ],
        refundInfo: { inStore: "2-3 Days (Drop-off)", byMail: "5-7 Business Days" }
    },
    {
        id: "walmart",
        name: "Walmart",
        slug: "stores/walmart-return-policy",
        categoryType: "general",
        categories: [
            { label: "Standard Items", days: 90, examples: "Toys, Tools, Unopened Groceries", tip: "Use the Walmart app to store receipts digitally." },
            { label: "Consumer Electronics", days: 30, examples: "TVs, PCs, Video Consoles", tip: "Video games must be unopened for a full refund." },
            { label: "Wireless Phones", days: 14, examples: "Contract & Unlocked Phones", tip: "Applies to all activatable mobile devices." },
            { label: "Major Appliances", days: 2, examples: "Refrigerators, Washers, Dryers", tip: "CRITICAL: Must report damage/dents within 48 hours." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-10 Business Days" }
    },
    {
        id: "target",
        name: "Target",
        slug: "stores/target-return-policy",
        categoryType: "general",
        categories: [
            { label: "Most Unopened Items", days: 90, examples: "Household Essentials, Stationery", tip: "Must be new and unopened for full refund." },
            { label: "Electronics & Ent.", days: 30, examples: "Nintendo Switch, Speakers", tip: "Does NOT include Apple products." },
            { label: "Apple & Beats", days: 15, examples: "iPads, AirPods, Beats Headphones", tip: "No 30-day Circle Card extension for Apple items." },
            { label: "Target Brands", days: 365, examples: "Cat & Jack, Up&Up, Good & Gather", tip: "1-Year Guarantee on Target exclusive brands." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-10 Business Days" }
    },
    {
        id: "costco",
        name: "Costco",
        slug: "stores/costco-return-policy",
        categoryType: "general",
        categories: [
            { label: "Most Products", days: 999, examples: "Furniture, Apparel, Food", tip: "Lifetime Satisfaction Guarantee." },
            { label: "Electronics", days: 90, examples: "TVs, PCs, Major Appliances", tip: "90-day window is strict for electronics." },
            { label: "Diamonds (1ct+)", days: 90, examples: "Engagement Rings, Solitaires", tip: "Requires 2-5 days for authenticity inspection." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 14 Days" }
    },
    {
        id: "ebay",
        name: "eBay",
        slug: "stores/ebay-return-policy",
        categoryType: "marketplace",
        categories: [
            { label: "Seller's Return Policy", days: 30, examples: "Vintage Clothes, Collectibles", tip: "Varies by seller. Check the listing carefully." },
            { label: "Money Back Guarantee", days: 30, examples: "Faulty, Fake, or Not as Described", tip: "Overrides 'No Returns' policy if item is bad." },
            { label: "Trading Cards", days: 3, examples: "Pokémon, Sports Cards", tip: "3-day window due to market price volatility." }
        ],
        refundInfo: { inStore: "N/A", byMail: "5-10 Business Days" }
    },
    {
        id: "temu",
        name: "Temu",
        slug: "stores/temu-return-policy",
        categoryType: "marketplace",
        categories: [
            { label: "Standard Items", days: 90, examples: "Tech Gadgets, Fashion", tip: "1st return per order is free. Next is $7.99." },
            { label: "Non-returnable", days: 0, examples: "Underwear, Bodysuits, Free Gifts", tip: "Marked as 'Final Sale' on the product page." }
        ],
        refundInfo: { inStore: "N/A", byMail: "5-14 Business Days" }
    },

    // ==========================================
    // 2. Electronics & Home (6 Brands)
    // ==========================================
    {
        id: "apple",
        name: "Apple Store",
        slug: "stores/apple-return-policy",
        categoryType: "electronics",
        categories: [
            { label: "Standard Hardware", days: 14, examples: "iPhone, Mac, iPad, Watch", tip: "Must include all cords and adapters." },
            { label: "Software (Opened)", days: 0, examples: "Final Cut Pro (Boxed)", tip: "Non-returnable once the seal is broken." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "3-5 Business Days" }
    },
    {
        id: "bestbuy",
        name: "Best Buy",
        slug: "stores/best-buy-return-policy",
        categoryType: "electronics",
        categories: [
            { label: "Most Products", days: 15, examples: "Laptops, Headphones, Games", tip: "Standard window is very short (15 days)." },
            { label: "Activatable Devices", days: 14, examples: "Cell Phones, Cellular Tablets", tip: "$45 Restocking Fee applies if opened." },
            { label: "Major Appliances", days: 15, examples: "Fridges, Washers", tip: "Inspect heavily upon delivery." },
            { label: "Plus/Total Members", days: 60, examples: "Eligible items for Members", tip: "Exclusive benefit for paid members." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "15-20 Business Days" }
    },
    {
        id: "homedepot",
        name: "Home Depot",
        slug: "stores/home-depot-return-policy",
        categoryType: "home",
        categories: [
            { label: "Most New Merchandise", days: 90, examples: "Tools, Paint, Hardware", tip: "90 days with receipt or card lookup." },
            { label: "Major Appliances", days: 2, examples: "Washers, Dryers, Ovens", tip: "Must report damage/defects within 48 hours." },
            { label: "Gas Powered Equipment", days: 30, examples: "Mowers, Chainsaws", tip: "Cannot return once gas is put in." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "10-17 Business Days" }
    },
    {
        id: "lowes",
        name: "Lowe's",
        slug: "stores/lowes-return-policy",
        categoryType: "home",
        categories: [
            { label: "Most New Merchandise", days: 90, examples: "Lumber, Decor, Plumbing", tip: "Standard policy with receipt." },
            { label: "Major Appliances", days: 2, examples: "Fridges, Dishwashers", tip: "48-hour window for damage claims." },
            { label: "Outdoor Power Eq.", days: 30, examples: "Blowers, Trimmers", tip: "Must be drained of fuel before return." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 15 Business Days" }
    },
    {
        id: "wayfair",
        name: "Wayfair",
        slug: "stores/wayfair-return-policy",
        categoryType: "home",
        categories: [
            { label: "Standard Items", days: 30, examples: "Rugs, Lighting, Decor", tip: "You pay for return shipping." },
            { label: "Assembled Furniture", days: 0, examples: "Desks, Beds, Bookshelves", tip: "Non-returnable once assembly starts." },
            { label: "Large Appliances", days: 30, examples: "Ranges, Fridges", tip: "Must be in original box, never installed." }
        ],
        refundInfo: { inStore: "N/A", byMail: "Up to 14 Days" }
    },
    {
        id: "ikea",
        name: "IKEA",
        slug: "stores/ikea-return-policy",
        categoryType: "home",
        categories: [
            { label: "New & Unopened", days: 365, examples: "Flat-packs, Unused Decor", tip: "Full year to return if unopened." },
            { label: "Open Products", days: 180, examples: "Assembled Furniture", tip: "Must be clean and resalable." },
            { label: "Mattresses", days: 90, examples: "IKEA Brand Mattresses", tip: "One-time exchange only (No refund)." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-14 Business Days" }
    },

    // ==========================================
    // 3. Apparel & Beauty (12 Brands)
    // ==========================================
    {
        id: "nike",
        name: "Nike",
        slug: "stores/nike-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Most Nike Purchases", days: 60, examples: "Shoes, Apparel, Gear", tip: "'Tested/Worn' items are accepted!" },
            { label: "Clearance Store", days: 30, examples: "Items from Factory Stores", tip: "Shorter window than Nike.com." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 10 Business Days" }
    },
    {
        id: "lululemon",
        name: "Lululemon",
        slug: "stores/lululemon-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Full Price Items", days: 30, examples: "Align Leggings, Yoga Mats", tip: "Tags must be attached & unwashed." },
            { label: "We Made Too Much", days: 0, examples: "Sale Section Items", tip: "Final Sale. No returns/exchanges." }
        ],
        refundInfo: { inStore: "3-5 Business Days", byMail: "10-15 Business Days" }
    },
    {
        id: "zara",
        name: "Zara",
        slug: "stores/zara-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Zara.com Purchases", days: 30, examples: "Online Orders", tip: "$4.95 fee deducted for mail returns." },
            { label: "Store Purchases", days: 30, examples: "In-store Items", tip: "Free returns at store locations." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 14 Days" }
    },
    {
        id: "hm",
        name: "H&M",
        slug: "stores/hm-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Standard Items", days: 30, examples: "Clothing, Home", tip: "Free returns for Loyalty Members." },
            { label: "Final Sale", days: 0, examples: "Clearance, Masks", tip: "Non-returnable." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 14 Days" }
    },
    {
        id: "shein",
        name: "Shein",
        slug: "stores/shein-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "All Clothing Items", days: 35, examples: "Dresses, Tops", tip: "1st return label is free. Next is $7.99." },
            { label: "Non-Returnable", days: 0, examples: "Lingerie, Bodysuits", tip: "Final Sale." }
        ],
        refundInfo: { inStore: "N/A", byMail: "7-10 Business Days" }
    },
    {
        id: "nordstrom",
        name: "Nordstrom",
        slug: "stores/nordstrom-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Most Items", days: -1, examples: "Designer, Shoes, Beauty", tip: "Case-by-case basis. No formal limit." }
        ],
        refundInfo: { inStore: "3-5 Business Days", byMail: "12-17 Business Days" }
    },
    {
        id: "gap",
        name: "Gap / Old Navy",
        slug: "stores/gap-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Standard Items", days: 30, examples: "Jeans, Kids, Hoodies", tip: "Must be unwashed/unworn." },
            { label: "Final Sale", days: 0, examples: "Clearance Items", tip: "Tags marked ending in $.97 or $.99." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "10 Business Days" }
    },
    {
        id: "macys",
        name: "Macy's",
        slug: "stores/macys-return-policy",
        categoryType: "fashion",
        categories: [
            { label: "Most Items", days: 30, examples: "Apparel, Handbags", tip: "$9.99 shipping fee for non-members." },
            { label: "Last Act", days: 0, examples: "Yellow/Red Tag Items", tip: "Final Sale. No returns." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 10 Business Days" }
    },
    {
        id: "tjmaxx",
        name: "TJ Maxx",
        slug: "stores/tj-maxx-return-policy",
        categoryType: "offprice",
        categories: [
            { label: "In-Store Purchases", days: 30, examples: "Purple/White Tag Items", tip: "After 30 days: Store Credit only." },
            { label: "Online Orders", days: 40, examples: "Web Purchases", tip: "Return to store to avoid shipping fee." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "10-14 Business Days" }
    },
    {
        id: "ross",
        name: "Ross",
        slug: "stores/ross-return-policy",
        categoryType: "offprice",
        categories: [
            { label: "With Receipt", days: 30, examples: "Clothes, Home Decor", tip: "Full refund to original payment." },
            { label: "No Receipt", days: -1, examples: "Any Item", tip: "Store Credit only at current price." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "N/A" }
    },
    {
        id: "marshalls",
        name: "Marshalls",
        slug: "stores/marshalls-return-policy",
        categoryType: "offprice",
        categories: [
            { label: "Standard Policy", days: 30, examples: "Apparel, Shoes", tip: "After 30 days: Store Credit only." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "10-14 Business Days" }
    },
    {
        id: "homegoods",
        name: "HomeGoods",
        slug: "stores/homegoods-return-policy",
        categoryType: "offprice",
        categories: [
            { label: "Standard Policy", days: 30, examples: "Furniture, Decor", tip: "After 30 days: Store Credit only." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "N/A" }
    },

    // ==========================================
    // 4. Pet, Health & Specialty (8 Brands)
    // ==========================================
    {
        id: "sephora",
        name: "Sephora",
        slug: "stores/sephora-return-policy",
        categoryType: "beauty",
        categories: [
            { label: "New or Gently Used", days: 30, examples: "Opened Makeup, Skincare", tip: "Full refund to payment method." },
            { label: "Late Returns (31-60)", days: 60, examples: "Used Items", tip: "Store Credit only." },
            { label: "Sephora at Kohl's", days: 60, examples: "Bought inside Kohl's", tip: "Must return to Kohl's location." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 30 Days" }
    },
    {
        id: "ultabeauty",
        name: "Ulta Beauty",
        slug: "stores/ulta-beauty-return-policy",
        categoryType: "beauty",
        categories: [
            { label: "New or Gently Used", days: 60, examples: "Makeup, Hair Tools", tip: "Must have 50% of product remaining." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-10 Business Days" }
    },
    {
        id: "kohls",
        name: "Kohl's",
        slug: "stores/kohls-return-policy",
        categoryType: "general",
        categories: [
            { label: "Most Merchandise", days: 180, examples: "Clothing, Bedding", tip: "Very generous 6-month window." },
            { label: "Premium Electronics", days: 30, examples: "Beats, Fitbit, Tech", tip: "Original packaging required." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-10 Business Days" }
    },
    {
        id: "chewy",
        name: "Chewy",
        slug: "stores/chewy-return-policy",
        categoryType: "pet",
        categories: [
            { label: "Standard Merchandise", days: 365, examples: "Toys, Unopened Food", tip: "They may ask you to donate instead of returning." },
            { label: "Prescription Items", days: 0, examples: "Meds, Rx Food", tip: "Non-returnable by law." }
        ],
        refundInfo: { inStore: "N/A", byMail: "3-5 Business Days" }
    },
    {
        id: "petco",
        name: "Petco",
        slug: "stores/petco-return-policy",
        categoryType: "pet",
        categories: [
            { label: "Standard Merchandise", days: 30, examples: "Cages, Grooming Tools", tip: "Store credit if no receipt." },
            { label: "Live Fish/Animals", days: 30, examples: "Hamsters, Fish", tip: "30-Day Health Guarantee." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "Up to 30 Days" }
    },
    {
        id: "cvs",
        name: "CVS",
        slug: "stores/cvs-return-policy",
        categoryType: "health",
        categories: [
            { label: "Beauty Products", days: 60, examples: "Opened Makeup", tip: "100% Satisfaction Guarantee." },
            { label: "Standard Items", days: 60, examples: "Vitamins, First Aid", tip: "Unopened with receipt." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-14 Business Days" }
    },
    {
        id: "walgreens",
        name: "Walgreens",
        slug: "stores/walgreens-return-policy",
        categoryType: "health",
        categories: [
            { label: "Standard Items", days: 30, examples: "General Store Items", tip: "Receipt required for full refund." },
            { label: "Cosmetics", days: 30, examples: "Makeup, Hair Color", tip: "100% Delight Guarantee (Used OK)." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-10 Business Days" }
    },
    {
        id: "dicks",
        name: "Dick's Sporting Goods",
        slug: "stores/dicks-return-policy",
        categoryType: "sport",
        categories: [
            { label: "Standard Merchandise", days: 60, examples: "Clubs, Cleats, Apparel", tip: "Resalable condition required." },
            { label: "High-End Tech", days: 30, examples: "GPS, Rangefinders", tip: "Restocking fees may apply." }
        ],
        refundInfo: { inStore: "Immediate", byMail: "7-14 Business Days" }
    }
];