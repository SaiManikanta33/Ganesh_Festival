import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GaneshScene3D from './components/GaneshScene3D';
import MemoryWall from './components/MemoryWall';
import UploadModal from './components/UploadModal';
import Footer from './components/Footer';
import { getStoredMemories } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('3d-mandap');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const loaded = getStoredMemories();
    setMemories(loaded);
  }, []);

  const handleMemoryPosted = (newMem) => {
    setMemories((prev) => [newMem, ...prev]);
    setActiveTab('memories');
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] text-[#F3F4F4] flex flex-col font-['Poppins',sans-serif]">
      
      <Header
        onOpenUpload={() => setIsUploadOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1">
        {activeTab === '3d-mandap' && (
          <div className="space-y-8">
            <GaneshScene3D onOpenUpload={() => setIsUploadOpen(true)} />

            <div className="border-t border-hunt-yellow/20 pt-6">
              <MemoryWall
                memories={memories}
                setMemories={setMemories}
                onOpenUpload={() => setIsUploadOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'memories' && (
          <div className="py-6">
            <MemoryWall
              memories={memories}
              setMemories={setMemories}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </div>
        )}
      </main>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onMemoryPosted={handleMemoryPosted}
      />

      <Footer onOpenUpload={() => setIsUploadOpen(true)} />

    </div>
  );
}
