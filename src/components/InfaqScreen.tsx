import React, { useState } from 'react';
import { Donation } from '../types';
import { 
  Heart, 
  CheckCircle2, 
  Building, 
  Coins, 
  Smartphone, 
  HelpCircle,
  FileSpreadsheet,
  Award,
  Wallet,
  Sparkles
} from 'lucide-react';

export default function InfaqScreen() {
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showQRReceipt, setShowQRReceipt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Transaction history starts with these defaults (mocking screen 8 exactly!)
  const [history, setHistory] = useState<Donation[]>([
    { id: 'tx-1', amount: 500000, date: '29 Jun 2022', source: 'Siti Walidah Donation' },
    { id: 'tx-2', amount: 150000, date: '21 Jun 2022', source: 'Friday Berkah Charity' },
    { id: 'tx-3', amount: 30000, date: '15 Jun 2022', source: 'Mosque Maintenance' },
  ]);

  const handleQuickAmount = (val: number) => {
    setSelectedQuickAmount(val);
    setCustomAmount(val.toString());
  };

  const handleDonateNow = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customAmount);
    if (isNaN(parsed) || parsed <= 0) {
      alert('Please select or specify a valid donation amount.');
      return;
    }

    // Trigger QR receipts window and add donation to local logs
    setShowQRReceipt(true);

    const newDonation: Donation = {
      id: `tx-new-${Date.now()}`,
      amount: parsed,
      date: new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }),
      source: 'Online Digital Infaq',
    };

    setHistory(prev => [newDonation, ...prev]);
    setToastMessage(`MashaAllah! Infaq proposal of Rp${parsed.toLocaleString('id-ID')} has been initiated. Scan below to verify transaction.`);
    
    setTimeout(() => {
      setToastMessage('');
    }, 6000);
  };

  return (
    <div className="animate-fade-in relative">
      {/* Top App Bar inside main page */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-sm h-16 flex justify-between items-center px-5 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
            <img 
              alt="Mosque Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJjsNVce7VvZVQOmvpIiONTtU79FHIdoN4Zr1Vti6iG7V6ptmnzD7Lb__SjO_rhARkcq4pk-iYIhSB2RAJqBelqESkmY8VnSaXICTTFXqjyeJElD4TxfViivJ9zolwFiQd30ZicWJJXtJZmW8lerHoM7Zs1gwbcELCDBV6yGTjHT34VmJdONBblDKuDxqnXS1GDoGwDVjSI1QS-upQDBDqW8Ex-BhKXoZ3PqFwLyj-6pEIbsqEfHI3fE_oE6m3ZAUsVQ"
            />
          </div>
          <span className="font-display font-bold text-lg text-primary text-[20px]">MyIbadah Infaq</span>
        </div>
        <button 
          onClick={() => alert('Mosque Finance Office (BAZNAS UMY Partnership): infaq-baznas@umy.ac.id')}
          className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors focus:outline-none"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </header>

      {/* Main layout container */}
      <main className="pt-20 pb-24 px-5 max-w-xl mx-auto">
        
        {/* Hero visual banner of the majestic mosque */}
        <section className="mb-6">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-md group select-none">
            <img 
              alt="Majestic Mosque Interior Design" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLsSG2Ti8oUGB7leuKyZvS_Dmd6d9gN4z_fZX5GI2bQvcsVQICqLwOS98j3UQNIdFp0u8WesE6QHTCRlOtyB8AAx4IZs6wdAPXXLo49r1jVSGJggnClMix3JSWhN1OoYVKJ2cwtcF86VlRt5rxONWQMhprdgb2XM9ldHaIFXe4XE9CExaHkuYP5nfJ9W2DZSvS2ZlRysH5NofqvDdvX3lDt62rMT2XhhfgzI_RTq7cuiO2xZQZyJ5MrgQoNY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00341c]/90 via-[#00341c]/40 to-transparent flex flex-col justify-end p-5">
              <h2 className="text-white font-display text-xl sm:text-2xl font-bold leading-tight flex items-center gap-1">
                <Sparkles className="w-5 h-5 text-secondary-container" />
                Support Your Mosque
              </h2>
              <p className="text-white/90 font-sans text-xs leading-relaxed mt-1">
                Empower spiritual growth, education, and physical campus mosque utility maintenance through secure digital Infaq.
              </p>
            </div>
          </div>
        </section>

        {/* Status Toast Alert */}
        {toastMessage && (
          <div className="mb-6 bg-primary-container border-l-4 border-secondary text-white text-xs p-4 rounded-r-lg shadow-md font-sans">
            <div className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-5 h-5 text-secondary-container flex-shrink-0 mt-0.5" />
              <p className="leading-tight">{toastMessage}</p>
            </div>
          </div>
        )}

        {/* Input & quick actions donation card */}
        <section className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border-l-4 border-secondary border border-outline-variant/30 shadow-sm">
            <h3 className="font-display text-base font-bold text-primary mb-4 flex items-center gap-1.5 border-b border-outline-variant/10 pb-1.5">
              <Coins className="w-5 h-5 text-secondary" />
              Choose Amount
            </h3>

            {/* Quick action buttons grid layout */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[5000, 10000, 20000].map((amt) => {
                const isActive = selectedQuickAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickAmount(amt)}
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all duration-200 active:scale-95 focus:outline-none ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'border-outline-variant hover:border-primary hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-wider mb-1 ${isActive ? 'text-white/75' : 'text-on-surface-variant'}`}>
                      Infaq
                    </span>
                    <span className="font-display font-extrabold text-sm sm:text-base">
                      Rp{(amt / 1000).toFixed(0)}.000
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Enter Custom Amount in IDR */}
            <form onSubmit={handleDonateNow} className="space-y-4">
              <div className="space-y-1.5 bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 focus-within:border-primary transition-all">
                <label className="block font-mono text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                  Or Enter Custom Amount
                </label>
                <div className="flex items-center">
                  <span className="font-display font-black text-lg text-on-surface-variant mr-1.5 focus:outline-none select-none">
                    Rp
                  </span>
                  <input 
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setSelectedQuickAmount(null);
                      setCustomAmount(e.target.value);
                    }}
                    placeholder="0"
                    className="bg-transparent border-none focus:ring-0 w-full font-display font-extrabold text-xl text-on-surface placeholder:text-outline outline-none"
                  />
                </div>
              </div>

              {/* Action Submit */}
              <button 
                type="submit"
                className="w-full bg-primary-container hover:bg-opacity-95 text-white py-4 rounded-xl font-display text-base font-bold shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 text-secondary-fixed fill-secondary-fixed" />
                <span>Donate Now</span>
              </button>
            </form>
          </div>

          {/* Secure Payment with QRIS Vector Card container */}
          {(showQRReceipt || customAmount) && (
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-center">
              <p className="font-mono text-[10px] uppercase text-on-surface-variant font-bold mb-4 tracking-widest text-center border-b border-outline-variant/10 pb-1.5 w-full">
                SECURE PAYMENT INTEGRATION
              </p>

              {/* Visual Simulated QRIS Pattern */}
              <div className="w-52 h-52 bg-white border-2 border-primary/20 p-4 rounded-xl relative flex items-center justify-center shadow-inner">
                <svg className="text-primary w-full h-full" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="white" />
                  {/* Outer markers */}
                  <path d="M10 10h20v5H10zM10 10v20h5V10zM25 10v20h5V10zM10 25h20v5H10z" fill="currentColor" />
                  <path d="M70 10h20v5H70zM70 10v20h5V10zM85 10v20h5V10zM70 25h20v5H70z" fill="currentColor" />
                  <path d="M10 70h20v5H10zM10 70v20h5V70zM25 70v20h5V70zM10 85h20v5H10z" fill="currentColor" />
                  {/* Central QR payload codes */}
                  <rect x="35" y="35" width="30" height="30" fill="currentColor" opacity="0.12" />
                  <path d="M40 40h5v5h-5zM55 40h5v5h-5zM40 55h5v5h-5zM55 55h5v5h-5z" fill="currentColor" />
                  <path d="M45 45h10v5h-10zM45 50h5v5h-5zM50 45h5v10h-5z" fill="currentColor" opacity="0.6" />
                </svg>
                
                {/* Visual QRIS Stamp in corner */}
                <div className="absolute bottom-2 right-2 flex gap-0.5 items-center bg-white px-1.5 py-0.5 rounded border border-outline-variant font-black select-none text-[8px]">
                  <span className="text-[#ed1c24]">QR</span>
                  <span className="text-[#2e3192]">IS</span>
                </div>
              </div>

              <p className="mt-4 text-center text-on-surface-variant text-xs leading-normal max-w-[240px]">
                Scan this dynamic QRIS with ShopeePay, GoPay, OVO, LinkAja, or your Bank UMY mobile app to settle instantly.
              </p>

              {/* Supported mobile wallets */}
              <div className="mt-5 flex items-center justify-center gap-6 text-primary/30 py-2 border-t border-outline-variant/10 w-full">
                <Wallet className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" title="Bank Transfer" />
                <Smartphone className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" title="E-Wallet Scan" />
                <Building className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" title="SSO Auto-Debit" />
              </div>
            </div>
          )}

          {/* Previous transactions made */}
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-display text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4.5 h-4.5 text-primary" />
              Transaction History
            </h3>
            
            <div className="divide-y divide-outline-variant/10 space-y-1.5">
              {history.map((tx) => (
                <div key={tx.id} className="pt-2 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-on-surface">{tx.source}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant mt-0.5">{tx.date}</p>
                  </div>
                  <span className="font-display font-extrabold text-primary bg-primary-fixed/30 px-3 py-1 rounded-lg">
                    +Rp{tx.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-surface-container-low p-4 rounded-xl shadow-sm border border-secondary/10">
              <h4 className="font-display font-bold text-secondary text-sm mb-1.5 flex items-center gap-1">
                <Award className="w-4 h-4 text-secondary" />
                Transparency
              </h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                100% of your digital Infaq is supervised by UMY Sharia Audit Committee. Every Rupiah goes straight to student basic scholarships &amp; facility expansion.
              </p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl shadow-sm border border-secondary/10">
              <h4 className="font-display font-bold text-secondary text-sm mb-1.5 flex items-center gap-1">
                <FileSpreadsheet className="w-4 h-4 text-secondary" />
                Official Receipt Note
              </h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Each digital Infaq registers directly to your UMY student tax deduction token, queryable under the official Spiritual consultation billing ledger.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
