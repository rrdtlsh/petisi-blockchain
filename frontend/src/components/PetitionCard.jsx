// PetitionCard.jsx
// Kartu tampilan satu petisi

export default function PetitionCard({ petition, account, onSign, onClose, loading }) {
  const isCreator = account?.toLowerCase() === petition.creator?.toLowerCase();
  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className={`petition-card ${!petition.isActive ? "inactive" : ""}`}>
      {/* Badge status */}
      <div className="card-badges">
        <span className={`badge ${petition.isActive ? "badge-active" : "badge-closed"}`}>
          {petition.isActive ? "🟢 Aktif" : "🔴 Ditutup"}
        </span>
        {isCreator && <span className="badge badge-creator">👑 Petisi Anda</span>}
      </div>

      {/* Konten petisi */}
      <h3 className="petition-title">{petition.title}</h3>
      <p className="petition-desc">{petition.description}</p>

      {/* Info detail */}
      <div className="petition-meta">
        <span>📅 {petition.createdAt}</span>
        <span>👤 {shortAddress(petition.creator)}</span>
        <span className="sig-count">✍️ {petition.signatureCount} tanda tangan</span>
      </div>

      {/* Tombol aksi */}
      <div className="card-actions">
        {petition.isActive && !petition.hasSigned && !isCreator && (
          <button
            className="btn-sign"
            onClick={() => onSign(petition.id)}
            disabled={loading}
          >
            {loading ? "⏳..." : "✍️ Tanda Tangani"}
          </button>
        )}

        {petition.hasSigned && (
          <span className="signed-badge">✅ Sudah Ditandatangani</span>
        )}

        {isCreator && petition.isActive && (
          <button
            className="btn-close"
            onClick={() => {
              if (window.confirm("Yakin ingin menutup petisi ini?")) {
                onClose(petition.id);
              }
            }}
            disabled={loading}
          >
            🔒 Tutup Petisi
          </button>
        )}
      </div>
    </div>
  );
}
