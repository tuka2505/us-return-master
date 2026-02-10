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