# 📜 PetisiChain — Sistem Tanda Tangan Petisi Berbasis Blockchain

## Deskripsi Sistem

PetisiChain adalah aplikasi Web3 yang memungkinkan pengguna membuat dan menandatangani petisi secara transparan dan tidak dapat dimanipulasi menggunakan teknologi blockchain. Setiap tanda tangan tercatat permanen di blockchain, dan setiap wallet hanya bisa menandatangani satu kali per petisi.

## Arsitektur Sistem

```
Frontend (React + ethers.js)
        ↓
  MetaMask Wallet
        ↓
Smart Contract (Solidity)
        ↓
Blockchain (Hardhat Local / Sepolia Testnet)
```

### Tech Stack

| Layer          | Teknologi               |
| -------------- | ----------------------- |
| Smart Contract | Solidity ^0.8.19        |
| Blockchain     | Hardhat Local / Sepolia |
| Framework      | Hardhat                 |
| Frontend       | React + Vite            |
| Web3 Library   | ethers.js v6            |
| Wallet         | MetaMask                |

## Fitur Utama

- ✅ Connect MetaMask Wallet
- ✅ Buat petisi baru (tersimpan di blockchain)
- ✅ Tanda tangani petisi (1 wallet = 1 tanda tangan)
- ✅ Lihat semua petisi & jumlah tanda tangan
- ✅ Tutup petisi (hanya creator)
- ✅ Real-time update setelah transaksi

## Cara Menjalankan Project

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- VS Code

### 1. Clone & Setup

```bash
git clone <repo-url>
cd petisi-blockchain
```

### 2. Setup & Jalankan Hardhat

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat node          # Terminal 1 — jalankan blockchain lokal
```

### 3. Deploy Smart Contract (Terminal 2)

```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Setup & Jalankan Frontend (Terminal 3)

```bash
cd frontend
npm install
npm run dev
```

### 5. Konfigurasi MetaMask

- Network Name: Hardhat Local
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

Import private key dari output `npx hardhat node` ke MetaMask.

## Smart Contract

- **File:** `contracts/contracts/PetitionSystem.sol`
- **Functions:**
  - `createPetition(title, description)` — write
  - `signPetition(petitionId)` — write
  - `closePetition(petitionId)` — write
  - `getPetition(id)` — read
  - `getAllPetitionIds()` — read
  - `hasSignedPetition(id, wallet)` — read

## Anggota Kelompok

| Nama | NIM | Tugas            |
| ---- | --- | ---------------- |
| ...  | ... | Smart Contract   |
| ...  | ... | Frontend         |
| ...  | ... | Testing & Deploy |
