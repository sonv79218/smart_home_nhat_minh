// Master catalog of Aqara devices. Same device IDs across all housing types
// so the "Smart" package can inherit from "Starter" and "Luxury" can include everything.
export const aqaraDevices = [
  { id: "hub-m3", text: "Hub M3", price: 3690000 },
  { id: "switch-h1", text: "Công tắc H1", price: 1450000 },
  { id: "door-sensor", text: "Cảm biến cửa", price: 690000 },
  { id: "motion-sensor", text: "Cảm biến chuyển động", price: 790000 },
  { id: "temp-sensor", text: "Cảm biến nhiệt độ", price: 850000 },
  { id: "curtain", text: "Rèm thông minh", price: 2890000 },
  { id: "ac-control", text: "Điều hòa", price: 1690000 },
  { id: "camera-g3", text: "Camera G3", price: 2490000 },
  { id: "doorbell-g4", text: "Chuông cửa G4", price: 2990000 },
  { id: "smart-lock", text: "Khóa cửa", price: 4990000 },
];

// Per-housing-type multipliers. Apartment is the smallest footprint, villa is the largest.
// Prices below are baseline (apartment); townhouse and villa scale these up so the totals
// stay realistic and proportional to property size.
const apartmentMultipliers = {
  "Hub M3": 1,
  "Công tắc H1": 1,
  "Cảm biến cửa": 1,
  "Cảm biến chuyển động": 1,
  "Cảm biến nhiệt độ": 1,
  "Rèm thông minh": 1,
  "Điều hòa": 1,
  "Camera G3": 1,
  "Chuông cửa G4": 1,
  "Khóa cửa": 1,
};

const townhouseMultipliers = {
  "Hub M3": 1,
  "Công tắc H1": 1.5,
  "Cảm biến cửa": 1.5,
  "Cảm biến chuyển động": 1.5,
  "Cảm biến nhiệt độ": 1.5,
  "Rèm thông minh": 1.5,
  "Điều hòa": 1.5,
  "Camera G3": 1.5,
  "Chuông cửa G4": 1,
  "Khóa cửa": 1,
};

const villaMultipliers = {
  "Hub M3": 1.5,
  "Công tắc H1": 2.5,
  "Cảm biến cửa": 2.5,
  "Cảm biến chuyển động": 2.5,
  "Cảm biến nhiệt độ": 2,
  "Rèm thông minh": 2.5,
  "Điều hòa": 2.5,
  "Camera G3": 2,
  "Chuông cửa G4": 1,
  "Khóa cửa": 1.5,
};

const scalePrice = (multiplier, basePrice) =>
  Math.round((basePrice * multiplier) / 1000) * 1000;

const buildDevices = (multipliers) =>
  aqaraDevices.map((d) => ({
    id: d.id,
    text: d.text,
    price: scalePrice(multipliers[d.text], d.price),
  }));

// Device IDs that belong to each default package. Luxury includes everything.
export const defaultSelection = {
  starter: [
    "hub-m3",
    "switch-h1",
    "door-sensor",
    "motion-sensor",
    "smart-lock",
  ],
  smart: [
    "hub-m3",
    "switch-h1",
    "door-sensor",
    "motion-sensor",
    "smart-lock",
    "camera-g3",
    "curtain",
    "ac-control",
  ],
  luxury: aqaraDevices.map((d) => d.id),
};

export const pricingPackages = {
  apartment: {
    starter: {
      name: "Starter",
      popular: false,
      devices: buildDevices(apartmentMultipliers),
    },
    smart: {
      name: "Smart",
      popular: true,
      devices: buildDevices(apartmentMultipliers),
    },
    luxury: {
      name: "Luxury",
      popular: false,
      devices: buildDevices(apartmentMultipliers),
    },
  },
  townhouse: {
    starter: {
      name: "Starter",
      popular: false,
      devices: buildDevices(townhouseMultipliers),
    },
    smart: {
      name: "Smart",
      popular: true,
      devices: buildDevices(townhouseMultipliers),
    },
    luxury: {
      name: "Luxury",
      popular: false,
      devices: buildDevices(townhouseMultipliers),
    },
  },
  villa: {
    starter: {
      name: "Starter",
      popular: false,
      devices: buildDevices(villaMultipliers),
    },
    smart: {
      name: "Smart",
      popular: true,
      devices: buildDevices(villaMultipliers),
    },
    luxury: {
      name: "Luxury",
      popular: false,
      devices: buildDevices(villaMultipliers),
    },
  },
};

export const housingTabs = [
  { key: "apartment", label: "Chung cư" },
  { key: "townhouse", label: "Nhà phố" },
  { key: "villa", label: "Biệt thự" },
];

export const packageKeys = ["starter", "smart", "luxury"];