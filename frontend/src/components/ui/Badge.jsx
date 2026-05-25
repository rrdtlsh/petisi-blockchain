export default function Badge({ active }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
      ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-red-400"}`}
      />
      {active ? "Aktif" : "Ditutup"}
    </span>
  );
}
