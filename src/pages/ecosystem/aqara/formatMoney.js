const moneyFormatter = new Intl.NumberFormat("vi-VN");

export const formatMoney = (value) => `${moneyFormatter.format(value || 0)} đ`;