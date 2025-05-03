// An array of brand objects
type Brand = { name: string; gmv: number };

const brands: Brand[] = [
  { name: "Liquid Death", gmv: 120_000 },
  { name: "Final Boss Sour", gmv: 85_000 },
];

// Add a third brand
brands.push({ name: "Remedy & Restore", gmv: 64_000 });

// Calculate total GMV
const total = brands.reduce((sum, b) => sum + b.gmv, 0);

console.log("Total GMV:", total);        // should print 269000