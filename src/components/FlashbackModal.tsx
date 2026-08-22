import React, { useEffect, useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Quote, 
  RotateCw, 
  Maximize2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FamilyMemory } from '../types';
import { soundFx } from '../utils/sound';

interface FlashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: FamilyMemory[];
  onSelectMemory: (memory: FamilyMemory) => void;
}

export const FlashbackModal: React.FC<FlashbackModalProps> = ({
  isOpen,
  onClose,
  memories,
  onSelectMemory,
}) => {
  const [selectedMemory, setSelectedMemory] = useState<FamilyMemory | null>(null);

  const rollRandomMemory = () => {
    if (memories.length === 0) return;
    const randomIndex = Math.floor(Math.random() * memories.length);
    const chosen = memories[randomIndex];
    setSelectedMemory(chosen);

    soundFx.playChime(700, 0.2);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b45309', '#d97706', '#fbbf24', '#f59e0b', '#78350f']
      });
    } catch {
      // Confetti fallback
    }
  };

  useEffect(() => {
    if (isOpen) {
      rollRandomMemory();
    }
  }, [isOpen]);

  if (!isOpen || !selectedMemory) return null;

  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - selectedMemory.year;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="editorial-bracket relative bg-[#F9F7F2] rounded-3xl shadow-2xl border border-[#2D2D2D]/15 w-full max-w-2xl overflow-hidden flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F1EDE4] border-b border-[#2D2D2D]/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#2D2D2D] text-[#F9F7F2] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#8C7851]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-light italic text-[#2D2D2D]">
                Memory Flashback
              </h2>
              <p className="text-xs text-[#2D2D2D]/60">
                {yearsAgo > 0 ? `Chronicle from ${yearsAgo} years ago (${selectedMemory.year})` : `Recent family archive (${selectedMemory.year})`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={rollRandomMemory}
              className="p-2 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] text-xs font-medium flex items-center space-x-1.5 transition-colors"
              title="Flashback to another memory"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Shuffle</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Framed Photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-xs bg-[#F1EDE4] border border-[#2D2D2D]/10">
            <img
              src={selectedMemory.imageUrl}
              alt={selectedMemory.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2D2D2D]/85 backdrop-blur-sm text-[#F9F7F2] text-xs font-serif italic border border-white/10">
              {selectedMemory.year}
            </div>
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F9F7F2]/90 backdrop-blur-sm text-[#2D2D2D] text-[10px] font-medium uppercase tracking-widest border border-[#2D2D2D]/10">
              {selectedMemory.category}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs text-[#2D2D2D]/60 uppercase tracking-wider">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>{selectedMemory.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>{selectedMemory.location}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light italic text-[#2D2D2D]">
              {selectedMemory.title}
            </h3>

            {selectedMemory.quote && (
              <div className="p-3.5 rounded-xl bg-[#F1EDE4] border-l-2 border-[#8C7851] italic font-serif text-sm text-[#2D2D2D]">
                "{selectedMemory.quote}"
              </div>
            )}

            <p className="text-sm text-[#2D2D2D]/80 leading-relaxed font-sans">
              {selectedMemory.story}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#2D2D2D]/10 flex items-center justify-between">
            <button
              onClick={rollRandomMemory}
              className="text-xs font-medium uppercase tracking-wider text-[#8C7851] hover:text-[#2D2D2D] flex items-center space-x-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Surprise with another</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectMemory(selectedMemory);
              }}
              className="px-5 py-2 rounded-full bg-[#2D2D2D] hover:bg-black text-[#F9F7F2] text-xs font-sans uppercase tracking-widest shadow-xs transition-colors flex items-center space-x-2"
            >
              <span>Explore Memory</span>
              <Maximize2 className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
