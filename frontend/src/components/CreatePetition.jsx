// CreatePetition.jsx
// Form untuk membuat petisi baru

import { useState } from "react";

export default function CreatePetition({ onCreate, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Judul dan deskripsi wajib diisi!");
      return;
    }
    if (title.length > 200) {
      alert("Judul maksimal 200 karakter");
      return;
    }
    if (description.length > 1000) {
      alert("Deskripsi maksimal 1000 karakter");
      return;
    }

    await onCreate(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <div className="create-section">
      <div className="section-header">
        <h2>📝 Buat Petisi Baru</h2>
        <button
          className="btn-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕ Tutup" : "+ Buat Petisi"}
        </button>
      </div>

      {isOpen && (
        <div className="create-form">
          <div className="form-group">
            <label>Judul Petisi *</label>
            <input
              type="text"
              placeholder="Contoh: Tolak Kenaikan UKT 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              disabled={loading}
            />
            <span className="char-count">{title.length}/200</span>
          </div>

          <div className="form-group">
            <label>Deskripsi Petisi *</label>
            <textarea
              placeholder="Jelaskan tujuan dan isi petisi secara singkat..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={4}
              disabled={loading}
            />
            <span className="char-count">{description.length}/1000</span>
          </div>

          <div className="form-note">
            ⚠️ Petisi akan disimpan permanen di blockchain. Pastikan data sudah benar sebelum submit.
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !description.trim()}
          >
            {loading ? "⏳ Memproses..." : "🚀 Publikasikan Petisi"}
          </button>
        </div>
      )}
    </div>
  );
}
