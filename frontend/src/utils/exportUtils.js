import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const shortAddr = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export function exportPetitionPDF(petition) {
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageW, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("PETISI BLOCKCHAIN", pageW / 2, 18, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Universitas Lambung Mangkurat", pageW / 2, 28, { align: "center" });
  doc.text(
    `Dicetak: ${new Date().toLocaleDateString("id-ID")}`,
    pageW / 2,
    35,
    { align: "center" },
  );

  y = 55;
  doc.setTextColor(30, 41, 59);

  // Status badge
  doc.setFillColor(
    petition.isActive ? 220 : 254,
    petition.isActive ? 252 : 226,
    petition.isActive ? 231 : 226,
  );
  doc.roundedRect(14, y - 6, 40, 10, 2, 2, "F");
  doc.setFontSize(9);
  doc.setTextColor(
    petition.isActive ? 22 : 185,
    petition.isActive ? 163 : 28,
    petition.isActive ? 74 : 26,
  );
  doc.text(petition.isActive ? "● AKTIF" : "● DITUTUP", 34, y + 1, {
    align: "center",
  });

  y += 14;
  doc.setTextColor(30, 41, 59);

  const addField = (label, value) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "bold");
    doc.text(label.toUpperCase(), 14, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value || "-", pageW - 28);
    doc.text(lines, 14, y);
    y += lines.length * 6 + 8;
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y - 4, pageW - 14, y - 4);
  };

  addField("Judul Petisi", petition.title);
  addField("Penerima", petition.recipient);
  addField("Latar Belakang", petition.background);
  addField("Tuntutan Aksi", petition.demands);
  addField("Pembuat", petition.creator);
  addField("Jumlah Tanda Tangan", petition.signatureCount.toString());
  addField(
    "Tanggal Dibuat",
    petition.createdAt?.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

  // Footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `PetisiChain — Blockchain Final Project | Halaman ${i} dari ${totalPages}`,
      pageW / 2,
      290,
      { align: "center" },
    );
  }

  doc.save(
    `petisi-${petition.id}-${petition.title.slice(0, 20).replace(/\s+/g, "-")}.pdf`,
  );
}

export function exportPetitionExcel(petition) {
  const wb = XLSX.utils.book_new();

  const data = [
    ["PETISI BLOCKCHAIN - Universitas Lambung Mangkurat"],
    [],
    ["ID Petisi", petition.id],
    ["Judul", petition.title],
    ["Penerima", petition.recipient],
    ["Latar Belakang", petition.background],
    ["Tuntutan Aksi", petition.demands],
    ["Pembuat (Wallet)", petition.creator],
    ["Jumlah Tanda Tangan", petition.signatureCount],
    ["Status", petition.isActive ? "Aktif" : "Ditutup"],
    ["Tanggal Dibuat", petition.createdAt?.toLocaleDateString("id-ID")],
    ["Diekspor Pada", new Date().toLocaleDateString("id-ID")],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = [{ wch: 25 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, ws, "Detail Petisi");
  XLSX.writeFile(wb, `petisi-${petition.id}.xlsx`);
}

export function exportAllPetitionsExcel(petitions) {
  const wb = XLSX.utils.book_new();

  const headers = [
    "ID",
    "Judul",
    "Penerima",
    "Pembuat",
    "Tanda Tangan",
    "Status",
    "Tanggal",
  ];
  const rows = petitions.map((p) => [
    p.id,
    p.title,
    p.recipient,
    shortAddr(p.creator),
    p.signatureCount,
    p.isActive ? "Aktif" : "Ditutup",
    p.createdAt?.toLocaleDateString("id-ID"),
  ]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 5 },
    { wch: 35 },
    { wch: 25 },
    { wch: 15 },
    { wch: 12 },
    { wch: 10 },
    { wch: 15 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, "Semua Petisi");
  XLSX.writeFile(
    wb,
    `semua-petisi-${new Date().toISOString().slice(0, 10)}.xlsx`,
  );
}
