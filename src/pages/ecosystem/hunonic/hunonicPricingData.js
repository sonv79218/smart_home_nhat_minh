// Hunonic device catalog + per-housing-type pricing multipliers.
export const hunonicDevices = [
  { id: "switch", text: "Công tắc thông minh", price: 350000 },
  { id: "socket", text: "Ổ cắm thông minh", price: 290000 },
  { id: "water-heater", text: "Bình nóng lạnh", price: 650000 },
  { id: "ac", text: "Điều hòa", price: 690000 },
  { id: "rolling-door", text: "Cửa cuốn", price: 1290000 },
  { id: "gate", text: "Cổng tự động", price: 1690000 },
  { id: "sensor", text: "Cảm biến", price: 490000 },
  { id: "camera", text: "Camera", price: 1490000 },
  { id: "alarm", text: "Báo động", price: 890000 },
];

const apartmentMultipliers = {
  "Công tắc thông minh": 6,
  "Ổ cắm thông minh": 4,
  "Bình nóng lạnh": 1,
  "Điều hòa": 2,
  "Cửa cuốn": 0,
  "Cổng tự động": 0,
  "Cảm biến": 2,
  "Camera": 1,
  "Báo động": 1,
};
const townhouseMultipliers = {
  "Công tắc thông minh": 10,
  "Ổ cắm thông minh": 6,
  "Bình nóng lạnh": 2,
  "Điều hòa": 3,
  "Cửa cuốn": 1,
  "Cổng tự động": 1,
  "Cảm biến": 3,
  "Camera": 2,
  "Báo động": 1,
};
const villaMultipliers = {
  "Công tắc thông minh": 16,
  "Ổ cắm thông minh": 10,
  "Bình nóng lạnh": 3,
  "Điều hòa": 5,
  "Cửa cuốn": 2,
  "Cổng tự động": 1,
  "Cảm biến": 5,
  "Camera": 3,
  "Báo động": 2,
};

const scalePrice = (multiplier, basePrice) =>
  Math.round((basePrice * multiplier) / 1000) * 1000;

const buildDevices = (multipliers) =>
  hunonicDevices.map((d) => ({
    id: d.id,
    text: d.text,
    price: scalePrice(multipliers[d.text], d.price),
  }));

// Hunonic uses Starter/Smart/Pro. Pro includes everything.
export const defaultSelection = {
  starter: ["switch", "socket", "water-heater"],
  smart: ["switch", "socket", "water-heater", "ac", "camera", "sensor"],
  pro: hunonicDevices.map((d) => d.id),
};

const build = (multipliers) => ({
  starter: { name: "Starter", popular: false, devices: buildDevices(multipliers) },
  smart: { name: "Smart", popular: true, devices: buildDevices(multipliers) },
  pro: { name: "Pro", popular: false, devices: buildDevices(multipliers) },
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

export const packageKeys = ["starter", "smart", "pro"];