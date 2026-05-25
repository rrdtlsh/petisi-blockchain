import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  FileText,
  LayoutDashboard,
  Home,
  Info,
  Wallet,
  LogOut,
} from "lucide-react";
import { APP_INFO } from "../../constants";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/petitions", label: "Daftar Petisi", icon: FileText },
  { to: "/about", label: "Tentang", icon: Info },
];

export default function Navbar({ account, onConnect, onDisconnect, loading }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const shortAddr = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📜</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-gray-900 text-sm leading-tight">
                PetisiChain
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {APP_INFO.university}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    location.pathname === to
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:flex items-center gap-2">
            {account ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {shortAddr(account)}
                </div>
                <button
                  onClick={onDisconnect}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
              >
                <Wallet size={16} />
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors
                ${location.pathname === to ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100">
            {account ? (
              <div className="flex items-center justify-between px-3 py-2 bg-green-50 rounded-lg">
                <span className="text-green-700 text-sm font-medium">
                  {shortAddr(account)}
                </span>
                <button onClick={onDisconnect} className="text-red-500 text-xs">
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold"
              >
                <Wallet size={16} />
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
