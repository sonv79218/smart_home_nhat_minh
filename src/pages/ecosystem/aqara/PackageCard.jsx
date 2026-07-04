import FeatureItem from "./FeatureItem";
import Money from "./Money";

const PackageCard = ({
  pkg,
  selectedIds,
  total,
  isActive,
  onSelect,
  onToggleDevice,
  theme = {
    primary: "#2563EB",
    borderClass: "border-blue-500",
    accentClass: "accent-blue-600",
  },
}) => {
const cardClass = [
  "relative flex flex-col rounded-none border-2 bg-white p-8 shadow-lg transition-all duration-300",
  isActive
    ? `scale-105 ${theme.borderClass} shadow-2xl`
    : pkg.popular
      ? "border-gray-200 shadow-xl"
      : "border-gray-200",
].join(" ");

  return (
    <div className={cardClass} style={isActive ? { borderColor: theme.primary } : {}}>
      {isActive ? (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none px-4 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: theme.primary }}
        >
          Đang chọn
        </span>
      ) : pkg.popular ? (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none px-4 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: theme.primary }}
        >
          Phổ biến
        </span>
      ) : null}

      <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
      <div className="mt-3 text-3xl font-extrabold" style={{ color: theme.primary }}>
        <Money value={total} />
      </div>

      <div className="mt-6 flex-1 space-y-3">
        {pkg.devices.map((device) => (
          <FeatureItem
            key={device.id}
            text={device.text}
            checked={selectedIds.has(device.id)}
            onToggle={() => onToggleDevice(device.id)}
            accentClass={theme.accentClass}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="mt-8 w-full rounded-none py-3 text-sm font-bold transition-all hover:opacity-90"
        style={{ backgroundColor: theme.primary, color: "white" }}
      >
        Chọn gói
      </button>
    </div>
  );
};

export default PackageCard;