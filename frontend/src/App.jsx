import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import ContractData from "./contracts/PetitionSystem.json";
import ConnectWallet from "./components/ConnectWallet";
import CreatePetition from "./components/CreatePetition";
import PetitionList from "./components/PetitionList";
import "./App.css";

// ─── Konstanta Contract ───────────────────────────────────
const CONTRACT_ADDRESS = ContractData.address;
const CONTRACT_ABI = ContractData.abi;

export default function App() {
  const [account, setAccount] = useState(null); // wallet address aktif
  const [provider, setProvider] = useState(null); // ethers provider
  const [signer, setSigner] = useState(null); // signer untuk write tx
  const [contract, setContract] = useState(null); // instance contract
  const [petitions, setPetitions] = useState([]); // list semua petisi
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // ── Connect MetaMask ────────────────────────────────────
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert(
        "MetaMask tidak terdeteksi! Silakan install MetaMask terlebih dahulu.",
      );
      return;
    }

    try {
      setLoading(true);

      // Minta akses akun
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();

      // Instance contract: read-only pakai provider, write pakai signer
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        web3Signer,
      );

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(contractInstance);
      setStatusMsg("✅ Wallet terhubung!");
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Gagal connect wallet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch semua petisi dari blockchain ──────────────────
  const fetchPetitions = useCallback(async () => {
    if (!contract) return;

    try {
      setLoading(true);

      // Ambil semua ID petisi
      const ids = await contract.getAllPetitionIds();

      // Fetch data tiap petisi
      const petitionData = await Promise.all(
        ids.map(async (id) => {
          const p = await contract.getPetition(id);
          const signed = account
            ? await contract.hasSignedPetition(id, account)
            : false;

          return {
            id: p.id.toString(),
            title: p.title,
            description: p.description,
            creator: p.creator,
            signatureCount: p.signatureCount.toString(),
            createdAt: new Date(Number(p.createdAt) * 1000).toLocaleDateString(
              "id-ID",
            ),
            isActive: p.isActive,
            hasSigned: signed,
          };
        }),
      );

      // Tampilkan petisi terbaru di atas
      setPetitions(petitionData.reverse());
    } catch (err) {
      console.error("Error fetch petitions:", err);
      setStatusMsg("❌ Gagal memuat data petisi");
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  // ── Buat petisi baru ────────────────────────────────────
  const handleCreatePetition = async (title, description) => {
    if (!contract) return;

    try {
      setLoading(true);
      setStatusMsg("⏳ Mengirim transaksi...");

      const tx = await contract.createPetition(title, description);
      setStatusMsg("⏳ Menunggu konfirmasi blockchain...");

      await tx.wait(); // tunggu 1 block konfirmasi

      setStatusMsg("✅ Petisi berhasil dibuat!");
      await fetchPetitions(); // refresh list
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Gagal membuat petisi: " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ── Tanda tangani petisi ────────────────────────────────
  const handleSignPetition = async (petitionId) => {
    if (!contract) return;

    try {
      setLoading(true);
      setStatusMsg("⏳ Menandatangani petisi...");

      const tx = await contract.signPetition(petitionId);
      setStatusMsg("⏳ Menunggu konfirmasi blockchain...");

      await tx.wait();

      setStatusMsg("✅ Petisi berhasil ditandatangani!");
      await fetchPetitions();
    } catch (err) {
      console.error(err);
      // Tampilkan pesan error dari contract (require message)
      setStatusMsg("❌ " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ── Tutup petisi ────────────────────────────────────────
  const handleClosePetition = async (petitionId) => {
    if (!contract) return;

    try {
      setLoading(true);
      setStatusMsg("⏳ Menutup petisi...");

      const tx = await contract.closePetition(petitionId);
      await tx.wait();

      setStatusMsg("✅ Petisi berhasil ditutup!");
      await fetchPetitions();
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-fetch saat contract tersedia ───────────────────
  useEffect(() => {
    if (contract) {
      fetchPetitions();
    }
  }, [contract, fetchPetitions]);

  // ── Listen perubahan akun MetaMask ──────────────────────
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setContract(null);
          setStatusMsg("Wallet terputus");
        } else {
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📜</span>
            <div>
              <h1>PetisiChain</h1>
              <p className="tagline">Sistem Petisi Berbasis Blockchain</p>
            </div>
          </div>
          <ConnectWallet
            account={account}
            onConnect={connectWallet}
            loading={loading}
          />
        </div>
      </header>

      <main className="app-main">
        {statusMsg && (
          <div
            className={`status-bar ${statusMsg.startsWith("❌") ? "error" : statusMsg.startsWith("✅") ? "success" : "info"}`}
          >
            {statusMsg}
          </div>
        )}

        {!account ? (
          <div className="hero">
            <div className="hero-icon">🔗</div>
            <h2>Selamat Datang di PetisiChain</h2>
            <p>
              Hubungkan wallet MetaMask Anda untuk mulai membuat atau
              menandatangani petisi secara transparan di blockchain.
            </p>
            <button className="btn-primary large" onClick={connectWallet}>
              Hubungkan MetaMask
            </button>
          </div>
        ) : (
          <div className="dashboard">
            <CreatePetition onCreate={handleCreatePetition} loading={loading} />
            <PetitionList
              petitions={petitions}
              account={account}
              onSign={handleSignPetition}
              onClose={handleClosePetition}
              onRefresh={fetchPetitions}
              loading={loading}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>⛓️ Blockchain Final Project — Sistem Petisi Terdesentralisasi</p>
        <p className="contract-addr">Contract: {CONTRACT_ADDRESS}</p>
      </footer>
    </div>
  );
}
