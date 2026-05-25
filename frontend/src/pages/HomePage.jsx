import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  Eye,
} from "lucide-react";
import { APP_INFO, TEAM } from "../constants";

const features = [
  {
    icon: Shield,
    title: "Transparan",
    desc: "Setiap tanda tangan tercatat permanen di blockchain, tidak bisa dimanipulasi.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: Lock,
    title: "Aman",
    desc: "Validasi wallet memastikan 1 wallet hanya bisa menandatangani 1 kali per petisi.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Eye,
    title: "Terverifikasi",
    desc: "Semua data bisa diverifikasi siapa saja langsung dari blockchain.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: Zap,
    title: "Cepat",
    desc: "Transaksi dikonfirmasi dalam hitungan detik di jaringan blockchain.",
    color: "bg-orange-50 text-orange-700",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect Wallet",
    desc: "Hubungkan MetaMask Anda untuk mulai menggunakan platform.",
  },
  {
    n: "02",
    title: "Buat Petisi",
    desc: "Isi form petisi lengkap dengan judul, penerima, dan tuntutan.",
  },
  {
    n: "03",
    title: "Publikasikan",
    desc: "Petisi tersimpan permanen di blockchain setelah konfirmasi transaksi.",
  },
  {
    n: "04",
    title: "Kumpulkan TTD",
    desc: "Bagikan petisi Anda dan kumpulkan tanda tangan dari komunitas.",
  },
];

export default function HomePage({ account, onConnect, petitions }) {
  const activePetitions = petitions?.filter((p) => p.isActive).length || 0;
  const totalSignatures =
    petitions?.reduce((s, p) => s + p.signatureCount, 0) || 0;

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Blockchain · {APP_INFO.university}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Petisi Digital
            <br />
            <span className="text-blue-300">Berbasis Blockchain</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform petisi mahasiswa yang transparan, aman, dan tidak dapat
            dimanipulasi. Setiap tanda tangan tercatat permanen di blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/petitions"
              className="inline-flex items-center gap-2 bg-white text-blue-800 px-7 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors shadow-lg"
            >
              <FileText size={20} />
              Lihat Petisi
              <ArrowRight size={18} />
            </Link>
            {!account && (
              <button
                onClick={onConnect}
                className="inline-flex items-center gap-2 bg-blue-600 border border-blue-400 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors"
              >
                🦊 Connect MetaMask
              </button>
            )}
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: "Total Petisi", value: petitions?.length || 0 },
              { label: "Petisi Aktif", value: activePetitions },
              { label: "Total TTD", value: totalSignatures },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-2"
              >
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FITUR ────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Mengapa PetisiChain?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Teknologi blockchain memastikan setiap petisi transparan dan tidak
              dapat dimanipulasi oleh pihak manapun.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARA PENGGUNAAN ──────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Cara Penggunaan
            </h2>
            <p className="text-gray-500 mt-3">
              Mulai gunakan PetisiChain dalam 4 langkah mudah
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <span className="text-4xl font-extrabold text-blue-100">
                    {n}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISI MISI ────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-700 text-white rounded-2xl p-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-3">Visi</h3>
              <p className="text-blue-100 leading-relaxed">
                Menjadi platform petisi mahasiswa terpercaya berbasis teknologi
                blockchain yang mendorong transparansi, akuntabilitas, dan
                partisipasi aktif civitas akademika {APP_INFO.university}.
              </p>
            </div>
            <div className="bg-gray-900 text-white rounded-2xl p-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-3">Misi</h3>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-400 mt-0.5 flex-shrink-0"
                  />
                  Mengimplementasikan blockchain untuk transparansi data petisi
                </li>
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-400 mt-0.5 flex-shrink-0"
                  />
                  Memastikan setiap suara mahasiswa tercatat dan tidak dapat
                  dimanipulasi
                </li>
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-400 mt-0.5 flex-shrink-0"
                  />
                  Mendorong partisipasi digital mahasiswa secara aman dan
                  terverifikasi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIM ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tim Pengembang</h2>
            <p className="text-gray-500 mt-3">
              {APP_INFO.university} · {APP_INFO.faculty} · {APP_INFO.year}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, nim, role, icon }) => (
              <div
                key={nim}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  {icon}
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{nim}</p>
                <span className="inline-block mt-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Siap Membuat Petisi?</h2>
          <p className="text-blue-200 mb-8">
            Suarakan aspirasi Anda secara transparan dan terverifikasi di
            blockchain.
          </p>
          <Link
            to="/petitions"
            className="inline-flex items-center gap-2 bg-white text-blue-800 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Mulai Sekarang <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
