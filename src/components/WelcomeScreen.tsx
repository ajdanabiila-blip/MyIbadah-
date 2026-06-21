import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Loader2, Key, Eye, EyeOff } from 'lucide-react';

interface WelcomeScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function WelcomeScreen({ onLoginSuccess }: WelcomeScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState<'sso' | 'manual' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSSOLogin = () => {
    setIsLoggingIn('sso');
    // Simulate real SSO handshake
    setTimeout(() => {
      onLoginSuccess({
        email: 'ajdanabiila@student.umy.ac.id',
        name: 'Ajda Nabiila',
        nim: '20230140092',
        avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLsxSunHGke5OnnQnss6qz065Zx510f9Gnrg8EXnn2gaLICzwpMhpPugUiHxio38wFQGIqoteiuXLzEZVWo6GZxlr6RBMWrhhHWin_XB7f30wMvhEWR-z33Y8e15lkCT8XIC3yp0RhZVqdgMjlHP_E_fjDbVytE-lKXbAZnhrbefCLdenCrYsJF8mggcKLanIaBmuy-0AGSwTNLJFVjR_KmUVAdtfKwGNyOkt_siEeHV_kEL77rSSzSQ8ZI',
      });
      setIsLoggingIn(null);
    }, 1200);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Student Email is required');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required');
      return;
    }

    setErrorMessage('');
    setIsLoggingIn('manual');

    setTimeout(() => {
      onLoginSuccess({
        email: email,
        name: email.split('@')[0].toUpperCase(),
        nim: '20230240185',
        avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuh8xN9_VM0oRKtF-aqZ10G-xah-4sTuMlLUVRvBCWndpVZwGJqznXa7znI9ZI-E1YG3u_zxB-2yiayYlGhF5mtDD8PnGA9IHNSSbb2eFG2bvIz8fq81JiFlY2yj3VhrX0qB2I2NmBFLLHJEX02NoUCYayHAh_xGkmCY0U7p_fpTxGoe17Kfn716c3n_Gnc6dJint45V8jUJ3YnBC4fu9vgnoRSgM9M8vCXp_6Uc77WS6N4gTSE_XmhrsEm',
      });
      setIsLoggingIn(null);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Decorative dot pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#004d2c 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md border-2 border-surface-container-high transition-transform duration-300 hover:scale-105">
            <img 
              alt="Masjid KH. Ahmad Dahlan Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT9A1EMHq4YnYVicCDj5RL2ggrPQRZXeKWH0JLqJ1Ysjr6iTOm92PN7L7ClxVTI3s62wOqxqQd-OlGs4HBt0253iVluhPnX8RFQ2XyCqrhng9tWhOC7aCzqWDDggLwbC6CvQHZuAj-q1TCUaPlaPPuBBkUkTvbull-MHkigP5fNSIbBdjHlQ9_24supQ5E8znkYFxuEeiIPYuPDBiizf21d9O4GDcScsoCSRxtNbjrqaALahGOeq0IKeGf5DBz-4a3im0"
            />
          </div>
          <h1 className="font-display text-4xl font-bold text-primary tracking-tight">MyIbadah</h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1.5 font-medium">Academic Spirituality Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-xl border border-outline-variant/30 relative">
          <div className="space-y-6">
            {/* SSO Action */}
            <button 
              id="sso-login-btn"
              onClick={handleSSOLogin}
              disabled={isLoggingIn !== null}
              className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-display text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-200 active:scale-98 shadow-md hover:bg-opacity-95 disabled:opacity-80"
            >
              {isLoggingIn === 'sso' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Key className="w-5 h-5" />
              )}
              <span>Login with SSO UMY</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="h-[1px] flex-1 bg-outline-variant/50"></div>
              <span className="font-mono text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                Or login manually
              </span>
              <div className="h-[1px] flex-1 bg-outline-variant/50"></div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-error-container/40 border border-error/20 text-error text-sm p-3 rounded-lg text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-display text-sm font-semibold text-primary ml-1 block">
                  Student Email
                </label>
                <div className="relative">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nim@student.umy.ac.id"
                    disabled={isLoggingIn !== null}
                    className="w-full bg-surface-container-low border border-outline-variant p-3.5 pr-10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none font-sans text-sm"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-sm font-semibold text-primary ml-1 block">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoggingIn !== null}
                    className="w-full bg-surface-container-low border border-outline-variant p-3.5 pr-10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none font-sans text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-surface-container rounded transition-colors text-on-surface-variant focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button 
                  type="button" 
                  onClick={() => {
                    setEmail('nim@student.umy.ac.id');
                    setPassword('secured_auth_pass');
                    setErrorMessage('Sample email loaded for quick check.');
                  }}
                  className="font-sans text-xs font-semibold text-secondary hover:text-opacity-95 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit"
                disabled={isLoggingIn !== null}
                className="w-full border-2 border-secondary text-secondary hover:bg-secondary/5 py-4 rounded-lg font-display text-lg font-bold transition-all duration-200 active:scale-98 mt-2 disabled:opacity-80 flex items-center justify-center gap-2"
              >
                {isLoggingIn === 'manual' && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>Sign In</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="font-sans text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <button 
              onClick={handleSSOLogin}
              className="text-primary font-bold hover:underline"
            >
              Register Here
            </button>
          </p>
          <div className="flex justify-center items-center gap-3">
            <button className="font-mono text-xs text-outline hover:text-on-surface transition-colors">
              Privacy Policy
            </button>
            <div className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
            <button 
              onClick={() => {
                alert('UMY Universitas Muhammadiyah Yogyakarta IT Helpdesk Contact: support-it@umy.ac.id | Tel: +62 274 387656');
              }}
              className="font-mono text-xs text-outline hover:text-on-surface transition-colors"
            >
              IT Helpdesk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
