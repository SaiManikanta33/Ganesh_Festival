import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, RefreshCw, Check, Sparkles, User, Heart, Image as ImageIcon } from 'lucide-react';
import { saveMemory } from '../utils/storage';
import confetti from 'canvas-confetti';
import { playTempleBell } from '../utils/audio';

export default function UploadModal({ isOpen, onClose, onMemoryPosted }) {
  const [activeTab, setActiveTab] = useState('camera');
  const [photoData, setPhotoData] = useState(null);
  
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const streamRef = useRef(null);

  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState('Family');
  const [frame, setFrame] = useState('gold');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !photoData) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab, photoData]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or unavailable. Please upload a photo file instead.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takeSnapshot();
      }
    }, 1000);
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setPhotoData(dataUrl);
    stopCamera();
    playTempleBell();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setPhotoData(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photoData) {
      alert("Please capture or upload a photo memory first!");
      return;
    }

    setIsSubmitting(true);

    const newMemory = {
      id: 'mem-' + Date.now(),
      name: name.trim() || 'Devotee',
      caption: caption.trim() || 'Ganpati Bappa Morya! SVS Youth Blessings 🙏',
      photoUrl: photoData,
      tag: tag,
      frame: frame,
      likes: 1,
      userLiked: true,
      createdAt: new Date().toISOString()
    };

    saveMemory(newMemory);
    onMemoryPosted(newMemory);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFEE00', '#853953', '#612D53']
    });

    playTempleBell();

    setIsSubmitting(false);
    onClose();

    setPhotoData(null);
    setName('');
    setCaption('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#2C2C2C] border-2 border-hunt-yellow/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-hunt-yellow/30 bg-hunt-plum">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-hunt-yellow" />
            <div>
              <h2 className="font-heading text-xl text-gold-gradient">SVS YOUTH TIRUPATI</h2>
              <p className="text-xs text-[#F3F4F4]/80">Share your Ganesh Chaturthi photo memory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-hunt-yellow hover:text-white hover:bg-hunt-yellow/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Mode Tabs */}
          {!photoData && (
            <div className="flex bg-[#2C2C2C] p-1.5 rounded-2xl border border-hunt-yellow/40">
              <button
                type="button"
                onClick={() => setActiveTab('camera')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === 'camera'
                    ? 'bg-hunt-yellow text-[#2C2C2C] font-bold shadow-md'
                    : 'text-[#F3F4F4]/80 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Click Photo (Live Camera)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === 'file'
                    ? 'bg-hunt-yellow text-[#2C2C2C] font-bold shadow-md'
                    : 'text-[#F3F4F4]/80 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image File</span>
              </button>
            </div>
          )}

          {/* Photo Capture / Upload Area */}
          <div className="relative aspect-video rounded-2xl bg-black/70 border-2 border-dashed border-hunt-yellow/40 overflow-hidden flex items-center justify-center">
            
            {!photoData && activeTab === 'camera' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {cameraError ? (
                  <div className="p-6 text-center text-red-400 text-sm space-y-3">
                    <p>{cameraError}</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('file')}
                      className="px-4 py-2 rounded-xl bg-hunt-yellow text-[#2C2C2C] font-bold text-xs"
                    >
                      Switch to File Upload
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />

                    {countdown !== null && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <span className="text-7xl font-bold text-yellow-400 animate-ping">
                          {countdown}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-10">
                      <button
                        type="button"
                        onClick={handleCapturePhoto}
                        disabled={!isCameraActive || countdown !== null}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center space-x-2 border-2 border-white"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Take Snap 📸</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {!photoData && activeTab === 'file' && (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-6 hover:bg-hunt-yellow/5 transition-all">
                <ImageIcon className="w-12 h-12 text-hunt-yellow mb-2 animate-bounce" />
                <span className="text-sm font-semibold text-[#F3F4F4]">Click or Drag & Drop Photo Here</span>
                <span className="text-xs text-[#F3F4F4]/50 mt-1">Supports JPG, PNG, WebP up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {photoData && (
              <div className="relative w-full h-full group">
                <img
                  src={photoData}
                  alt="Captured memory"
                  className={`w-full h-full object-cover ${
                    frame === 'gold'
                      ? 'border-8 border-hunt-yellow'
                      : frame === 'garland'
                      ? 'border-8 border-hunt-magenta'
                      : 'border-8 border-yellow-300'
                  }`}
                />
                
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/80 text-[#F3F4F4] hover:text-white text-xs font-semibold flex items-center space-x-1 backdrop-blur-sm border border-hunt-yellow/40"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake / Change</span>
                </button>
              </div>
            )}

          </div>

          {/* Frame Selector */}
          {photoData && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#F3F4F4] uppercase tracking-wider">Select Photo Frame</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFrame('gold')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    frame === 'gold' ? 'bg-hunt-yellow text-[#2C2C2C] border-white' : 'bg-[#2C2C2C]/70 border-hunt-yellow/30 text-[#F3F4F4]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Imperial Gold</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrame('garland')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    frame === 'garland' ? 'bg-hunt-magenta text-white border-yellow-300' : 'bg-[#2C2C2C]/70 border-hunt-yellow/30 text-[#F3F4F4]'
                  }`}
                >
                  <span>🌺 Magenta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrame('sparkle')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    frame === 'sparkle' ? 'bg-yellow-400 text-[#2C2C2C] border-white' : 'bg-[#2C2C2C]/70 border-hunt-yellow/30 text-[#F3F4F4]'
                  }`}
                >
                  <span>✨ Sparkle</span>
                </button>
              </div>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-[#F3F4F4]/90 mb-1">Your Name / Family</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-hunt-yellow" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SVS Youth Member / Sharma Family"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#2C2C2C]/90 border border-hunt-yellow/40 text-[#F3F4F4] placeholder-[#F3F4F4]/40 text-sm focus:outline-none focus:border-hunt-yellow"
              />
            </div>
          </div>

          {/* Category Tag */}
          <div>
            <label className="block text-xs font-semibold text-[#F3F4F4]/90 mb-1">Category Tag</label>
            <div className="flex flex-wrap gap-2">
              {['SVS Youth', 'Family', 'Pooja', 'Pandals', 'Visarjan'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    tag === t
                      ? 'bg-hunt-yellow text-[#2C2C2C] border-white font-bold'
                      : 'bg-[#2C2C2C]/60 border-hunt-yellow/30 text-[#F3F4F4]/80 hover:text-white'
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-[#F3F4F4]/90 mb-1">Blessing / Caption / Wish</label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your wishes for Bappa... (e.g. SVS Youth Tirupati Ganpati Bappa Morya!)"
              className="w-full p-3 rounded-xl bg-[#2C2C2C]/90 border border-hunt-yellow/40 text-[#F3F4F4] placeholder-[#F3F4F4]/40 text-sm focus:outline-none focus:border-hunt-yellow"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!photoData || isSubmitting}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 ${
              photoData && !isSubmitting
                ? 'bg-gradient-to-r from-hunt-yellow via-yellow-300 to-hunt-amber text-[#2C2C2C] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#2C2C2C]" />
            <span>{isSubmitting ? 'Posting Memory...' : 'Post Memory to SVS Youth Gallery 🌺'}</span>
          </button>

        </form>
      </div>
    </div>
  );
}
