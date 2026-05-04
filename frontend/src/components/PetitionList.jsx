// PetitionList.jsx
// Daftar semua petisi yang tersedia

import PetitionCard from "./PetitionCard";

export default function PetitionList({
  petitions,
  account,
  onSign,
  onClose,
  onRefresh,
  loading,
}) {
  return (
    <div className="list-section">
      <div className="section-header">
        <h2>📋 Daftar Petisi ({petitions.length})</h2>
        <button
          className="btn-refresh"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "⏳" : "🔄 Refresh"}
        </button>
      </div>

      {petitions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>Belum ada petisi. Jadilah yang pertama membuat petisi!</p>
        </div>
      ) : (
        <div className="petition-grid">
          {petitions.map((petition) => (
            <PetitionCard
              key={petition.id}
              petition={petition}
              account={account}
              onSign={onSign}
              onClose={onClose}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
