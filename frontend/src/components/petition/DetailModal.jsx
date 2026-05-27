import { X, User, Calendar, Users, Download, FileSpreadsheet } from "lucide-react";
import Badge from "../ui/Badge";
import { exportPetitionPDF, exportPetitionExcel } from "../../utils/exportUtils";

const shortAddr = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export default function DetailModal({ petition, onClose }) {
  if (!petition) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <Badge active={petition.isActive} />
              <span className="text-xs text-gray-400">ID #{petition.id}</span>
            </div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">{petition.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Meta info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Users size={18} className="mx-auto text-purple-500 mb-1" />
              <p className="text-xl font-extrabold text-gray-900">{petition.signatureCount}</p>
              <p className="text-xs text-gray-400">Tanda Tangan</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <User size={18} className="mx-auto text-blue-500 mb-1" />
              <p className="text-sm font-bold text-gray-900 truncate">{shortAddr(petition.creator)}</p>
              <p className="text-xs text-gray-400">Pembuat</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Calendar size={18} className="mx-auto text-green-500 mb-1" />
              <p className="text-sm font-bold text-gray-900">
                {petition.createdAt?.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="text-xs text-gray-400">Dibuat</p>
            </div>
          </div>

          {/* Fields */}
          {[
            {
              label: "Ditujukan Kepada",
              value: petition.recipient,
              highlight: true,
            },
            { label: "Latar Belakang", value: petition.background },
            { label: "Tuntutan Aksi", value: petition.demands },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
              <div
                className={`rounded-xl p-4 text-sm text-gray-700 leading-relaxed
                ${highlight ? "bg-blue-50 border border-blue-100 font-semibold text-blue-800" : "bg-gray-50"}`}
              >
                {value}
              </div>
            </div>
          ))}

          {/* Blockchain info */}
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Info Blockchain</p>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Creator</span>
                <span className="font-mono text-xs text-green-400">{petition.creator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Dibuat</span>
                <span className="text-gray-300 text-xs">{petition.createdAt?.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Diperbarui</span>
                <span className="text-gray-300 text-xs">{petition.updatedAt?.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Ditutup</span>
                <span className="text-gray-300 text-xs">{petition.isActive ? "-" : petition.closedAt ? petition.closedAt.toLocaleString("id-ID") : "Tanggal tidak tercatat"}</span>
              </div>
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => exportPetitionPDF(petition)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2.5 rounded-xl transition-colors border border-red-100"
            >
              <Download size={16} />
              Export PDF
            </button>
            <button
              onClick={() => exportPetitionExcel(petition)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-sm py-2.5 rounded-xl transition-colors border border-green-100"
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
