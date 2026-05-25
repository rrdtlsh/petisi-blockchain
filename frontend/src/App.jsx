import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useWallet, usePetitions } from "./hooks/usePetition";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PetitionsPage from "./pages/PetitionsPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const { account, contract, loading, connectWallet, disconnectWallet } =
    useWallet();
  const {
    petitions,
    fetching,
    fetchPetitions,
    createPetition,
    signPetition,
    closePetition,
  } = usePetitions(contract, account);

  useEffect(() => {
    if (contract) fetchPetitions();
  }, [contract, fetchPetitions]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  const sharedProps = {
    account,
    contract,
    loading,
    connectWallet,
    petitions,
    fetching,
    fetchPetitions,
    createPetition,
    signPetition,
    closePetition,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        account={account}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        loading={loading}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage {...sharedProps} />} />
          <Route
            path="/dashboard"
            element={<DashboardPage {...sharedProps} />}
          />
          <Route
            path="/petitions"
            element={<PetitionsPage {...sharedProps} />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
