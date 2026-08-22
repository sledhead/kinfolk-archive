import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Heart, 
  User, 
  Camera, 
  Quote, 
  MessageSquare, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Share2,
  Tag,
  Sparkles
} from 'lucide-react';
import { FamilyMemory, FamilyMember, MemoryComment } from '../types';
import { soundFx } from '../utils/sound';

interface MemoryDetailModalProps {
  memory: FamilyMemory | null;
  onClose: () => void;
  allMemories: FamilyMemory[];
  familyMembers: FamilyMember[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddComment: (memoryId: string, comment: Omit<MemoryComment, 'id' | 'date'>) => void;
  onFilterByMember: (memberName: string) => void;
  onFilterByLocation: (location: string) => void;
  onFilterByYear: (year: number) => void;
  onNavigateMemory: (memory: FamilyMemory) => void;
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  memory,
  onClose,
  allMemories,
  familyMembers,
  onToggleFavorite,
  onAddComment,
  onFilterByMember,
  onFilterByLocation,
  onFilterByYear,
  onNavigateMemory,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRelation, setCommentRelation] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    if (memory) {
      setActiveImage(memory.imageUrl);
      setCommentSuccess(false);
    }
  }, [memory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!memory) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, allMemories]);

  if (!memory) return null;

  const currentIndex = allMemories.findIndex(m => m.id === memory.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allMemories.length - 1 && currentIndex !== -1;

  const handlePrev = () => {
    if (hasPrev) {
      soundFx.playChime(450, 0.08);
      onNavigateMemory(allMemories[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      soundFx.playChime(550, 0.08);
      onNavigateMemory(allMemories[currentIndex + 1]);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;

    onAddComment(memory.id, {
      author: commentAuthor.trim(),
      relation: commentRelation.trim() || 'Family Member',
      text: commentText.trim(),
    });

    setCommentText('');
    setCommentSuccess(true);
    soundFx.playChime(600, 0.15);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const getMemberAvatar = (memberName: string) => {
    const found = familyMembers.find(m => m.name.toLowerCase() === memberName.toLowerCase() || memberName.toLowerCase().includes(m.name.toLowerCase()));
    return found?.avatar || null;
  };

  const handlePrint = () => {
    window.print();
  };

  const allImages = [memory.imageUrl, ...(memory.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Card Box */}
      <div 
        className="editorial-bracket relative bg-[#F9F7F2] rounded-3xl shadow-2xl border border-[#2D2D2D]/15 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F1EDE4] border-b border-[#2D2D2D]/10 shrink-0 font-sans">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-[#2D2D2D] text-[#F9F7F2] text-xs font-serif font-bold tracking-wider uppercase">
              {memory.year} • {memory.decade}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#2D2D2D] text-[10px] font-sans uppercase tracking-widest border border-[#2D2D2D]/10">
              {memory.category}
            </span>
            <span className="text-xs text-[#2D2D2D]/60 hidden md:inline">
              Record {currentIndex + 1} of {allMemories.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Prev / Next buttons */}
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`p-1.5 rounded-full border border-[#2D2D2D]/10 transition-colors ${
                hasPrev ? 'bg-white hover:bg-[#E5E2D9] text-[#2D2D2D]' : 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
              }`}
              title="Previous Memory (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`p-1.5 rounded-full border border-[#2D2D2D]/10 transition-colors ${
                hasNext ? 'bg-white hover:bg-[#E5E2D9] text-[#2D2D2D]' : 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
              }`}
              title="Next Memory (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Favorite button */}
            <button
              onClick={(e) => onToggleFavorite(memory.id, e)}
              className="p-1.5 rounded-full bg-white hover:bg-rose-50 border border-[#2D2D2D]/10 text-[#2D2D2D] transition-colors"
              title={memory.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${memory.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-[#8C7851]'}`} />
            </button>

            {/* Print Memory Card */}
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-full bg-white hover:bg-[#E5E2D9] border border-[#2D2D2D]/10 text-[#2D2D2D] transition-colors hidden sm:flex"
              title="Print Memory Card"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              id="close-memory-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] transition-colors ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Main Photo Viewer & Thumbnails */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-16/10 max-h-[500px] flex items-center justify-center shadow-md border border-[#2D2D2D]/10">
              <img
                src={activeImage || memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-contain sm:object-cover"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[#F9F7F2] text-xs font-serif font-bold border border-white/20">
                  {memory.year}
                </span>
              </div>
            </div>

            {/* Extra Photo Thumbnails if multiple images exist */}
            {allImages.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? 'border-[#8C7851] ring-2 ring-[#8C7851]/40 scale-105' : 'border-[#2D2D2D]/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Story Narrative Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Cols: Main Story Narrative */}
            <div className="lg:col-span-2 space-y-6">
              
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl font-light italic text-[#2D2D2D] leading-tight mb-3">
                  {memory.title}
                </h1>

                {/* Date & Location Bar */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#2D2D2D]/60 pb-4 border-b border-[#2D2D2D]/10 font-sans">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-[#8C7851]" />
                    <button
                      onClick={() => { onClose(); onFilterByYear(memory.year); }}
                      className="font-medium hover:underline hover:text-[#2D2D2D]"
                    >
                      {memory.date} ({memory.decade})
                    </button>
                  </span>

                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#8C7851]" />
                    <button
                      onClick={() => { onClose(); onFilterByLocation(memory.location); }}
                      className="font-medium hover:underline hover:text-[#2D2D2D]"
                    >
                      {memory.location}
                    </button>
                  </span>

                  {memory.photographer && (
                    <span className="flex items-center space-x-1.5">
                      <Camera className="w-4 h-4 text-[#8C7851]" />
                      <span>Photo: {memory.photographer}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Evocative Quote (if present) */}
              {memory.quote && (
                <div className="p-5 rounded-2xl bg-[#F1EDE4] border-l-4 border-[#8C7851] text-[#2D2D2D] font-quote text-base sm:text-lg italic leading-relaxed shadow-xs flex items-start space-x-3">
                  <Quote className="w-5 h-5 text-[#8C7851] shrink-0 mt-1" />
                  <span>"{memory.quote}"</span>
                </div>
              )}

              {/* The Full Event Story */}
              <div className="space-y-4 text-[#2D2D2D]/85 text-base leading-relaxed font-sans">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2D2D2D] first-letter:mr-2 first-letter:float-left">
                  {memory.story}
                </p>
              </div>

              {/* Tags */}
              {memory.tags && memory.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {memory.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#F1EDE4] text-[#2D2D2D] text-xs font-sans font-medium flex items-center space-x-1 border border-[#2D2D2D]/10"
                    >
                      <Tag className="w-3 h-3 text-[#8C7851]" />
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* Right 1 Col: Tagged Members & Family Reflections */}
            <div className="space-y-6 bg-[#F1EDE4] p-5 sm:p-6 rounded-2xl border border-[#2D2D2D]/10 shadow-xs font-sans">
              
              {/* Tagged Family Members */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2D2D]/60 mb-3 flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-[#8C7851]" />
                  <span>Family Members Present</span>
                </h3>

                <div className="space-y-2">
                  {memory.familyMembers.map((memberName) => {
                    const avatar = getMemberAvatar(memberName);
                    return (
                      <div
                        key={memberName}
                        onClick={() => { onClose(); onFilterByMember(memberName); }}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/70 hover:bg-white transition-colors cursor-pointer border border-[#2D2D2D]/10"
                        title={`Filter archive by ${memberName}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={memberName}
                              className="w-7 h-7 rounded-full object-cover border border-[#8C7851]/30"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#E5E2D9] text-[#2D2D2D] flex items-center justify-center font-bold text-xs">
                              {memberName[0]}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-[#2D2D2D]">{memberName}</span>
                        </div>
                        <span className="text-[11px] text-[#8C7851] font-medium">Filter →</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Family Reflections & Comments Section */}
              <div className="pt-4 border-t border-[#2D2D2D]/10 space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2D2D]/60 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4 text-[#8C7851]" />
                    <span>Family Reflections ({memory.comments ? memory.comments.length : 0})</span>
                  </span>
                </h3>

                {/* Existing Comments List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {memory.comments && memory.comments.length > 0 ? (
                    memory.comments.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-white/80 border border-[#2D2D2D]/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#2D2D2D]">{c.author}</span>
                          <span className="text-[10px] text-[#2D2D2D]/50">{c.date}</span>
                        </div>
                        {c.relation && (
                          <span className="text-[10px] text-[#8C7851] font-medium block">
                            ({c.relation})
                          </span>
                        )}
                        <p className="text-[#2D2D2D]/80 leading-relaxed italic">
                          "{c.text}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#2D2D2D]/50 italic py-1">
                      No reflections recorded yet. Share your memory of this day below.
                    </p>
                  )}
                </div>

                {/* Add Reflection Form */}
                <form onSubmit={handleSubmitComment} className="pt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      required
                      className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
                    />
                    <input
                      type="text"
                      placeholder="Relation (e.g. Grandson)"
                      value={commentRelation}
                      onChange={(e) => setCommentRelation(e.target.value)}
                      className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
                    />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <input
                      type="text"
                      placeholder="Share a story or reflection..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                      className="flex-1 px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-[#2D2D2D] hover:bg-black text-[#F9F7F2] transition-colors"
                      title="Post Reflection"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {commentSuccess && (
                    <p className="text-[11px] text-emerald-800 font-medium flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>Reflection archived in family record!</span>
                    </p>
                  )}
                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
