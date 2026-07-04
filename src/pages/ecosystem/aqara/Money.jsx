import { formatMoney } from "./formatMoney";

const Money = ({ value, className = "" }) => (
  <span className={className}>{formatMoney(value)}</span>
);

export default Money;