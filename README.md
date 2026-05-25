# 📜 PetisiChain — Sistem Tanda Tangan Petisi Berbasis Blockchain

> Final Project Mata Kuliah Blockchain  
> Universitas Lambung Mangkurat · Fakultas Teknik · 2025

![PetisiChain](https://img.shields.io/badge/Blockchain-Hardhat-yellow)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![ethers.js](https://img.shields.io/badge/ethers.js-6-purple)

---

## 📋 Deskripsi

PetisiChain adalah platform petisi digital berbasis blockchain yang memungkinkan mahasiswa membuat dan menandatangani petisi secara transparan dan tidak dapat dimanipulasi. Setiap tanda tangan tercatat permanen di blockchain Ethereum.

---

## ✨ Fitur

- ✅ Buat petisi dengan validasi lengkap
- ✅ Tanda tangan digital (1 wallet = 1 TTD)
- ✅ Dashboard statistik & grafik
- ✅ Export PDF & Excel
- ✅ Edit petisi (sebelum ada TTD)
- ✅ Tutup petisi oleh owner
- ✅ Validasi duplikat judul di blockchain
- ✅ Responsive desktop & mobile

---

## 🛠️ Teknologi

| Layer          | Teknologi                       |
| -------------- | ------------------------------- |
| Smart Contract | Solidity ^0.8.19                |
| Blockchain     | Hardhat Local / Sepolia Testnet |
| Frontend       | React 18 + Vite                 |
| Web3           | ethers.js v6                    |
| Wallet         | MetaMask                        |
| Styling        | TailwindCSS v4                  |
| Alert          | SweetAlert2                     |
| Export         | jsPDF + xlsx                    |

---

## 📁 Struktur Folder

```
petisi-blockchain/
├── contracts/
│   ├── contracts/
│   │   └── PetitionSystem.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── hardhat.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     (Navbar, Footer)
│   │   │   ├── petition/   (Card, Form, Modal)
│   │   │   └── ui/         (Badge)
│   │   ├── constants/
│   │   ├── hooks/          (usePetition)
│   │   ├── pages/          (Home, Dashboard, Petitions, About)
│   │   ├── utils/          (exportUtils)
│   │   └── contracts/      (PetitionSystem.json)
│   └── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js v18+
- MetaMask browser extension

### 1. Install dependencies

```bash
# Contracts
cd contracts
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Jalankan Hardhat Node (Terminal 1)

```bash
cd contracts
npx hardhat node
```

### 3. Deploy Smart Contract (Terminal 2)

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat --atau--
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Jalankan Frontend (Terminal 3)

```bash
cd frontend
npm run dev
```

Buka: **http://localhost:5173**

### 5. Setup MetaMask

| Field        | Nilai                 |
| ------------ | --------------------- |
| Network Name | Hardhat Local         |
| RPC URL      | http://127.0.0.1:8545 |
| Chain ID     | 31337                 |
| Currency     | ETH                   |

Import private key dari output `npx hardhat node`.

---

## 📐 Arsitektur

```
User → MetaMask → React + ethers.js → Smart Contract → Blockchain
```

---

## 👥 Tim Pengembang

| Nama              | NIM           | Role                                         |
| ----------------- | ------------- | -------------------------------------------- |
| IKI               | 231xxxxx      | Project Manajer & Documentation Lead         |
| Raudatul Sholehah | 2310817220002 | Smart Contract Developer & Backend Developer |
| ehan              | 231xxxxx      | Frontend Developer                           |
| bila              | 231xxxxx      | Documentation & Testing                      |

---

## 📄 Lisensi

MIT License — Final Project Akademik
