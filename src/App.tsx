/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FamilyMemory, 
  FamilyMember, 
  FilterState, 
  ViewMode, 
  MemoryComment 
} from './types';
import { 
  INITIAL_MEMORIES, 
  INITIAL_FAMILY_MEMBERS 
} from './data/initialMemories';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { TimelineView } from './components/TimelineView';
import { GridView } from './components/GridView';
import { StoryBookView } from './components/StoryBookView';
import { SlideshowView } from './components/SlideshowView';
import { MemoryDetailModal } from './components/MemoryDetailModal';
import { FamilyDirectoryModal } from './components/FamilyDirectoryModal';
import { FlashbackModal } from './components/FlashbackModal';
import { ExportImportModal } from './components/ExportImportModal';
import { soundFx } from './utils/sound';
import { Sparkles, Heart, Filter, X } from 'lucide-react';

const STORAGE_KEY_MEMORIES = 'kinfolk_family_memories_v1';
const STORAGE_KEY_MEMBERS = 'kinfolk_family_members_v1';

export default function App() {
  // 1. Core State Persistence
  const [memories, setMemories] = useState<FamilyMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEMORIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_MEMORIES;
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_FAMILY_MEMBERS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEMORIES, JSON.stringify(memories));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for memories:', e);
    }
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(familyMembers));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for members:', e);
    }
  }, [familyMembers]);

  // 2. View & Filter State
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    year: 'all',
    decade: 'all',
    member: 'all',
    location: 'all',
    category: 'all',
    onlyFavorites: false,
    sortBy: 'year-asc',
  });

  // 3. Modals State
  const [selectedMemory, setSelectedMemory] = useState<FamilyMemory | null>(null);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isFlashbackModalOpen, setIsFlashbackModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // 4. Filtering & Sorting Logic
  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      // Search query
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase().trim();
        const titleMatch = memory.title.toLowerCase().includes(query);
        const storyMatch = memory.story.toLowerCase().includes(query);
        const locationMatch = memory.location.toLowerCase().includes(query);
        const memberMatch = memory.familyMembers.some(m => m.toLowerCase().includes(query));
        const quoteMatch = memory.quote ? memory.quote.toLowerCase().includes(query) : false;
        const tagMatch = memory.tags ? memory.tags.some(t => t.toLowerCase().includes(query)) : false;
        const commentsMatch = memory.comments ? memory.comments.some(c => c.text.toLowerCase().includes(query) || c.author.toLowerCase().includes(query)) : false;

        if (!titleMatch && !storyMatch && !locationMatch && !memberMatch && !quoteMatch && !tagMatch && !commentsMatch) {
          return false;
        }
      }

      // Year / Decade filter
      if (filterState.year !== 'all') {
        if (memory.year !== filterState.year) return false;
      } else if (filterState.decade !== 'all') {
        if (memory.decade !== filterState.decade) return false;
      }

      // Member filter
      if (filterState.member !== 'all') {
        const hasMember = memory.familyMembers.some(
          m => m.toLowerCase() === filterState.member.toLowerCase() || m.toLowerCase().includes(filterState.member.toLowerCase())
        );
        if (!hasMember) return false;
      }

      // Location filter
      if (filterState.location !== 'all') {
        if (memory.location !== filterState.location) return false;
      }

      // Category filter
      if (filterState.category !== 'all') {
        if (memory.category !== filterState.category) return false;
      }

      // Favorites filter
      if (filterState.onlyFavorites) {
        if (!memory.isFavorite) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'year-asc') {
        return a.year - b.year || a.date.localeCompare(b.date);
      }
      if (filterState.sortBy === 'year-desc') {
        return b.year - a.year || b.date.localeCompare(a.date);
      }
      if (filterState.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [memories, filterState]);

  // Handlers
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playChime(620, 0.1);
    setMemories(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleAddComment = (memoryId: string, newComment: Omit<MemoryComment, 'id' | 'date'>) => {
    const commentWithMeta: MemoryComment = {
      id: `c-${Date.now()}`,
      author: newComment.author,
      relation: newComment.relation,
      text: newComment.text,
      date: new Date().toISOString().split('T')[0],
    };

    setMemories(prev => prev.map(m => {
      if (m.id === memoryId) {
        const updatedComments = [...(m.comments || []), commentWithMeta];
        return { ...m, comments: updatedComments };
      }
      return m;
    }));

    if (selectedMemory && selectedMemory.id === memoryId) {
      setSelectedMemory(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), commentWithMeta]
      } : null);
    }
  };

  const handleAddNewMember = (newMember: FamilyMember) => {
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const handleFilterByMember = (memberName: string) => {
    soundFx.playChime(500, 0.1);
    setFilterState(prev => ({ ...prev, member: memberName }));
  };

  const handleFilterByLocation = (location: string) => {
    soundFx.playChime(500, 0.1);
    setFilterState(prev => ({ ...prev, location }));
  };

  const handleFilterByYear = (year: number) => {
    soundFx.playChime(500, 0.1);
    const decStr = `${Math.floor(year / 10) * 10}s`;
    setFilterState(prev => ({ ...prev, year, decade: decStr }));
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      year: 'all',
      decade: 'all',
      member: 'all',
      location: 'all',
      category: 'all',
      onlyFavorites: false,
      sortBy: 'year-asc',
    });
  };

  const handleImportArchive = (data: { memories: FamilyMemory[]; familyMembers: FamilyMember[] }) => {
    setMemories(data.memories);
    if (data.familyMembers) {
      setFamilyMembers(data.familyMembers);
    }
  };

  const handleResetArchive = () => {
    setMemories(INITIAL_MEMORIES);
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    handleResetFilters();
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2c2824] flex flex-col">
      
      {/* 1. Main Navigation Header */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalMemories={memories.length}
        filteredCount={filteredMemories.length}
        onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
        onOpenFlashbackModal={() => setIsFlashbackModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* 2. Interactive Search & Multi-Filter Bar (Year, Member, Location, Category) */}
      <FilterBar
        filterState={filterState}
        setFilterState={setFilterState}
        memories={memories}
        familyMembers={familyMembers}
      />

      {/* Active Filter Pills Bar (Quick removal if any filter is active) */}
      {(filterState.member !== 'all' || filterState.location !== 'all' || filterState.year !== 'all' || filterState.decade !== 'all' || filterState.category !== 'all' || filterState.onlyFavorites || filterState.searchQuery) && (
        <div className="bg-[#F1EDE4] border-b border-[#2D2D2D]/10 px-4 py-2.5 text-xs font-sans">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
              <span className="font-medium text-[#2D2D2D]/60 text-[10px] uppercase tracking-[0.2em]">
                Active Filters ({filteredMemories.length} results):
              </span>

              {filterState.searchQuery && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Search: "{filterState.searchQuery}"</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.member !== 'all' && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Member: {filterState.member}</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, member: 'all' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.location !== 'all' && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Location: {filterState.location}</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, location: 'all' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.year !== 'all' && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Year: {filterState.year}</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, year: 'all', decade: 'all' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.decade !== 'all' && filterState.year === 'all' && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Era: {filterState.decade}</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, decade: 'all' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.category !== 'all' && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2D2D2D] border border-[#2D2D2D]/10 text-xs shadow-2xs">
                  <span>Category: {filterState.category}</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, category: 'all' }))}>
                    <X className="w-3 h-3 text-[#8C7851] hover:text-[#2D2D2D]" />
                  </button>
                </span>
              )}

              {filterState.onlyFavorites && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2D2D2D] text-[#F9F7F2] border border-[#2D2D2D] text-xs shadow-2xs">
                  <Heart className="w-3 h-3 fill-[#8C7851] text-[#8C7851]" />
                  <span>Favorites Only</span>
                  <button onClick={() => setFilterState(prev => ({ ...prev, onlyFavorites: false }))}>
                    <X className="w-3 h-3 text-white/70 hover:text-white" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-medium uppercase tracking-wider text-[#8C7851] hover:text-[#2D2D2D] underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Views Area */}
      <main className="flex-1">
        {viewMode === 'timeline' && (
          <TimelineView
            memories={filteredMemories}
            familyMembers={familyMembers}
            onSelectMemory={(m) => setSelectedMemory(m)}
            onToggleFavorite={handleToggleFavorite}
            onFilterByMember={handleFilterByMember}
            onFilterByLocation={handleFilterByLocation}
            onFilterByYear={handleFilterByYear}
            onResetFilters={handleResetFilters}
          />
        )}

        {viewMode === 'grid' && (
          <GridView
            memories={filteredMemories}
            familyMembers={familyMembers}
            onSelectMemory={(m) => setSelectedMemory(m)}
            onToggleFavorite={handleToggleFavorite}
            onFilterByMember={handleFilterByMember}
            onFilterByLocation={handleFilterByLocation}
            onFilterByYear={handleFilterByYear}
            onResetFilters={handleResetFilters}
          />
        )}

        {viewMode === 'storybook' && (
          <StoryBookView
            memories={filteredMemories}
            familyMembers={familyMembers}
            onSelectMemory={(m) => setSelectedMemory(m)}
            onToggleFavorite={handleToggleFavorite}
            onFilterByMember={handleFilterByMember}
            onFilterByLocation={handleFilterByLocation}
            onFilterByYear={handleFilterByYear}
            onResetFilters={handleResetFilters}
          />
        )}

        {viewMode === 'slideshow' && (
          <SlideshowView
            memories={filteredMemories}
            onSelectMemory={(m) => setSelectedMemory(m)}
          />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-[#2D2D2D]/10 bg-[#F1EDE4] py-8 px-4 sm:px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2D2D2D]/60">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-base font-light italic text-[#2D2D2D]">Kinfolk Archive</span>
            <span>•</span>
            <span className="text-[11px] uppercase tracking-wider">Family Chronicle & Story Archive (1968 – Present)</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFamilyModalOpen(true)}
              className="text-[#8C7851] font-medium uppercase tracking-wider text-[11px] hover:text-[#2D2D2D] hover:underline"
            >
              Heritage Directory
            </button>
            <span>•</span>
            <button
              onClick={() => setIsFlashbackModalOpen(true)}
              className="text-[#8C7851] font-medium uppercase tracking-wider text-[11px] hover:text-[#2D2D2D] hover:underline flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-[#8C7851]" />
              <span>Flashback</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 5. Modals & Lightbox Components */}
      {selectedMemory && (
        <MemoryDetailModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          allMemories={filteredMemories}
          familyMembers={familyMembers}
          onToggleFavorite={handleToggleFavorite}
          onAddComment={handleAddComment}
          onFilterByMember={handleFilterByMember}
          onFilterByLocation={handleFilterByLocation}
          onFilterByYear={handleFilterByYear}
          onNavigateMemory={(m) => setSelectedMemory(m)}
        />
      )}

      <FamilyDirectoryModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        familyMembers={familyMembers}
        memories={memories}
        onSelectMemberFilter={(name) => {
          handleFilterByMember(name);
          setIsFamilyModalOpen(false);
        }}
        onAddMember={handleAddNewMember}
      />

      <FlashbackModal
        isOpen={isFlashbackModalOpen}
        onClose={() => setIsFlashbackModalOpen(false)}
        memories={memories}
        onSelectMemory={(m) => {
          setSelectedMemory(m);
          setIsFlashbackModalOpen(false);
        }}
      />

      <ExportImportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        memories={memories}
        familyMembers={familyMembers}
        onImportArchive={handleImportArchive}
        onResetArchive={handleResetArchive}
      />

    </div>
  );
}
