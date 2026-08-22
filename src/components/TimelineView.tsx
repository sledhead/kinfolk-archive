import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Maximize2, 
  Sparkles, 
  Tag, 
  ChevronRight,
  User,
  Quote,
  Clock
} from 'lucide-react';
import { FamilyMemory, FamilyMember } from '../types';
import { soundFx } from '../utils/sound';

interface TimelineViewProps {
  memories: FamilyMemory[];
  familyMembers: FamilyMember[];
  onSelectMemory: (memory: FamilyMemory) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onFilterByMember: (memberName: string) => void;
  onFilterByLocation: (location: string) => void;
  onFilterByYear: (year: number) => void;
  onResetFilters: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  memories,
  familyMembers,
  onSelectMemory,
  onToggleFavorite,
  onFilterByMember,
  onFilterByLocation,
  onFilterByYear,
  onResetFilters,
}) => {
  const [expandedStories, setExpandedStories] = useState<Record<string, boolean>>({});

  // Group memories by decade for visual era separators
  const groupedByDecade = memories.reduce((acc: Record<string, FamilyMemory[]>, memory: FamilyMemory) => {
    const decade = memory.decade || `${Math.floor(memory.year / 10) * 10}s`;
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(memory);
    return acc;
  }, {} as Record<string, FamilyMemory[]>);

  const decadeKeys = Object.keys(groupedByDecade).sort();

  const toggleStoryExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedStories(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
          No Family Memories Found
        </h3>
        <p className="text-sm text-[#7a6d5f] mb-6">
          We couldn't find any photos or stories matching your selected year, member, or location filters.
        </p>
        <button
          id="empty-reset-filters-btn"
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold shadow-xs transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Interactive Timeline Era Quick Scrubber */}
      <div className="sticky top-20 z-20 mb-10 py-2.5 px-4 bg-[#F9F7F2]/90 backdrop-blur-md rounded-full border border-[#2D2D2D]/10 shadow-xs flex items-center justify-between overflow-x-auto no-scrollbar font-sans">
        <div className="flex items-center space-x-1.5 text-[10px] text-[#2D2D2D]/60 font-semibold uppercase tracking-[0.2em] pr-3 border-r border-[#2D2D2D]/10 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
          <span>Timeline Eras:</span>
        </div>
        <div className="flex items-center space-x-1 pl-2">
          {decadeKeys.map(decade => (
            <a
              key={decade}
              href={`#decade-section-${decade}`}
              onClick={() => soundFx.playChime(500, 0.1)}
              className="px-3 py-1 rounded-full text-xs font-medium text-[#2D2D2D]/70 hover:text-[#2D2D2D] hover:bg-[#F1EDE4] transition-colors whitespace-nowrap"
            >
              {decade} <span className="text-[#8C7851] text-[10px]">({groupedByDecade[decade].length})</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Timeline Container */}
      <div className="relative">
        
        {/* Continuous Timeline Central Spine Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-[#2D2D2D]/15 transform sm:-translate-x-1/2" />

        {decadeKeys.map((decade) => {
          const decadeMemories = groupedByDecade[decade];
          
          return (
            <div key={decade} id={`decade-section-${decade}`} className="mb-16 scroll-mt-36">
              
              {/* Decade Marker Header */}
              <div className="relative flex items-center justify-start sm:justify-center mb-10 pl-12 sm:pl-0">
                <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#2D2D2D] text-[#F9F7F2] text-xs font-serif tracking-widest uppercase shadow-xs border border-[#8C7851]/30 z-10">
                  <span className="font-light italic text-sm">The {decade}</span>
                  <span className="w-1 h-1 rounded-full bg-[#8C7851]" />
                  <span className="text-[#8C7851] text-[10px] font-sans tracking-widest font-semibold">
                    {decadeMemories.length} {decadeMemories.length === 1 ? 'RECORD' : 'RECORDS'}
                  </span>
                </div>
              </div>

              {/* Memories in this Decade */}
              <div className="space-y-10 sm:space-y-12">
                {decadeMemories.map((memory, index) => {
                  const isEven = index % 2 === 0;
                  const isStoryExpanded = expandedStories[memory.id];
                  const storyPreview = memory.story.length > 200 && !isStoryExpanded
                    ? `${memory.story.substring(0, 200)}...`
                    : memory.story;

                  return (
                    <div
                      key={memory.id}
                      id={`memory-card-${memory.id}`}
                      className={`relative flex flex-col sm:flex-row items-start ${
                        isEven ? 'sm:flex-row-reverse' : ''
                      } group`}
                    >
                      {/* Timeline Node Icon (Center on desktop, left on mobile) */}
                      <div 
                        onClick={() => onFilterByYear(memory.year)}
                        title={`Filter year ${memory.year}`}
                        className="absolute left-4 sm:left-1/2 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#F9F7F2] border border-[#2D2D2D] text-[#2D2D2D] flex items-center justify-center font-serif text-[11px] font-bold shadow-xs z-10 cursor-pointer hover:scale-110 hover:bg-[#2D2D2D] hover:text-[#F9F7F2] transition-all"
                      >
                        {String(memory.year).slice(-2)}'
                      </div>

                      {/* Content Card Container */}
                      <div className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${
                        isEven ? 'sm:pr-8' : 'sm:pl-8'
                      }`}>
                        <div 
                          onClick={() => onSelectMemory(memory)}
                          className="editorial-bracket bg-[#F1EDE4] rounded-2xl border border-[#2D2D2D]/10 hover:border-[#8C7851]/40 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group/card overflow-hidden"
                        >
                          
                          {/* Photo Frame Container */}
                          <div className="relative rounded-xl overflow-hidden mb-4 bg-stone-100 aspect-16/10">
                            <img
                              src={memory.imageUrl}
                              alt={memory.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Gradient Overlay for photo contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover/card:opacity-60 transition-opacity" />

                            {/* Year Badge */}
                            <button
                              onClick={(e) => { e.stopPropagation(); onFilterByYear(memory.year); }}
                              className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[#F9F7F2] text-xs font-serif font-bold tracking-wide border border-white/20 hover:bg-black/85 transition-colors"
                            >
                              {memory.year}
                            </button>

                            {/* Category Badge */}
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#2D2D2D]/85 backdrop-blur-md text-[#F9F7F2] text-[10px] uppercase font-sans tracking-wider border border-[#8C7851]/30">
                              {memory.category}
                            </span>

                            {/* Quick Expand Icon */}
                            <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-black/75">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>

                            {/* Favorite Button */}
                            <button
                              id={`fav-btn-${memory.id}`}
                              onClick={(e) => onToggleFavorite(memory.id, e)}
                              className="absolute bottom-3 left-3 p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:bg-black/80 transition-all"
                              title={memory.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            >
                              <Heart className={`w-3.5 h-3.5 ${memory.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                            </button>
                          </div>

                          {/* Event Meta Information */}
                          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-[#2D2D2D]/60 mb-2 font-sans">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5 text-[#8C7851] shrink-0" />
                              <span>{memory.date}</span>
                            </span>

                            <span className="w-4 h-[1px] bg-[#2D2D2D]/20" />

                            <button
                              onClick={(e) => { e.stopPropagation(); onFilterByLocation(memory.location); }}
                              className="flex items-center space-x-1 hover:text-[#2D2D2D] hover:underline transition-colors text-left"
                            >
                              <MapPin className="w-3.5 h-3.5 text-[#8C7851] shrink-0" />
                              <span className="truncate max-w-[200px]">{memory.location}</span>
                            </button>
                          </div>

                          {/* Event Title */}
                          <h4 className="font-serif text-lg sm:text-xl font-light italic text-[#2D2D2D] leading-snug mb-2 group-hover/card:text-[#8C7851] transition-colors">
                            {memory.title}
                          </h4>

                          {/* The Short Story Narrative */}
                          <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed mb-3 font-sans">
                            {storyPreview}
                            {memory.story.length > 200 && (
                              <button
                                onClick={(e) => toggleStoryExpand(memory.id, e)}
                                className="ml-1.5 text-xs font-semibold text-[#8C7851] hover:underline inline-flex items-center"
                              >
                                {isStoryExpanded ? 'Show less' : 'Read more'}
                              </button>
                            )}
                          </p>

                          {/* Memorable Quote Block (if present) */}
                          {memory.quote && (
                            <div className="p-3 rounded-xl bg-white/60 border-l-2 border-[#8C7851] mb-3 text-xs text-[#2D2D2D] italic font-quote flex items-start space-x-2">
                              <Quote className="w-3.5 h-3.5 text-[#8C7851] shrink-0 mt-0.5" />
                              <span>"{memory.quote}"</span>
                            </div>
                          )}

                          {/* Tagged Family Members Row */}
                          {memory.familyMembers && memory.familyMembers.length > 0 && (
                            <div className="pt-3 border-t border-[#2D2D2D]/10 flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
                                <span className="text-[10px] font-sans uppercase tracking-wider text-[#2D2D2D]/50 shrink-0">With:</span>
                                {memory.familyMembers.map((memberName) => {
                                  const avatar = getMemberAvatar(memberName);
                                  return (
                                    <button
                                      key={memberName}
                                      onClick={(e) => { e.stopPropagation(); onFilterByMember(memberName); }}
                                      title={`Filter memories with ${memberName}`}
                                      className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white hover:bg-[#E5E2D9] text-[#2D2D2D] text-[11px] font-medium transition-colors border border-[#2D2D2D]/10 shrink-0"
                                    >
                                      {avatar ? (
                                        <img
                                          src={avatar}
                                          alt={memberName}
                                          className="w-3.5 h-3.5 rounded-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      ) : (
                                        <User className="w-3 h-3 text-[#8C7851]" />
                                      )}
                                      <span>{memberName.split(' ')[0]}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Comments count */}
                              {memory.comments && memory.comments.length > 0 && (
                                <span className="flex items-center space-x-1 text-[11px] text-[#2D2D2D]/60 shrink-0 font-medium font-sans">
                                  <MessageSquare className="w-3 h-3 text-[#8C7851]" />
                                  <span>{memory.comments.length}</span>
                                </span>
                              )}
                            </div>
                          )}

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};
