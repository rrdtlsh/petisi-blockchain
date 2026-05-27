// ─── Contract Configuration ───────────────────────────────
export const CHAIN_CONFIG = {
  chainId: "0x7A69", // 31337 hex — Hardhat Local
  chainName: "Hardhat Local",
  rpcUrls: ["http://127.0.0.1:8545"],
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
};

// ─── App Info ─────────────────────────────────────────────
export const APP_INFO = {
  name: "PetisiChain",
  university: "Universitas Lambung Mangkurat",
  faculty: "Fakultas Teknik",
  year: "2026",
};

// ─── Team ─────────────────────────────────────────────────
export const TEAM = [
  {
    name: "Muhammad Rizki Ramadhan",
    nim: "2310817310008",
    role: "Project Manajer & Documentation Lead",
    icon: "💻",
  },
  {
    name: "Raudatul Sholehah",
    nim: "2310817220002",
    role: "Smart Contract Developer & Backend Developer",
    icon: "⛓️",
  },
  {
    name: "Muhammad Raihan",
    nim: "2310817110008",
    role: "Frontend Developer",
    icon: "🎨",
  },
  {
    name: "Zahra Nabila",
    nim: "2310817320007",
    role: "Documentation & Testing",
    icon: "📋",
  },
];

// ─── Petition Status ──────────────────────────────────────
export const PETITION_STATUS = {
  ACTIVE: "active",
  CLOSED: "closed",
};
