const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("========================================");
  console.log("  DEPLOY: PetitionSystem Smart Contract");
  console.log("========================================\n");

  // Ambil deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📦 Deployer address :", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance          :", ethers.formatEther(balance), "ETH\n");

  // Deploy contract
  console.log("🚀 Deploying PetitionSystem...");
  const PetitionSystem = await ethers.getContractFactory("PetitionSystem");
  const contract = await PetitionSystem.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ Contract deployed ke:", contractAddress);

  // Simpan address & ABI ke folder frontend
  await saveContractData(contractAddress);

  console.log("\n========================================");
  console.log("  DEPLOY SELESAI!");
  console.log("========================================");
  console.log("📋 Contract Address:", contractAddress);
  console.log("📁 ABI & address disimpan di: frontend/src/contracts/");
  console.log("\n⚠️  PENTING: Tambahkan network Hardhat di MetaMask:");
  console.log("   - Network Name : Hardhat Local");
  console.log("   - RPC URL      : http://127.0.0.1:8545");
  console.log("   - Chain ID     : 31337");
  console.log("   - Currency     : ETH");
}

async function saveContractData(contractAddress) {
  // Path ke folder frontend
  const frontendContractsDir = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "src",
    "contracts"
  );

  // Buat folder jika belum ada
  if (!fs.existsSync(frontendContractsDir)) {
    fs.mkdirSync(frontendContractsDir, { recursive: true });
  }

  // Ambil ABI dari artifact hasil compile
  const artifact = require("../artifacts/contracts/PetitionSystem.sol/PetitionSystem.json");

  // Simpan file JSON yang akan dipakai frontend
  const contractData = {
    address: contractAddress,
    abi: artifact.abi,
  };

  fs.writeFileSync(
    path.join(frontendContractsDir, "PetitionSystem.json"),
    JSON.stringify(contractData, null, 2)
  );

  console.log("💾 Contract data tersimpan ke frontend/src/contracts/PetitionSystem.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
