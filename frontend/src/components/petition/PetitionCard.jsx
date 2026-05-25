import { Eye, PenLine, X, FileText, FileSpreadsheet } from "lucide-react";
import Badge from "../ui/Badge";
import {
  exportPetitionPDF,
  exportPetitionExcel,
} from "../../utils/exportUtils";

const shortAddr = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export default function PetitionCard({
  petition,
  account,
  onSign,
  onClose,
  onDetail,
  onEdit,
}) {
  const isCreator = account?.toLowerCase() === petition.creator?.toLowerCase();
  const canSign = petition.isActive && !petition.hasSigned && !isCreator;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 group">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <Badge active={petition.isActive} />
        <div className="flex items-center gap-1">
          {isCreator && (
            <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
              Petisi Anda
            </span>
          )}
          {petition.hasSigned && (
            <span className="text-xs bg-purple-50 text-purple-600 font-semibold px-2 py-0.5 rounded-full">
              ✓ Sudah TTD
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
          {petition.title}
        </h3>
        <p className="text-xs text-blue-600 font-medium mt-1">
          Kepada: {petition.recipient}
        </p>
      </div>

      {/* Description preview */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {petition.background}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
        <span>👤 {shortAddr(petition.creator)}</span>
        <span className="font-bold text-purple-600">
          ✍️ {petition.signatureCount} TTD
        </span>
        <span>📅 {petition.createdAt?.toLocaleDateString("id-ID")}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onDetail(petition)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition-colors border border-gray-100"
        >
          <Eye size={14} />
          Detail
        </button>

        {canSign ? (
          <button
            onClick={() => onSign(petition.id, petition.title)}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors"
          >
            ✍️ Tanda Tangan
          </button>
        ) : isCreator && petition.isActive ? (
          <button
            onClick={() => onClose(petition.id, petition.title)}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition-colors border border-red-100"
          >
            <X size={14} />
            Tutup
          </button>
        ) : (
          <div className="py-2" />
        )}
      </div>

      {/* Export row */}
      <div className="grid grid-cols-2 gap-2">
        {isCreator && petition.isActive && petition.signatureCount === 0 && (
          <button
            onClick={() => onEdit(petition)}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-2 rounded-lg transition-colors border border-yellow-100"
          >
            <PenLine size={14} />
            Edit
          </button>
        )}
        <button
          onClick={() => exportPetitionPDF(petition)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition-colors border border-red-100"
        >
          <FileText size={14} />
          PDF
        </button>
        <button
          onClick={() => exportPetitionExcel(petition)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg transition-colors border border-green-100"
        >
          <FileSpreadsheet size={14} />
          Excel
        </button>
      </div>
    </div>
  );
}
