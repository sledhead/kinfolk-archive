import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Calendar, 
  MapPin, 
  Quote, 
  Users,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { FamilyMemory } from '../types';
import { soundFx } from '../utils/sound';

interface SlideshowViewProps {
  memories: FamilyMemory[];
  onSelectMemory: (memory: FamilyMemory) => void;
  onCloseSlideshow?: () => void;
}

export const SlideshowView: React.FC<SlideshowViewProps> = ({
  memories,
  onSelectMemory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideDuration, setSlideDuration] = useState(6000); // 6 seconds per memory
  const [progress, setProgress] = useState(0);

  if (memories.length === 0) {
    return (
      <div className="py-20 text-center text-[#7a6d5f]">
        No memories available for slideshow with the current filters.
      </div>
    );
  }

  const validIndex = Math.min(currentIndex, memories.length - 1);
  const memory = memories[validIndex];

  // Slideshow timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      setProgress(0);
      const stepTime = 50; // update progress bar every 50ms
      const totalSteps = slideDuration / stepTime;
      let currentStep = 0;

      progressInterval = setInterval(() => {
        currentStep++;
        setProgress((currentStep / totalSteps) * 100);
      }, stepTime);

      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memories.length);
        setProgress(0);
      }, slideDuration);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying, slideDuration, validIndex, memories.length]);

  const handleNext = () => {
    soundFx.playChime(600, 0.08);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
    setProgress(0);
  };

  const handlePrev = () => {
    soundFx.playChime(400, 0.08);
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Slideshow Frame Container */}
      <div className="relative rounded-3xl overflow-hidden bg-black aspect-16/10 shadow-2xl border-4 border-amber-950 flex flex-col justify-between">
        
        {/* Background Ken-Burns Animated Photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={memory.id}
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
        </div>

        {/* Top Header Overlay Bar */}
        <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-[#8C7851] text-[#F9F7F2] text-xs font-bold font-serif tracking-widest shadow-sm uppercase">
              {memory.year} • {memory.decade}
            </span>
            <span className="text-white/80 text-[11px] font-sans tracking-widest uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              {validIndex + 1} / {memories.length}
            </span>
          </div>

          {/* Quick Details Trigger */}
          <button
            onClick={() => onSelectMemory(memory)}
            className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-[#F9F7F2] text-xs font-sans uppercase tracking-wider transition-colors flex items-center space-x-1.5 border border-white/20"
          >
            <span>Open Story</span>
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center / Bottom Story Narrative Overlay */}
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          
          <div className="flex items-center space-x-2 text-[#8C7851] text-xs sm:text-sm font-sans font-medium mb-1 tracking-wide">
            <MapPin className="w-4 h-4" />
            <span>{memory.location}</span>
            <span>•</span>
            <Calendar className="w-4 h-4" />
            <span>{memory.date}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-light italic text-[#F9F7F2] mb-3 drop-shadow-md leading-tight">
            {memory.title}
          </h2>

          <p className="text-stone-200 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 drop-shadow-sm font-sans">
            {memory.story}
          </p>

          {memory.quote && (
            <div className="italic text-[#F1EDE4] text-xs sm:text-sm font-quote flex items-center space-x-2 mb-3">
              <Quote className="w-4 h-4 text-[#8C7851] shrink-0" />
              <span>"{memory.quote}"</span>
            </div>
          )}

          {memory.familyMembers && memory.familyMembers.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-[#F9F7F2]/80 font-sans">
              <Users className="w-3.5 h-3.5 text-[#8C7851]" />
              <span>With {memory.familyMembers.join(', ')}</span>
            </div>
          )}

        </div>

        {/* Bottom Playback & Timeline Controls */}
        <div className="relative z-10 bg-black/70 backdrop-blur-md p-3 sm:p-4 border-t border-white/10 flex flex-col space-y-2">
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#8C7851] h-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between text-white text-xs font-sans">
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-[#8C7851] hover:bg-[#a68f63] text-[#2D2D2D] font-bold transition-all shadow-md"
                title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 fill-white text-white" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Duration Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-[10px] uppercase tracking-wider hidden sm:inline">Speed:</span>
              {[4000, 6000, 10000].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSlideDuration(dur)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold transition-all ${
                    slideDuration === dur ? 'bg-[#8C7851] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {dur / 1000}s
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Scroller Thumbnails */}
      <div className="mt-4 flex items-center space-x-2 overflow-x-auto no-scrollbar py-2">
        {memories.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
            }}
            className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
              idx === validIndex ? 'border-[#8C7851] ring-2 ring-[#8C7851]/40 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={m.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded">
              {m.year}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};
