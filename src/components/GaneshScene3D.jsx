import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playFlowerSparkle, playTempleBell } from '../utils/audio';
import { Sparkles, Camera, Disc, Heart, Flame } from 'lucide-react';

export default function GaneshScene3D({ onOpenUpload }) {
  const [isPerformingAarti, setIsPerformingAarti] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState(null);

  const handlePerformAarti = () => {
    setIsPerformingAarti(true);
    playTempleBell();
    playFlowerSparkle();

    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#FFEE00', '#FFC800', '#853953', '#F3F4F4']
    });

    setBlessingMessage("✨ SVS YOUTH TIRUPATI: Ganpati Bappa Morya! May Lord Ganesha shower supreme blessings! 🙏");

    setTimeout(() => {
      setIsPerformingAarti(false);
      setBlessingMessage(null);
    }, 4000);
  };

  const handleOfferFlowers = () => {
    playFlowerSparkle();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFEE00', '#853953', '#612D53']
    });
    setBlessingMessage("🌺 Fresh Flowers offered to Lord Ganesha & SVS Youth!");
    setTimeout(() => setBlessingMessage(null), 3000);
  };

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2C2C2C] via-hunt-plum/40 to-[#2C2C2C] flex flex-col items-center justify-center text-center overflow-hidden border-b border-hunt-yellow/20">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-hunt-yellow/10 rounded-full blur-3xl pointer-events-none" />

      {/* Official SVS YOUTH TIRUPATI Logo Emblem Centerpiece */}
      <div className="relative mb-6 group cursor-pointer" onClick={handlePerformAarti}>
        {/* Outer Glowing Halo Ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-hunt-yellow via-hunt-magenta to-yellow-300 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
        
        {/* Logo Image Container */}
        <div className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-hunt-yellow shadow-2xl overflow-hidden bg-black p-1 transition-transform duration-500 ${isPerformingAarti ? 'rotate-12 scale-105' : 'animate-float'}`}>
          <img
            src="/logo.jpg"
            alt="SVS YOUTH TIRUPATI Emblem"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Title & Motto */}
      <div className="space-y-3 max-w-2xl mx-auto z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-hunt-plum border border-hunt-yellow/40 text-hunt-yellow text-xs font-semibold uppercase tracking-widest shadow-md">
          <Flame className="w-4 h-4 text-hunt-yellow" />
          <span>SVS YOUTH • TIRUPATI</span>
        </div>

        <h5 className="text-4xl sm:text-2xl font-heading text-gold-gradient font-bold tracking-tight drop-shadow-lg">
          Sri Srungara vallabha Swamy , Tholi Thirupathi
        </h5>

        <h2 className="text-3xl sm:text-5xl font-heading text-gold-gradient font-bold tracking-tight">
          Ganesh Utsav Celebrations 2026
        </h2>

        <p className="text-sm sm:text-base text-hunt-yellow font-bold tracking-widest uppercase">
          UNITY • FAITH • SERVICE
        </p>

        <h1 className="text-xs sm:text-sm text-[#F3F4F4]/100 italic max-w-lg mx-auto leading-relaxed pt-1">
          Capture And Share Your Devotional Memories With SVS Youth TIRUPATI! 📸
        </h1>
      </div>

      {/* Interactive Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 z-10">
        <button
          onClick={handlePerformAarti}
          disabled={isPerformingAarti}
          className={`px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-xl border-2 border-white ${
            isPerformingAarti
              ? 'bg-hunt-magenta text-white animate-pulse'
              : 'bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] hover:scale-105 active:scale-95'
          }`}
        >
          <Disc className={`w-4.5 h-4.5 ${isPerformingAarti ? 'animate-spin' : ''}`} />
          <span>{isPerformingAarti ? 'Performing Aarti...' : 'Perform Aarti 🪔'}</span>
        </button>

        <button
          onClick={handleOfferFlowers}
          className="px-5 py-3 rounded-full bg-hunt-plum border border-hunt-yellow/40 text-[#F3F4F4] hover:text-white hover:border-hunt-yellow font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center space-x-1.5"
        >
          <span>Offer Flowers 🌺</span>
        </button>

        <button
          onClick={onOpenUpload}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-hunt-magenta to-hunt-plum text-white font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md flex items-center space-x-2 border border-hunt-yellow/40"
        >
          <Camera className="w-4.5 h-4.5 text-hunt-yellow" />
          <span>Post Photo Memory 📸</span>
        </button>
      </div>

      {/* Blessing Toast Notification */}
      {blessingMessage && (
        <div className="mt-6 px-6 py-3 rounded-full glass-card-gold text-white font-medium text-xs sm:text-sm shadow-2xl border-2 border-hunt-yellow flex items-center space-x-2 animate-bounce z-20">
          <span>{blessingMessage}</span>
        </div>
      )}

    </section>
  );
}
