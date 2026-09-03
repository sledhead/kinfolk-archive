import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Heart, 
  Quote, 
  Camera, 
  User, 
  BookOpen, 
  Maximize2,
  Share2
} from 'lucide-react';
import { FamilyMemory, FamilyMember } from '../types';
import { soundFx } from '../utils/sound';

interface StoryBookViewProps {
  memories: FamilyMemory[];
  familyMembers: FamilyMember[];
  onSelectMemory: (memory: FamilyMemory) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onFilterByMember: (memberName: string) => void;
  onFilterByLocation: (location: string) => void;
  onFilterByYear: (year: number) => void;
  onResetFilters: () => void;
}

export const StoryBookView: React.FC<StoryBookViewProps> = ({
  memories,
  familyMembers,
  onSelectMemory,
  onToggleFavorite,
  onFilterByMember,
  onFilterByLocation,
  onFilterByYear,
  onResetFilters,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (memories.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto">
        <BookOpen className="w-12 h-12 text-amber-700 mx-auto mb-3" />
        <h3 className="font-serif text-xl font-bold text-amber-950 mb-2">The Album is Empty</h3>
        <p className="text-sm text-[#7a6d5f] mb-6">No memories matched the current filter selection.</p>
        <button onClick={onResetFilters} className="px-4 py-2 bg-amber-900 text-white rounded-xl text-xs font-semibold">
          Reset Filters
        </button>
      </div>
    );
  }

  // Ensure index is within bounds if filter changed
  const validIndex = Math.min(currentIndex, memories.length - 1);
  const memory = memories[validIndex];

  const handlePrev = () => {
    if (validIndex > 0) {
      soundFx.playPageTurn();
      setCurrentIndex(validIndex - 1);
    }
  };

  const handleNext = () => {
    if (validIndex < memories.length - 1) {
      soundFx.playPageTurn();
      setCurrentIndex(validIndex + 1);
    }
  };

  const getMemberAvatar = (memberName: string) => {
    const found = familyMembers.find(m => m.name.toLowerCase() === memberName.toLowerCase() || memberName.toLowerCase().includes(m.name.toLowerCase()));
    return found?.avatar || null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Book Navigation Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2D2D2D]/10">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-xl font-light italic text-[#2D2D2D]">
            The Family Chronicle Album
          </span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#2D2D2D]/60 bg-[#F1EDE4] border border-[#2D2D2D]/10 px-3 py-1 rounded-full font-medium">
            Folio {validIndex + 1} of {memories.length}
          </span>
        </div>

        {/* Page Turn Buttons */}
        <div className="flex items-center space-x-2">
          <button
            id="book-prev-btn"
            onClick={handlePrev}
            disabled={validIndex === 0}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider border transition-all ${
              validIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                : 'bg-[#F1EDE4] text-[#2D2D2D] border-[#2D2D2D]/10 hover:bg-[#E5E2D9]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            id="book-next-btn"
            onClick={handleNext}
            disabled={validIndex === memories.length - 1}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider border transition-all ${
              validIndex === memories.length - 1
                ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                : 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] hover:bg-black shadow-xs'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Classic Bound Double-Page Book Container */}
      <div className="editorial-bracket relative bg-[#F9F7F2] rounded-3xl shadow-xl border border-[#2D2D2D]/15 overflow-hidden">
        
        {/* Book spine shadow in middle */}
        <div className="hidden lg:block absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/10 to-transparent pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT PAGE: Photo & Vintage Caption */}
          <div className="p-6 sm:p-10 lg:border-r border-[#2D2D2D]/10 flex flex-col justify-between bg-[#F1EDE4]">
            
            {/* Mounted Frame */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#2D2D2D]/10 relative group">
              
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-200">
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Year Stamp */}
                <div 
                  onClick={() => onFilterByYear(memory.year)}
                  className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-[#F9F7F2] text-xs font-serif font-bold rounded-full border border-white/20 cursor-pointer hover:bg-black"
                >
                  {memory.year} • {memory.decade}
                </div>

                {/* Lightbox Trigger */}
                <button
                  onClick={() => onSelectMemory(memory)}
                  className="absolute bottom-3 right-3 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  title="Expand High-Resolution Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Handwritten Note / Photo Label */}
              <div className="mt-4 pt-3 border-t border-[#2D2D2D]/10 flex items-center justify-between">
                <p className="font-handwritten text-xl sm:text-2xl text-[#2D2D2D]">
                  "{memory.title}"
                </p>
                {memory.photographer && (
                  <span className="text-[11px] font-sans text-[#2D2D2D]/60 flex items-center space-x-1">
                    <Camera className="w-3 h-3 text-[#8C7851]" />
                    <span>{memory.photographer}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Page Scrubber Thumbnails */}
            <div className="mt-6 pt-4 border-t border-[#2D2D2D]/10 flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {memories.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => { soundFx.playPageTurn(); setCurrentIndex(idx); }}
                  className={`relative shrink-0 w-12 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === validIndex ? 'border-[#8C7851] ring-2 ring-[#8C7851]/30 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={m.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT PAGE: Story, Narrative, Quotes & Family Reflections */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#F9F7F2] space-y-6">
            
            <div className="space-y-4">
              
              {/* Event Category & Meta */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#F1EDE4] text-[#2D2D2D] border border-[#2D2D2D]/10 text-[10px] font-sans font-semibold uppercase tracking-widest">
                  {memory.category}
                </span>

                <button
                  onClick={(e) => onToggleFavorite(memory.id, e)}
                  className="flex items-center space-x-1 text-xs font-sans uppercase tracking-wider text-[#2D2D2D]/60 hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${memory.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-[#8C7851]'}`} />
                  <span>{memory.isFavorite ? 'Saved Favorite' : 'Save Favorite'}</span>
                </button>
              </div>

              {/* Story Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-light italic text-[#2D2D2D] leading-tight">
                {memory.title}
              </h2>

              {/* Date & Location Ribbons */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#2D2D2D]/60 pb-3 border-b border-[#2D2D2D]/10 font-sans">
                <span className="flex items-center space-x-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#8C7851]" />
                  <span>{memory.date}</span>
                </span>
                <span className="w-3 h-[1px] bg-[#2D2D2D]/20" />
                <button
                  onClick={() => onFilterByLocation(memory.location)}
                  className="flex items-center space-x-1.5 hover:text-[#2D2D2D] hover:underline transition-colors font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8C7851]" />
                  <span>{memory.location}</span>
                </button>
              </div>

              {/* Memorable Quote Banner (if present) */}
              {memory.quote && (
                <div className="p-4 rounded-xl bg-white/70 border-l-2 border-[#8C7851] italic font-quote text-base sm:text-lg text-[#2D2D2D] leading-relaxed shadow-2xs">
                  "{memory.quote}"
                </div>
              )}

              {/* Story Narrative */}
              <div className="text-[#2D2D2D]/85 text-sm sm:text-base leading-relaxed font-sans">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2D2D2D] first-letter:mr-2 first-letter:float-left">
                  {memory.story}
                </p>
              </div>

              {/* Tagged Family Members */}
              {memory.familyMembers && memory.familyMembers.length > 0 && (
                <div className="pt-4 border-t border-[#2D2D2D]/10">
                  <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/50 mb-2.5">
                    Family Members Present:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {memory.familyMembers.map((memberName) => {
                      const avatar = getMemberAvatar(memberName);
                      return (
                        <button
                          key={memberName}
                          onClick={() => onFilterByMember(memberName)}
                          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D] text-xs font-medium transition-colors border border-[#2D2D2D]/10"
                        >
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={memberName}
                              className="w-4 h-4 rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <User className="w-3.5 h-3.5 text-[#8C7851]" />
                          )}
                          <span>{memberName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#2D2D2D]/10 flex items-center justify-between font-sans">
              <button
                onClick={() => onSelectMemory(memory)}
                className="text-xs font-semibold text-[#8C7851] hover:text-[#2D2D2D] flex items-center space-x-1"
              >
                <span>View Full Memory & Reflections</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-[#2D2D2D]/50 italic font-serif">
                Preserved in The Klempel Chronicle
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
