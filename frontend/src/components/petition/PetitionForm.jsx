import { useState } from "react";
import Swal from "sweetalert2";
import { X, FileText } from "lucide-react";

const FIELDS = [
  {
    key: "title",
    label: "Judul Petisi",
    type: "input",
    placeholder: "Contoh: Tolak Kenaikan UKT Semester Genap 2025",
    min: 15,
    max: 200,
    required: true,
  },
  {
    key: "recipient",
    label: "Penerima Petisi",
    type: "input",
    placeholder: "Contoh: Rektor Universitas Lambung Mangkurat",
    min: 3,
    max: 100,
    required: true,
  },
  {
    key: "background",
    label: "Latar Belakang",
    type: "textarea",
    placeholder: "Jelaskan latar belakang dan alasan petisi ini...",
    min: 20,
    max: 1000,
    required: true,
  },
  {
    key: "demands",
    label: "Tuntutan Aksi",
    type: "textarea",
    placeholder: "Tuliskan tuntutan yang ingin dicapai...",
    min: 10,
    max: 1000,
    required: true,
  },
];

const empty = {
  title: "",
  recipient: "",
  background: "",
  demands: "",
  document: null,
};

export default function PetitionForm({
  onSubmit,
  loading,
  onClose,
  initialData = null,
}) {
  const [form, setForm] = useState(initialData || empty);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    FIELDS.forEach(({ key, label, min, max }) => {
      const v = form[key]?.trim() || "";
      if (!v) errs[key] = `${label} wajib diisi`;
      else if (v.length < min)
        errs[key] = `Minimal ${min} karakter (sekarang ${v.length})`;
      else if (v.length > max) errs[key] = `Maksimal ${max} karakter`;
    });
    if (form.document) {
      if (form.document.type !== "application/pdf")
        errs.document = "File harus berformat PDF";
      else if (form.document.size > 5 * 1024 * 1024)
        errs.document = "Ukuran file maksimal 5MB";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Swal.fire({
        icon: "warning",
        title: "Form Belum Lengkap",
        text: "Periksa kembali isian Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    const ok = await onSubmit(
      form.title.trim(),
      form.recipient.trim(),
      form.background.trim(),
      form.demands.trim(),
    );
    if (ok) {
      setForm(empty);
      setErrors({});
      onClose();
    }
  };

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              {initialData ? "✏️ Edit Petisi" : "📝 Buat Petisi Baru"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Data akan tersimpan permanen di blockchain
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form body */}
        <div className="px-6 py-5 space-y-5">
          {FIELDS.map(
            ({ key, label, type, placeholder, min, max, required }) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <span
                    className={`text-xs ${(form[key]?.length || 0) > max ? "text-red-500" : "text-gray-400"}`}
                  >
                    {form[key]?.length || 0}/{max}
                  </span>
                </div>
                {type === "input" ? (
                  <input
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    maxLength={max + 10}
                    disabled={loading}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors
                    ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
                  />
                ) : (
                  <textarea
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    rows={4}
                    maxLength={max + 10}
                    disabled={loading}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none
                    ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
                  />
                )}
                {errors[key] && (
                  <p className="text-xs text-red-500 mt-1">⚠ {errors[key]}</p>
                )}
                {!errors[key] &&
                  (form[key]?.length || 0) < min &&
                  form[key] && (
                    <p className="text-xs text-orange-400 mt-1">
                      Minimal {min} karakter
                    </p>
                  )}
              </div>
            ),
          )}

          {/* Upload dokumen */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Dokumen Pendukung{" "}
              <span className="text-gray-400 font-normal">
                (opsional, PDF maks 5MB)
              </span>
            </label>
            <label
              className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer transition-colors
              ${errors.document ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"}`}
            >
              <FileText size={20} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">
                {form.document
                  ? form.document.name
                  : "Klik untuk upload dokumen PDF..."}
              </span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) set("document", file);
                }}
              />
            </label>
            {form.document && (
              <div className="flex items-center justify-between mt-1.5 px-1">
                <span className="text-xs text-green-600">
                  ✅ {form.document.name} (
                  {(form.document.size / 1024).toFixed(0)} KB)
                </span>
                <button
                  onClick={() => set("document", null)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Hapus
                </button>
              </div>
            )}
            {errors.document && (
              <p className="text-xs text-red-500 mt-1">⚠ {errors.document}</p>
            )}
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
            ⚠️ Data petisi akan disimpan <strong>permanen</strong> di blockchain
            dan tidak bisa dihapus. Pastikan semua informasi sudah benar.
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
            >
              {loading
                ? "⏳ Memproses..."
                : initialData
                  ? "💾 Simpan Perubahan"
                  : "🚀 Publikasikan Petisi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
