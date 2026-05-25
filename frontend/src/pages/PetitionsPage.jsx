import { useState, useEffect } from "react";
import { Plus, Search, RefreshCw, Download, Filter } from "lucide-react";
import PetitionCard from "../components/petition/PetitionCard";
import PetitionForm from "../components/petition/PetitionForm";
import DetailModal from "../components/petition/DetailModal";
import { exportAllPetitionsExcel } from "../utils/exportUtils";
import Swal from "sweetalert2";

export default function PetitionsPage({
  account,
  contract,
  petitions,
  fetching,
  fetchPetitions,
  createPetition,
  signPetition,
  closePetition,
  loading,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [detailPetition, setDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (fetchPetitions) fetchPetitions();
  }, []);

  // Filter + Search
  const filtered = (petitions || []).filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.recipient.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? p.isActive
          : filter === "closed"
            ? !p.isActive
            : filter === "mine"
              ? p.creator?.toLowerCase() === account?.toLowerCase()
              : true;
    return matchSearch && matchFilter;
  });

  const handleEdit = async (petition) => {
    if (!contract) return;
    // Edit form — reuse PetitionForm with initialData
    setEditData(petition);
    setShowForm(true);
  };

  const handleEditSubmit = async (title, recipient, background, demands) => {
    if (!contract || !editData) return false;
    try {
      const result = await Swal.fire({
        title: "Simpan Perubahan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Simpan!",
        cancelButtonText: "Batal",
        confirmButtonColor: "#2563eb",
      });
      if (!result.isConfirmed) return false;

      Swal.fire({
        title: "Menyimpan...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      const tx = await contract.editPetition(
        editData.id,
        recipient,
        background,
        demands,
      );
      await tx.wait();
      await Swal.fire({
        icon: "success",
        title: "Perubahan Tersimpan!",
        timer: 2000,
        showConfirmButton: false,
      });
      await fetchPetitions();
      setEditData(null);
      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err.reason || err.message,
        confirmButtonColor: "#2563eb",
      });
      return false;
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Daftar Petisi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {(petitions || []).length} petisi terdaftar di blockchain
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(petitions || []).length > 0 && (
            <button
              onClick={() => exportAllPetitionsExcel(petitions)}
              className="flex items-center gap-2 text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download size={15} />
              Export Semua
            </button>
          )}
          <button
            onClick={fetchPetitions}
            disabled={fetching}
            className="flex items-center gap-2 text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={15} className={fetching ? "animate-spin" : ""} />
            Refresh
          </button>
          {account && (
            <button
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Plus size={16} />
              Buat Petisi
            </button>
          )}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau penerima petisi..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          {["all", "active", "closed", "mine"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-2 rounded-xl font-medium transition-colors border
                ${filter === f ? "bg-blue-700 text-white border-blue-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {f === "all"
                ? "Semua"
                : f === "active"
                  ? "Aktif"
                  : f === "closed"
                    ? "Ditutup"
                    : "Milik Saya"}
            </button>
          ))}
        </div>
      </div>

      {/* No wallet warning */}
      {!account && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-sm text-amber-700">
          🦊 <strong>Connect wallet</strong> untuk membuat atau menandatangani
          petisi.
        </div>
      )}

      {/* Grid */}
      {fetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-100 rounded w-16 mb-4" />
              <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="h-16 bg-gray-100 rounded mb-4" />
              <div className="h-8 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-bold text-gray-700 text-lg mb-2">
            {search || filter !== "all"
              ? "Tidak ada hasil"
              : "Belum ada petisi"}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {search
              ? `Tidak ditemukan hasil untuk "${search}"`
              : "Jadilah yang pertama membuat petisi!"}
          </p>
          {account && !search && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors"
            >
              <Plus size={16} />
              Buat Petisi Pertama
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PetitionCard
              key={p.id}
              petition={p}
              account={account}
              onSign={signPetition}
              onClose={closePetition}
              onDetail={setDetail}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <PetitionForm
          onSubmit={editData ? handleEditSubmit : createPetition}
          loading={loading}
          onClose={handleCloseForm}
          initialData={editData}
        />
      )}
      {detailPetition && (
        <DetailModal
          petition={detailPetition}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
