import React, { useState } from 'react';
import { Bell, Music, Camera, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { playTempleBell, toggleDevotionalAarti } from '../utils/audio';

export default function Header({ onOpenUpload, activeTab, setActiveTab }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const handleRingBell = () => {
    setBellRinging(true);
    playTempleBell();
    setTimeout(() => setBellRinging(false), 800);
  };

  const handleAudioToggle = () => {
    const newState = toggleDevotionalAarti((playing) => setIsPlayingAudio(playing));
    setIsPlayingAudio(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#2C2C2C]/95 border-b border-hunt-yellow/40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('3d-mandap')}>
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-hunt-yellow shadow-lg shadow-hunt-yellow/30 overflow-hidden bg-black group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.jpg"
              alt="SVS YOUTH TIRUPATI Emblem"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading text-lg sm:text-xl tracking-wider text-gold-gradient font-bold drop-shadow-md">
                SVS YOUTH
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-hunt-magenta/30 text-hunt-yellow border border-hunt-yellow/50 font-bold tracking-wider uppercase">
                TIRUPATI
              </span>
            </div>
            <p className="text-[10px] text-[#F3F4F4]/80 tracking-widest uppercase font-semibold flex items-center space-x-1 mt-0.5">
              <span>UNITY</span>
              <span className="text-hunt-yellow">•</span>
              <span>FAITH</span>
              <span className="text-hunt-yellow">•</span>
              <span>SERVICE</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-hunt-plum/80 p-1 rounded-full border border-hunt-yellow/40 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('3d-mandap')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
              activeTab === '3d-mandap'
                ? 'bg-hunt-yellow text-[#2C2C2C] font-bold shadow-md shadow-hunt-yellow/30'
                : 'text-[#F3F4F4]/80 hover:text-white hover:bg-hunt-yellow/10'
            }`}
          >
            <Flame className="w-4 h-4 text-hunt-yellow" />
            <span>Youth Logo</span>
          </button>

          <button
            onClick={() => setActiveTab('memories')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'memories'
                ? 'bg-hunt-yellow text-[#2C2C2C] font-bold shadow-md shadow-hunt-yellow/30'
                : 'text-[#F3F4F4]/80 hover:text-white hover:bg-hunt-yellow/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-hunt-yellow" />
            <span>Memory Gallery</span>
          </button>
        </nav>

        {/* Action Tools & Upload CTA */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Temple Bell Button */}
          <button
            onClick={handleRingBell}
            title="Ring Temple Bell"
            className={`p-2.5 rounded-full bg-hunt-plum/80 border border-hunt-yellow/50 text-hunt-yellow hover:text-white hover:border-hunt-yellow transition-all shadow-md ${
              bellRinging ? 'scale-110 rotate-12 text-white border-white' : ''
            }`}
          >
            <Bell className="w-4.5 h-4.5" />
          </button>

          {/* Devotional Aarti Music Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isPlayingAudio ? "Mute Aarti Music" : "Play Devotional Aarti Music"}
            className={`p-2.5 rounded-full border transition-all flex items-center justify-center ${
              isPlayingAudio
                ? 'bg-hunt-yellow text-[#2C2C2C] border-white shadow-md font-bold'
                : 'bg-hunt-plum/80 border-hunt-yellow/50 text-hunt-yellow hover:text-white'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
          </button>

          {/* Post Memory CTA Button */}
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 border border-white"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Post Photo</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>

      </div>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-t border-hunt-yellow/20 bg-[#2C2C2C]/95 py-2 px-4 justify-around">
        <button
          onClick={() => setActiveTab('3d-mandap')}
          className={`flex items-center space-x-1.5 py-1 px-3.5 rounded-full text-xs font-semibold ${
            activeTab === '3d-mandap' ? 'bg-hunt-yellow text-[#2C2C2C] font-bold' : 'text-[#F3F4F4]/80'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Youth Logo</span>
        </button>

        <button
          onClick={() => setActiveTab('memories')}
          className={`flex items-center space-x-1.5 py-1 px-3.5 rounded-full text-xs font-semibold ${
            activeTab === 'memories' ? 'bg-hunt-yellow text-[#2C2C2C] font-bold' : 'text-[#F3F4F4]/80'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Memories</span>
        </button>
      </div>
    </header>
  );
}
