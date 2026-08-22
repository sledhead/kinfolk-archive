import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Maximize2, 
  User, 
  Quote, 
  Clock 
} from 'lucide-react';
import { FamilyMemory, FamilyMember } from '../types';

interface GridViewProps {
  memories: FamilyMemory[];
  familyMembers: FamilyMember[];
  onSelectMemory: (memory: FamilyMemory) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onFilterByMember: (memberName: string) => void;
  onFilterByLocation: (location: string) => void;
  onFilterByYear: (year: number) => void;
  onResetFilters: () => void;
}

export const GridView: React.FC<GridViewProps> = ({
  memories,
  familyMembers,
  onSelectMemory,
  onToggleFavorite,
  onFilterByMember,
  onFilterByLocation,
  onFilterByYear,
  onResetFilters,
}) => {
  const getMemberAvatar = (memberName: string) => {
    const found = familyMembers.find(m => m.name.toLowerCase() === memberName.toLowerCase() || memberName.toLowerCase().includes(m.name.toLowerCase()));
    return found?.avatar || null;
  };

  if (memories.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-amber-100/80 text-amber-800 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <Clock className="w-8 h-8 text-amber-700" />
        </div>
        <h3 className="font-serif text-xl font-bold text-amber-950 mb-2">
          No Memories in This View
        </h3>
        <p className="text-sm text-[#7a6d5f] mb-6">
          No photo memories matched your search filters. Try adjusting your year, member, or location filter.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold shadow-xs transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <div
            key={memory.id}
            id={`grid-card-${memory.id}`}
            onClick={() => onSelectMemory(memory)}
            className="editorial-bracket group bg-[#F1EDE4] rounded-2xl border border-[#2D2D2D]/10 hover:border-[#8C7851]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
          >
            {/* Image Container with Vintage Border */}
            <div className="relative aspect-16/11 overflow-hidden bg-stone-100">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 opacity-60 group-hover:opacity-75 transition-opacity" />

              {/* Year Ribbon */}
              <button
                onClick={(e) => { e.stopPropagation(); onFilterByYear(memory.year); }}
                className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[#F9F7F2] text-xs font-serif font-bold tracking-wide border border-white/20 hover:bg-black/85 transition-colors"
              >
                {memory.year}
              </button>

              {/* Category */}
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#2D2D2D]/85 backdrop-blur-md text-[#F9F7F2] text-[10px] font-sans uppercase tracking-wider border border-[#8C7851]/30">
                {memory.category}
              </span>

              {/* Favorite & Maximize */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <button
                  onClick={(e) => onToggleFavorite(memory.id, e)}
                  className="p-1.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/75 transition-all"
                  title={memory.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart className={`w-4 h-4 ${memory.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                </button>

                <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans">
              
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-[#2D2D2D]/60 mb-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8C7851] shrink-0" />
                    <span>{memory.date}</span>
                  </span>

                  <button
                    onClick={(e) => { e.stopPropagation(); onFilterByLocation(memory.location); }}
                    className="flex items-center space-x-1 hover:text-[#2D2D2D] hover:underline transition-colors text-right max-w-[150px] truncate"
                  >
                    <MapPin className="w-3 h-3 text-[#8C7851] shrink-0" />
                    <span className="truncate">{memory.location}</span>
                  </button>
                </div>

                {/* Title */}
                <h4 className="font-serif text-lg font-light italic text-[#2D2D2D] leading-snug mb-2 group-hover:text-[#8C7851] transition-colors line-clamp-2">
                  {memory.title}
                </h4>

                {/* Story Excerpt */}
                <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed line-clamp-3">
                  {memory.story}
                </p>
              </div>

              {/* Tagged Family Avatars Footer */}
              <div className="pt-3 border-t border-[#2D2D2D]/10 flex items-center justify-between">
                <div className="flex items-center -space-x-1.5 overflow-hidden">
                  {memory.familyMembers.slice(0, 4).map((member) => {
                    const avatar = getMemberAvatar(member);
                    return (
                      <div
                        key={member}
                        title={member}
                        className="relative w-6 h-6 rounded-full border-2 border-[#F1EDE4] overflow-hidden bg-[#E5E2D9]"
                      >
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={member}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-[#2D2D2D]">
                            {member[0]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {memory.familyMembers.length > 4 && (
                    <span className="pl-2 text-[11px] font-semibold text-[#2D2D2D]/50">
                      +{memory.familyMembers.length - 4} more
                    </span>
                  )}
                </div>

                {memory.comments && memory.comments.length > 0 && (
                  <span className="flex items-center space-x-1 text-xs text-[#2D2D2D]/60">
                    <MessageSquare className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span>{memory.comments.length}</span>
                  </span>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
