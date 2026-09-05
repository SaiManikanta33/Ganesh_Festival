import React, { useState } from 'react';
import { Bell, Flame, Heart, Share2, Sparkles, Volume2 } from 'lucide-react';
import { playConchSound, playTempleBell } from '../utils/audio';

export default function Footer({ onOpenUpload }) {
  const [bellRinging, setBellRinging] = useState(false);

  const handleConch = () => {
    playConchSound();
  };

  const handleBell = () => {
    setBellRinging(true);
    playTempleBell();
    setTimeout(() => setBellRinging(false), 800);
  };

  return (
    <footer className="w-full bg-[#2C2C2C] border-t border-hunt-yellow/30 text-[#F3F4F4]/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Banner with SVS Youth Tirupati Logo & Shloka */}
        <div className="glass-card-gold p-6 rounded-3xl text-center space-y-4 relative overflow-hidden border-2 border-hunt-yellow/50 shadow-2xl">
          <div className="flex items-center justify-center space-x-3">
            <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-hunt-yellow shadow-lg" />
            <h3 className="text-2xl font-heading text-gold-gradient font-bold">SVS YOUTH - TIRUPATI</h3>
          </div>

          <p className="text-sm font-semibold tracking-widest text-hunt-yellow uppercase">
            UNITY • FAITH • SERVICE
          </p>

          <span className="block text-xl sm:text-2xl font-bold font-heading text-saffron-gradient pt-2">
            Make Memories <span className="text-hunt-yellow">!</span> Share Devotion <span className="text-hunt-yellow">!</span> Celebrate Ganesh Chaturthi <span className="text-hunt-yellow">!</span>
          </span>

          {/* Audio Action Triggers */}
          <div className="flex justify-center space-x-3 pt-2">
        
            <button
              onClick={handleBell}
              className={`px-5 py-2.5 rounded-full bg-hunt-yellow/20 border border-hunt-yellow/40 text-hunt-yellow hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md ${
                bellRinging ? 'scale-110 text-white border-white' : ''
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Ring Temple Bell (घंटी) 🔔</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 border-t border-hunt-yellow/20">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-hunt-yellow" />
              <span className="font-heading text-lg text-gold-gradient font-bold">SVS YOUTH</span>
            </div>
            <p className="text-xs text-[#F3F4F4]/70 leading-relaxed">
              Serving with devotion in Tirupati. Dedicated to celebrating Ganesh Chaturthi with unity, faith, and service.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-hunt-yellow uppercase tracking-wider">Features</h4>
            <ul className="space-y-1.5 text-xs text-[#F3F4F4]/80">
              <li className="hover:text-white cursor-pointer">Ganesh Utsav Celebration</li>
              <li className="hover:text-white cursor-pointer" onClick={onOpenUpload}>Click & Post Memories</li>
              <li className="hover:text-white cursor-pointer">Live Camera Snapshot</li>
              <li className="hover:text-white cursor-pointer">Devotional Music</li>
            </ul>
          </div>

          {/* SVS Youth Initiatives */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-hunt-yellow uppercase tracking-wider">SVS Initiatives</h4>
            <ul className="space-y-1.5 text-xs text-[#F3F4F4]/80">
              <li>Ganesh Sthapana & Pooja</li>
              <li>Devotee Annadanam Service</li>
              <li>Eco-Friendly Clay Bappa Drive</li>
              <li>Tirupati Visarjan Rally</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-hunt-yellow uppercase tracking-wider">Post SVS Memory</h4>
            <p className="text-xs text-[#F3F4F4]/70">
              Captured a photo at the SVS Youth Pandal or home pooja? Share it to the Memory Gallery!
            </p>
            <button
              onClick={onOpenUpload}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] font-bold text-xs shadow-xl hover:scale-105 transition-all border border-white/40"
            >
              Post Memory Photo 📸
            </button>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-hunt-yellow/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3F4F4]/60 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} SVS YOUTH TIRUPATI. All rights reserved.</p>
          
          <div className="text-[11px] text-hunt-yellow font-medium flex items-center space-x-1">
            <span>🎵 Playing SVS Youth Devotional Track</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
