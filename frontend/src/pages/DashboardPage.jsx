import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FileText,
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

export default function DashboardPage({
  petitions,
  fetching,
  fetchPetitions,
  account,
}) {
  useEffect(() => {
    if (fetchPetitions) fetchPetitions();
  }, []);

  const totalPetitions = petitions?.length || 0;
  const activePetitions = petitions?.filter((p) => p.isActive).length || 0;
  const closedPetitions = petitions?.filter((p) => !p.isActive).length || 0;
  const totalSignatures =
    petitions?.reduce((s, p) => s + p.signatureCount, 0) || 0;
  const myPetitions =
    petitions?.filter(
      (p) => p.creator?.toLowerCase() === account?.toLowerCase(),
    ).length || 0;

  // Top 6 petisi berdasarkan TTD
  const chartData = [...(petitions || [])]
    .sort((a, b) => b.signatureCount - a.signatureCount)
    .slice(0, 6)
    .map((p) => ({
      name: p.title.length > 20 ? p.title.slice(0, 20) + "…" : p.title,
      ttd: p.signatureCount,
      status: p.isActive,
    }));

  // Recent petitions (5 terbaru)
  const recent = [...(petitions || [])].slice(0, 5);

  const stats = [
    {
      label: "Total Petisi",
      value: totalPetitions,
      icon: FileText,
      color: "bg-blue-50 text-blue-700",
      border: "border-blue-100",
    },
    {
      label: "Petisi Aktif",
      value: activePetitions,
      icon: CheckCircle,
      color: "bg-green-50 text-green-700",
      border: "border-green-100",
    },
    {
      label: "Petisi Ditutup",
      value: closedPetitions,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
      border: "border-red-100",
    },
    {
      label: "Total TTD",
      value: totalSignatures,
      icon: Users,
      color: "bg-purple-50 text-purple-700",
      border: "border-purple-100",
    },
    {
      label: "Petisi Saya",
      value: myPetitions,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-700",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Statistik dan ringkasan petisi blockchain
          </p>
        </div>
        <button
          onClick={fetchPetitions}
          disabled={fetching}
          className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={15} className={fetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, border }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl border ${border} p-5 flex flex-col gap-3`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart — Top Petisi */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-1">
            Tanda Tangan per Petisi
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Top 6 petisi dengan tanda tangan terbanyak
          </p>
          {chartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              Belum ada data petisi
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  formatter={(v) => [v, "Tanda Tangan"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Bar dataKey="ttd" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="font-bold text-gray-900">Ringkasan</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Total Petisi</span>
              <span className="font-bold text-gray-900">{totalPetitions}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Aktif</span>
              <span className="font-bold text-green-600">
                {activePetitions}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Ditutup</span>
              <span className="font-bold text-red-500">{closedPetitions}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Total TTD</span>
              <span className="font-bold text-purple-600">
                {totalSignatures}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Rata-rata TTD</span>
              <span className="font-bold text-gray-900">
                {totalPetitions > 0
                  ? (totalSignatures / totalPetitions).toFixed(1)
                  : 0}
              </span>
            </div>
          </div>

          <Link
            to="/petitions"
            className="mt-auto w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
          >
            Lihat Semua Petisi →
          </Link>
        </div>
      </div>

      {/* Recent Petitions */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Petisi Terbaru</h2>
          <Link
            to="/petitions"
            className="text-sm text-blue-600 hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <FileText size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Belum ada petisi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Kepada: {p.recipient} ·{" "}
                    {p.createdAt?.toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className="text-sm font-bold text-purple-600">
                    {p.signatureCount} TTD
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {p.isActive ? "Aktif" : "Tutup"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
