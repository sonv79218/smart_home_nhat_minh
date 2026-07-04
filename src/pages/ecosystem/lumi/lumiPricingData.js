// Lumi device catalog + per-housing-type pricing multipliers.
export const lumiDevices = [
  { id: "lighting", text: "Chiếu sáng thông minh", price: 350000 },
  { id: "ac", text: "Điều hòa thông minh", price: 1800000 },
  { id: "water-heater", text: "Bình nóng lạnh thông minh", price: 1500000 },
  { id: "sensor", text: "Cảm biến thông minh", price: 850000 },
  { id: "curtain", text: "Rèm tự động", price: 2890000 },
  { id: "audio", text: "Âm thanh đa vùng", price: 3200000 },
  { id: "irrigation", text: "Tưới tự động", price: 2490000 },
  { id: "dimmer", text: "Đèn Dimmer", price: 980000 },
  { id: "security", text: "An ninh thông minh", price: 2790000 },
];

const apartmentMultipliers = {
  "Chiếu sáng thông minh": 4,
  "Điều hòa thông minh": 1,
  "Bình nóng lạnh thông minh": 1,
  "Cảm biến thông minh": 2,
  "Rèm tự động": 1,
  "Âm thanh đa vùng": 0,
  "Tưới tự động": 0,
  "Đèn Dimmer": 0,
  "An ninh thông minh": 0,
};
const townhouseMultipliers = {
  "Chiếu sáng thông minh": 6,
  "Điều hòa thông minh": 2,
  "Bình nóng lạnh thông minh": 2,
  "Cảm biến thông minh": 3,
  "Rèm tự động": 2,
  "Âm thanh đa vùng": 0,
  "Tưới tự động": 0,
  "Đèn Dimmer": 0,
  "An ninh thông minh": 1,
};
const villaMultipliers = {
  "Chiếu sáng thông minh": 10,
  "Điều hòa thông minh": 3,
  "Bình nóng lạnh thông minh": 3,
  "Cảm biến thông minh": 5,
  "Rèm tự động": 3,
  "Âm thanh đa vùng": 1,
  "Tưới tự động": 1,
  "Đèn Dimmer": 2,
  "An ninh thông minh": 1,
};

const scalePrice = (multiplier, basePrice) =>
  Math.round((basePrice * multiplier) / 1000) * 1000;

const buildDevices = (multipliers) =>
  lumiDevices.map((d) => ({
    id: d.id,
    text: d.text,
    price: scalePrice(multipliers[d.text], d.price),
  }));

// Defaults per package. Premium includes everything.
export const defaultSelection = {
  basic: ["lighting", "ac", "water-heater"],
  standard: ["lighting", "ac", "water-heater", "sensor", "curtain"],
  premium: lumiDevices.map((d) => d.id),
};

const build = (multipliers) => ({
  basic: { name: "Basic", popular: false, devices: buildDevices(multipliers) },
  standard: { name: "Standard", popular: true, devices: buildDevices(multipliers) },
  premium: { name: "Premium", popular: false, devices: buildDevices(multipliers) },
});

export const pricingPackages = {
  apartment: build(apartmentMultipliers),
  townhouse: build(townhouseMultipliers),
  villa: build(villaMultipliers),
};

export const housingTabs = [
  { key: "apartment", label: "Chung cư" },
  { key: "townhouse", label: "Nhà phố" },
  { key: "villa", label: "Biệt thự" },
];

export const packageKeys = ["basic", "standard", "premium"];