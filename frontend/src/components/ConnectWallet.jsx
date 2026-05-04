// ConnectWallet.jsx
// Komponen tombol connect/disconnect wallet dan tampilan alamat

export default function ConnectWallet({ account, onConnect, loading }) {
  // Potong alamat wallet: 0x1234...abcd
  const shortAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="wallet-section">
      {account ? (
        <div className="wallet-connected">
          <span className="wallet-dot" />
          <span className="wallet-address">{shortAddress(account)}</span>
        </div>
      ) : (
        <button
          className="btn-connect"
          onClick={onConnect}
          disabled={loading}
        >
          {loading ? "Connecting..." : "🦊 Connect Wallet"}
        </button>
      )}
    </div>
  );
}
