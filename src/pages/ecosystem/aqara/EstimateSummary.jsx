import Money from "./Money";

const EstimateSummary = ({
  pkg,
  selectedDevices,
  total,
  theme = { primary: "#7787B2", borderClass: "border-[#7787B2]", textClass: "text-[#7787B2]" },
}) => (
  <div className={`mx-auto mt-10 max-w-2xl rounded-none border-2 ${theme.borderClass} bg-white p-8 shadow-xl`}>
    <h3 className="text-xl font-extrabold text-gray-900">Dự toán của bạn</h3>

    <div className="mt-5 flex items-center justify-between border-b border-gray-200 pb-3">
      <span className="text-sm text-gray-600">Gói đã chọn</span>
      <span className={`text-base font-bold ${theme.textClass}`}>{pkg?.name ?? "—"}</span>
    </div>

    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700">Thiết bị gồm</p>
      {selectedDevices.length === 0 ? (
        <p className="mt-3 text-sm italic text-gray-400">Chưa chọn thiết bị nào</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {selectedDevices.map((d) => (
            <li key={d.id} className="flex items-center gap-2 text-sm text-gray-700">
              <span style={{ color: theme.primary }}>✔</span>
              <span>{d.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3">
      <span className="text-sm text-gray-600">Tổng thiết bị</span>
      <span className="text-base font-bold text-gray-900">{selectedDevices.length}</span>
    </div>

    <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
      <span className="text-sm text-gray-600">Tổng tiền</span>
      <span className={`text-xl font-extrabold ${theme.textClass}`}>
        <Money value={total} />
      </span>
    </div>

    <button
      type="button"
      className="mt-6 w-full rounded-none py-3 text-sm font-bold transition hover:opacity-90"
      style={{ backgroundColor: theme.primary, color: "white" }}
    >
      Nhận báo giá
    </button>
  </div>
);

export default EstimateSummary;