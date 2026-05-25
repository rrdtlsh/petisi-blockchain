import { APP_INFO } from "../../constants";
import ContractData from "../../contracts/PetitionSystem.json";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold text-sm">⛓️ PetisiChain</p>
            <p className="text-xs mt-1">
              {APP_INFO.university} — Blockchain Final Project {APP_INFO.year}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs">Smart Contract</p>
            <p className="font-mono text-xs text-blue-400 mt-0.5 break-all">
              {ContractData.address}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs">Powered by</p>
            <p className="text-xs text-white mt-0.5">
              Solidity · Hardhat · React · ethers.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
