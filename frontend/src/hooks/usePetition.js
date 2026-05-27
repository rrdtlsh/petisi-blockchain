import { useState, useCallback } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import ContractData from "../contracts/PetitionSystem.json";

const CONTRACT_ADDRESS = ContractData.address;
const CONTRACT_ABI = ContractData.abi;

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      Swal.fire({
        icon: "error",
        title: "MetaMask tidak ditemukan!",
        text: "Silakan install MetaMask terlebih dahulu.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setAccount(accounts[0]);
      setContract(instance);
      Swal.fire({
        icon: "success",
        title: "Wallet Terhubung!",
        text: `Akun: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Connect",
        text: err.message,
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
  };

  return { account, contract, loading, connectWallet, disconnectWallet };
}

export function usePetitions(contract, account) {
  const [petitions, setPetitions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchPetitions = useCallback(async () => {
    if (!contract) return;
    try {
      setFetching(true);
      const total = await contract.getTotalPetitions();
      const totalNum = Number(total);
      if (totalNum === 0) {
        setPetitions([]);
        return;
      }

      const data = await Promise.all(
        Array.from({ length: totalNum }, (_, i) => i + 1).map(async (id) => {
          try {
            const p = await contract.getPetition(id);
            const signed = account ? await contract.hasSignedPetition(id, account) : false;

            const closedAtValue = p.closedAt ? Number(p.closedAt) : 0;
            return {
              id: p.id.toString(),
              title: p.title,
              recipient: p.recipient,
              background: p.background,
              demands: p.demands,
              creator: p.creator,
              signatureCount: Number(p.signatureCount),
              createdAt: new Date(Number(p.createdAt) * 1000),
              updatedAt: new Date(Number(p.updatedAt) * 1000),
              closedAt: closedAtValue > 0 ? new Date(closedAtValue * 1000) : null,
              isActive: p.isActive,
              hasSigned: signed,
            };
          } catch {
            return null;
          }
        }),
      );
      setPetitions(data.filter(Boolean).reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, [contract, account]);

  const createPetition = async (title, recipient, background, demands) => {
    if (!contract) return false;
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Publikasi",
        html: `Petisi <b>"${title}"</b> akan disimpan permanen di blockchain.<br/>Pastikan data sudah benar!`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Publikasikan!",
        cancelButtonText: "Batal",
        confirmButtonColor: "#2563eb",
      });
      if (!result.isConfirmed) return false;

      Swal.fire({
        title: "Mengirim transaksi...",
        text: "Mohon tunggu konfirmasi blockchain",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const tx = await contract.createPetition(title, recipient, background, demands);
      await tx.wait();

      await Swal.fire({
        icon: "success",
        title: "Petisi Berhasil Dibuat!",
        text: "Petisi Anda telah tersimpan di blockchain.",
        confirmButtonColor: "#2563eb",
      });
      await fetchPetitions();
      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err.reason || err.message,
        confirmButtonColor: "#2563eb",
      });
      return false;
    }
  };

  const signPetition = async (petitionId, title) => {
    if (!contract) return;
    try {
      const result = await Swal.fire({
        title: "Tanda Tangani Petisi?",
        html: `Anda akan menandatangani petisi:<br/><b>"${title}"</b><br/><br/>Tindakan ini <b>tidak dapat dibatalkan</b>.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Tanda Tangani!",
        cancelButtonText: "Batal",
        confirmButtonColor: "#16a34a",
      });
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Memproses...",
        text: "Menunggu konfirmasi blockchain",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const tx = await contract.signPetition(petitionId);
      await tx.wait();

      await Swal.fire({
        icon: "success",
        title: "Berhasil Ditandatangani!",
        text: "Tanda tangan Anda telah tercatat di blockchain.",
        confirmButtonColor: "#16a34a",
        timer: 3000,
      });
      await fetchPetitions();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err.reason || err.message,
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const closePetition = async (petitionId, title) => {
    if (!contract) return;
    try {
      const result = await Swal.fire({
        title: "Tutup Petisi?",
        html: `Petisi <b>"${title}"</b> akan ditutup dan tidak bisa menerima tanda tangan baru.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Tutup!",
        cancelButtonText: "Batal",
        confirmButtonColor: "#dc2626",
      });
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Menutup petisi...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      const tx = await contract.closePetition(petitionId);
      await tx.wait();

      await Swal.fire({
        icon: "success",
        title: "Petisi Ditutup!",
        confirmButtonColor: "#2563eb",
        timer: 2000,
      });
      await fetchPetitions();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err.reason || err.message,
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return {
    petitions,
    fetching,
    fetchPetitions,
    createPetition,
    signPetition,
    closePetition,
  };
}
