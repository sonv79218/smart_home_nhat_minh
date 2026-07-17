const FeatureItem = ({ text, checked, onToggle, accentClass = "accent-[#7787B2]" }) => (
  <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700 select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={onToggle}
      className={`h-4 w-4 cursor-pointer ${accentClass}`}
    />
    <span className={checked ? "" : "text-gray-400 line-through"}>{text}</span>
  </label>
);

export default FeatureItem;