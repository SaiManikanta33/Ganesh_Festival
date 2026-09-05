import React, { useState, useMemo } from 'react';
import { Heart, Search, Sparkles, Camera, Download, Share2, Check, Trash2 } from 'lucide-react';
import { toggleLikeMemory, deleteMemory } from '../utils/storage';
import confetti from 'canvas-confetti';

export default function MemoryWall({ memories, setMemories, onOpenUpload }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMemoryModal, setActiveMemoryModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredMemories = useMemo(() => {
    return memories.filter(m => {
      const matchesTag = selectedTag === 'All' || m.tag === selectedTag;
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [memories, selectedTag, searchQuery]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    const updated = toggleLikeMemory(id);
    setMemories(updated);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#FFEE00', '#FFC800', '#853953']
    });
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    const updated = deleteMemory(id);
    setMemories(updated);
    if (activeMemoryModal && activeMemoryModal.id === id) {
      setActiveMemoryModal(null);
    }
    setDeleteConfirmId(null);
  };

  const handleShare = (mem, e) => {
    e.stopPropagation();
    const text = `SVS YOUTH TIRUPATI Ganesh Memory by ${mem.name}: "${mem.caption}"`;
    if (navigator.share) {
      navigator.share({
        title: 'SVS YOUTH TIRUPATI Memory',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(mem.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownload = (mem, e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = mem.photoUrl;
    link.download = `SVS_Youth_Tirupati_${mem.name.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Clean Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-hunt-plum border border-hunt-yellow/40 text-hunt-yellow text-xs font-semibold tracking-widest shadow-md">
          <img src="/logo.jpg" alt="Logo" className="w-4 h-4 rounded-full border border-hunt-yellow" />
          <span>SVS YOUTH TIRUPATI • DEVOTEE MEMORIES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-heading text-gold-gradient font-bold tracking-tight">
          Ganesh Utsav Memory Gallery
        </h2>

        <p className="text-[#F3F4F4]/80 text-xs sm:text-sm max-w-xl mx-auto">
          Photo memories shared by SVS Youth members & Tirupati devotees. Click photo to post yours!
        </p>
      </div>

      {/* Simplified Search & Category Toolbar */}
      <div className="glass-card-gold p-4 rounded-3xl border-2 border-hunt-yellow/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-hunt-yellow" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or wish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#2C2C2C]/90 border border-hunt-yellow/40 text-[#F3F4F4] placeholder-[#F3F4F4]/40 text-xs sm:text-sm focus:outline-none focus:border-hunt-yellow"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'SVS Youth', 'Family', 'Pooja', 'Pandals', 'Visarjan'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-hunt-yellow text-[#2C2C2C] shadow-md'
                  : 'bg-[#2C2C2C]/70 text-[#F3F4F4]/80 hover:text-white border border-hunt-yellow/30'
              }`}
            >
              {tag === 'All' ? '🌟 All Photos' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Post CTA */}
        <button
          onClick={onOpenUpload}
          className="w-full md:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 whitespace-nowrap border border-white/40"
        >
          <Camera className="w-4 h-4" />
          <span>+ Post Photo Memory</span>
        </button>

      </div>

      {/* Photo Gallery with BIG PREVIEWS */}
      {filteredMemories.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 border border-hunt-yellow/40">
          <Sparkles className="w-12 h-12 text-hunt-yellow mx-auto animate-pulse" />
          <h3 className="text-xl font-bold text-[#F3F4F4]">No memories found</h3>
          <p className="text-xs text-[#F3F4F4]/70">Be the first to post a photo memory to SVS Youth Tirupati gallery!</p>
          <button
            onClick={onOpenUpload}
            className="px-6 py-2.5 rounded-full bg-hunt-yellow text-[#2C2C2C] font-bold text-xs"
          >
            Post Memory Now 📸
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => setActiveMemoryModal(mem)}
              className="group glass-card rounded-3xl overflow-hidden border-2 border-hunt-yellow/35 hover:border-hunt-yellow transition-all duration-300 hover:-translate-y-1.5 shadow-2xl cursor-pointer flex flex-col"
            >
              {/* BIGGER PHOTO PREVIEW */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/70">
                <img
                  src={mem.photoUrl}
                  alt={mem.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2C2C2C]/90 backdrop-blur-md text-[11px] font-bold text-hunt-yellow border border-hunt-yellow/40 shadow-md">
                  #{mem.tag}
                </div>

                {/* Quick Action Overlay (Share, Download, Delete, Like) */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                  <button
                    onClick={(e) => handleShare(mem, e)}
                    title="Share Memory"
                    className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white backdrop-blur-md border border-white/30 transition-all"
                  >
                    {copiedId === mem.id ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={(e) => handleDownload(mem, e)}
                    title="Download Photo"
                    className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white backdrop-blur-md border border-white/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(mem.id);
                    }}
                    title="Delete Memory"
                    className="p-2 rounded-full bg-black/60 text-red-400 hover:text-red-300 hover:bg-red-950/80 backdrop-blur-md border border-red-500/40 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleLike(mem.id, e)}
                    className={`px-3 py-1.5 rounded-full backdrop-blur-md transition-all flex items-center space-x-1.5 text-xs font-bold ${
                      mem.userLiked
                        ? 'bg-hunt-magenta text-white shadow-lg'
                        : 'bg-black/70 text-white/90 hover:text-red-400 border border-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${mem.userLiked ? 'fill-white' : ''}`} />
                    <span>{mem.likes}</span>
                  </button>
                </div>
              </div>

              {/* Caption & Devotee Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-[#2C2C2C]/60 to-[#2C2C2C]">
                <p className="text-[#F3F4F4] text-sm line-clamp-2 italic leading-relaxed">
                  "{mem.caption}"
                </p>

                <div className="flex items-center justify-between border-t border-hunt-yellow/20 pt-3">
                  <div>
                    <h4 className="text-base font-bold text-gold-gradient">{mem.name}</h4>
                  </div>

                  <span className="text-xs text-[#F3F4F4]/60 font-mono">
                    {new Date(mem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card-gold p-6 rounded-3xl max-w-sm w-full text-center space-y-4 border-2 border-red-500/50 shadow-2xl">
            <Trash2 className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
            <h3 className="font-heading text-xl text-gold-gradient">Delete Memory?</h3>
            <p className="text-xs text-[#F3F4F4]/80">Are you sure you want to remove this photo memory from the SVS Youth Gallery?</p>
            
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold text-xs border border-gray-600 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg"
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Zoom Preview */}
      {activeMemoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-xl w-full bg-[#2C2C2C] border-2 border-hunt-yellow/50 rounded-3xl overflow-hidden p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setActiveMemoryModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-hunt-plum text-hunt-yellow hover:text-white"
            >
              ✕
            </button>

            <img
              src={activeMemoryModal.photoUrl}
              alt={activeMemoryModal.caption}
              className="w-full aspect-[4/3] object-cover rounded-2xl border-4 border-hunt-yellow/40 shadow-xl"
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-gold-gradient">{activeMemoryModal.name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-hunt-yellow/20 text-hunt-yellow border border-hunt-yellow/40 font-bold">
                  #{activeMemoryModal.tag}
                </span>
              </div>

              <p className="text-sm text-[#F3F4F4] italic bg-[#2C2C2C]/80 p-4 rounded-xl border border-hunt-yellow/30">
                "{activeMemoryModal.caption}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleDownload(activeMemoryModal, e)}
                    className="px-4 py-2 rounded-xl bg-hunt-plum border border-hunt-yellow/40 text-[#F3F4F4] text-xs font-semibold flex items-center space-x-1.5 hover:text-white"
                  >
                    <Download className="w-4 h-4 text-hunt-yellow" />
                    <span>Save</span>
                  </button>

                  <button
                    onClick={() => handleDelete(activeMemoryModal.id)}
                    className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>

                <button
                  onClick={(e) => handleLike(activeMemoryModal.id, e)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-hunt-yellow to-yellow-300 text-[#2C2C2C] font-bold text-xs flex items-center space-x-2 shadow-lg"
                >
                  <Heart className={`w-4 h-4 ${activeMemoryModal.userLiked ? 'fill-[#2C2C2C]' : ''}`} />
                  <span>Give Blessing ({activeMemoryModal.likes})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
