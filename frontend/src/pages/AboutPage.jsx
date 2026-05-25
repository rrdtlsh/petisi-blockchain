import { Shield, Code, Layers, GitBranch, ExternalLink } from "lucide-react";
import { APP_INFO, TEAM } from "../constants";

const techStack = [
  {
    name: "Solidity",
    version: "^0.8.19",
    desc: "Bahasa pemrograman smart contract",
    color: "bg-gray-800 text-gray-100",
    icon: "⛓️",
  },
  {
    name: "Hardhat",
    version: "^2.19",
    desc: "Framework development & testing blockchain",
    color: "bg-yellow-50 text-yellow-800",
    icon: "🪖",
  },
  {
    name: "React",
    version: "^18",
    desc: "Library UI modern berbasis komponen",
    color: "bg-blue-50 text-blue-800",
    icon: "⚛️",
  },
  {
    name: "ethers.js",
    version: "^6",
    desc: "Library interaksi dengan Ethereum blockchain",
    color: "bg-purple-50 text-purple-800",
    icon: "🔗",
  },
  {
    name: "TailwindCSS",
    version: "^4",
    desc: "Framework CSS utility-first modern",
    color: "bg-cyan-50 text-cyan-800",
    icon: "🎨",
  },
  {
    name: "MetaMask",
    version: "Latest",
    desc: "Wallet browser untuk transaksi blockchain",
    color: "bg-orange-50 text-orange-800",
    icon: "🦊",
  },
  {
    name: "SweetAlert2",
    version: "^11",
    desc: "Library popup & alert modern",
    color: "bg-pink-50 text-pink-800",
    icon: "🍬",
  },
  {
    name: "jsPDF + xlsx",
    version: "Latest",
    desc: "Export dokumen PDF dan Excel",
    color: "bg-green-50 text-green-800",
    icon: "📄",
  },
];

const architecture = [
  {
    layer: "Frontend Layer",
    items: ["React + Vite", "TailwindCSS", "React Router DOM", "Recharts"],
    color: "border-blue-300 bg-blue-50",
  },
  {
    layer: "Web3 Layer",
    items: [
      "ethers.js v6",
      "MetaMask Wallet",
      "BrowserProvider",
      "Contract ABI",
    ],
    color: "border-purple-300 bg-purple-50",
  },
  {
    layer: "Blockchain Layer",
    items: [
      "Solidity ^0.8.19",
      "Hardhat Local / Sepolia",
      "Smart Contract",
      "Events & Mappings",
    ],
    color: "border-green-300 bg-green-50",
  },
];

const features = [
  {
    icon: "📝",
    title: "Buat Petisi",
    desc: "Buat petisi dengan judul, penerima, latar belakang, dan tuntutan yang tersimpan permanen di blockchain.",
  },
  {
    icon: "✍️",
    title: "Tanda Tangan Digital",
    desc: "1 wallet hanya bisa menandatangani 1 kali per petisi, dijamin oleh smart contract.",
  },
  {
    icon: "🔒",
    title: "Validasi Blockchain",
    desc: "Semua validasi dijalankan di smart contract — tidak bisa dimanipulasi oleh siapapun.",
  },
  {
    icon: "📊",
    title: "Dashboard Statistik",
    desc: "Pantau statistik petisi, grafik tanda tangan, dan ringkasan data secara real-time.",
  },
  {
    icon: "📄",
    title: "Export PDF & Excel",
    desc: "Download data petisi dalam format PDF atau Excel untuk keperluan dokumentasi.",
  },
  {
    icon: "✏️",
    title: "Edit Petisi",
    desc: "Owner bisa mengedit petisi selama belum ada yang menandatangani.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-950 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Code size={14} />
            Final Project Blockchain — {APP_INFO.year}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Tentang PetisiChain
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Sistem tanda tangan petisi berbasis blockchain yang dibangun sebagai
            final project mata kuliah Blockchain di {APP_INFO.university}.
          </p>
        </div>
      </section>

      {/* Fitur */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Fitur Sistem</h2>
            <p className="text-gray-500 mt-2">
              Semua fitur terintegrasi langsung dengan blockchain
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arsitektur */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Arsitektur Sistem
            </h2>
            <p className="text-gray-500 mt-2">
              Tiga layer utama yang saling terhubung
            </p>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10">
            {[
              "👤 User",
              "🦊 MetaMask",
              "⚛️ React + ethers.js",
              "📜 Smart Contract",
              "⛓️ Blockchain",
            ].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-3">
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm whitespace-nowrap">
                  {item}
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-400 font-bold hidden md:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {architecture.map(({ layer, items, color }) => (
              <div key={layer} className={`border-2 rounded-2xl p-5 ${color}`}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers size={18} />
                  {layer}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Teknologi yang Digunakan
            </h2>
            <p className="text-gray-500 mt-2">
              Stack modern untuk development blockchain
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map(({ name, version, desc, color, icon }) => (
              <div
                key={name}
                className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${color}`}
                >
                  <span>{icon}</span>
                  {name}
                </div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  {version}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Contract Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Smart Contract</h2>
            <p className="text-gray-500 mt-2">Detail implementasi Solidity</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-blue-600" />
                Fungsi Write (Transaksi)
              </h3>
              <div className="space-y-3">
                {[
                  {
                    fn: "createPetition()",
                    desc: "Membuat petisi baru dengan validasi duplikat judul",
                  },
                  {
                    fn: "signPetition()",
                    desc: "Menandatangani petisi, 1 wallet 1 tanda tangan",
                  },
                  {
                    fn: "editPetition()",
                    desc: "Edit petisi oleh owner sebelum ada TTD",
                  },
                  { fn: "closePetition()", desc: "Menutup petisi oleh owner" },
                ].map(({ fn, desc }) => (
                  <div key={fn} className="flex gap-3">
                    <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono flex-shrink-0">
                      {fn}
                    </code>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GitBranch size={18} className="text-green-600" />
                Fungsi Read & Validasi
              </h3>
              <div className="space-y-3">
                {[
                  {
                    fn: "getPetition()",
                    desc: "Ambil data lengkap satu petisi",
                  },
                  {
                    fn: "getTotalPetitions()",
                    desc: "Total petisi yang tersimpan",
                  },
                  {
                    fn: "hasSignedPetition()",
                    desc: "Cek apakah wallet sudah TTD",
                  },
                  {
                    fn: "getSigners()",
                    desc: "Daftar semua wallet penandatangan",
                  },
                ].map(({ fn, desc }) => (
                  <div key={fn} className="flex gap-3">
                    <code className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-mono flex-shrink-0">
                      {fn}
                    </code>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 md:col-span-2">
              <h3 className="font-bold text-white mb-4">
                📋 Validasi Smart Contract (require)
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Judul minimal 15 karakter",
                  "Tidak boleh duplikat judul",
                  "1 wallet hanya bisa TTD 1x",
                  "Tidak bisa TTD petisi non-aktif",
                  "Hanya owner yang bisa edit/tutup",
                  "Edit hanya sebelum ada TTD",
                ].map((v) => (
                  <div
                    key={v}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <span className="text-green-400">✓</span>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tim Pengembang</h2>
            <p className="text-gray-500 mt-2">
              {APP_INFO.university} · {APP_INFO.faculty} · {APP_INFO.year}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, nim, role, icon }) => (
              <div
                key={nim}
                className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {icon}
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-mono">{nim}</p>
                <span className="inline-block mt-3 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penutup */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold mb-3">Final Project Blockchain</h2>
          <p className="text-blue-200 text-sm leading-relaxed">
            Project ini dibuat sebagai implementasi praktis dari materi
            perkuliahan Blockchain. Seluruh logika bisnis berjalan di atas smart
            contract Solidity yang deployed di jaringan Hardhat Local / Sepolia
            Testnet.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-5 py-2.5 text-sm">
            <ExternalLink size={14} />
            {APP_INFO.university} · {APP_INFO.faculty} · {APP_INFO.year}
          </div>
        </div>
      </section>
    </div>
  );
}
