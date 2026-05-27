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
    name: "IKII",
    nim: "2310000001",
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
    name: "ehann",
    nim: "2310000002",
    role: "Frontend Developer",
    icon: "🎨",
  },
  {
    name: "Bila Assegaf",
    nim: "2310000004",
    role: "Documentation & Testing",
    icon: "📋",
  },
];

// ─── Petition Status ──────────────────────────────────────
export const PETITION_STATUS = {
  ACTIVE: "active",
  CLOSED: "closed",
};
