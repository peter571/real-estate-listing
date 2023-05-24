export const filterData = [
  {
    items: [
      { name: "Buy", value: "for_sale" },
      { name: "Rent", value: "for_rent" },
      { name: "Upcoming", value: "up_coming" },
    ],
    placeholder: "Type",
    queryName: "type",
  },
  {
    items: [
      { name: "30,000", value: "30000" },
      { name: "40,000", value: "40000" },
      { name: "50,000", value: "50000" },
      { name: "60,000", value: "60000" },
      { name: "85,000", value: "85000" },
      { name: "110,000", value: "110000" },
      { name: "135,000", value: "135000" },
      { name: "160,000", value: "160000" },
      { name: "185,000", value: "185000" },
      { name: "200,000", value: "200000" },
      { name: "300,000", value: "300000" },
      { name: "400,000", value: "400000" },
      { name: "500,000", value: "500000" },
      { name: "600,000", value: "600000" },
      { name: "700,000", value: "700000" },
      { name: "800,000", value: "800000" },
      { name: "900,000", value: "900000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Min Price(USD)",
    queryName: "minPrice",
  },
  {
    items: [
      { name: "50,000", value: "50000" },
      { name: "60,000", value: "60000" },
      { name: "85,000", value: "85000" },
      { name: "110,000", value: "110000" },
      { name: "135,000", value: "135000" },
      { name: "160,000", value: "160000" },
      { name: "185,000", value: "185000" },
      { name: "200,000", value: "200000" },
      { name: "300,000", value: "300000" },
      { name: "400,000", value: "400000" },
      { name: "500,000", value: "500000" },
      { name: "600,000", value: "600000" },
      { name: "700,000", value: "700000" },
      { name: "800,000", value: "800000" },
      { name: "900,000", value: "900000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Max Price(USD)",
    queryName: "maxPrice",
  },
  {
    items: [
      { name: "1000", value: "1000" },
      { name: "2000", value: "2000" },
      { name: "3000", value: "3000" },
      { name: "4000", value: "4000" },
      { name: "5000", value: "5000" },
      { name: "10000", value: "10000" },
      { name: "20000", value: "20000" },
    ],
    placeholder: "Max Area(sqft)",
    queryName: "areaMax",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Rooms",
    queryName: "roomsMin",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Baths",
    queryName: "bathsMin",
  },
  {
    items: [
      { name: "Apartment", value: "Apartment" },
      { name: "Townhouses", value: "Townhouses" },
      { name: "Villas", value: "Villas" },
      { name: "Penthouses", value: "Penthouses" },
      { name: "Hotel Apartments", value: "Hotel Apartments" },
      { name: "Villa Compound", value: "Villa Compound" },
      { name: "Residential Plot", value: "Residential Plot" },
      { name: "Residential Floor", value: "Residential Floor" },
      { name: "Residential Building", value: "Residential Building" },
    ],
    placeholder: "Category",
    queryName: "category",
  },
];

export function checkIfAnySearchFilterIsTrue(data: SearchProps): boolean {
  for (let prop in data) {
    if (prop !== 'search_term' && data[prop]) {
      return true;
    }
  }
  return false;
}

export function getTrueKeys(obj: SearchProps): string[] {
  const trueKeys: string[] = [];
  for (let prop in obj) {
    if (prop !== 'search_term' && obj[prop]) {
      trueKeys.push(prop);
    }
  }
  return trueKeys;
}

export function checkIfAllKeysTrue(obj: SearchProps): boolean {
  for (let prop in obj) {
    if (prop !== 'search_term' && !obj[prop]) {
      return false;
    }
  }
  return true;
}

export const numberFormatter = Intl.NumberFormat('en', { notation: "compact" })