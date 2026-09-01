import Link from "next/link";
import {
  Wallet,
  ArrowRight,
  PieChart,
  ShieldCheck,
  Zap,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      {/* Header / Top Navigation */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/25">
              <Wallet size={24} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Expense<span className="text-blue-500">Flow</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white text-sm font-medium transition px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-24 px-6 max-w-6xl mx-auto text-center overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Zap size={14} /> Production-Ready Financial SaaS Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Smart Expense Tracking for Modern Individuals & Teams
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Take full control of your money with instant categorization, real-time analytics, exportable financial reports, and multi-currency support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 text-base"
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl transition text-base"
            >
              Open Dashboard
            </Link>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">
              Everything You Need to Master Your Budget
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Engineered with clean architecture, security, and intuitive financial tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/40 transition">
              <div className="bg-blue-500/10 text-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Real-Time Insights
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Track income versus expenses dynamically with auto-calculated balance cards and charts.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/40 transition">
              <div className="bg-emerald-500/10 text-emerald-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Multi-Currency Support
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seamlessly format transactions in INR (₹), USD ($), EUR (€), GBP (£), and global currencies.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/40 transition">
              <div className="bg-indigo-500/10 text-indigo-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Export Financial Reports
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Generate clean financial summaries and export transaction records to CSV spreadsheets instantly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} ExpenseFlow SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}
