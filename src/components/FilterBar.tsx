import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  Heart, 
  ArrowUpDown, 
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { FilterState, FamilyMember, FamilyMemory } from '../types';

interface FilterBarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  memories: FamilyMemory[];
  familyMembers: FamilyMember[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterState,
  setFilterState,
  memories,
  familyMembers,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique decades, years, locations, and categories
  const decades = useMemo(() => {
    const decs = Array.from(new Set(memories.map(m => m.decade))).sort();
    return decs;
  }, [memories]);

  const years = useMemo(() => {
    const rawYears: number[] = memories.map(m => m.year);
    const yrs = Array.from(new Set(rawYears)).sort((a, b) => a - b);
    return yrs;
  }, [memories]);

  const locations = useMemo(() => {
    const locs = Array.from(new Set(memories.map(m => m.location))).sort();
    return locs;
  }, [memories]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(memories.map(m => m.category))).sort();
    return cats;
  }, [memories]);

  // Compute memory count per member
  const memberCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    familyMembers.forEach(fm => {
      counts[fm.name] = memories.filter(m => m.familyMembers.includes(fm.name)).length;
    });
    return counts;
  }, [memories, familyMembers]);

  // Compute memory count per location
  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    locations.forEach(loc => {
      counts[loc] = memories.filter(m => m.location === loc).length;
    });
    return counts;
  }, [memories, locations]);

  // Active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.searchQuery.trim()) count++;
    if (filterState.decade !== 'all') count++;
    if (filterState.year !== 'all') count++;
    if (filterState.member !== 'all') count++;
    if (filterState.location !== 'all') count++;
    if (filterState.category !== 'all') count++;
    if (filterState.onlyFavorites) count++;
    return count;
  }, [filterState]);

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

  return (
    <div className="bg-[#F9F7F2] border-b border-[#2D2D2D]/10 py-4 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto space-y-3.5">
        
        {/* Top Row: Search Input + Quick Decade Pills + Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Primary Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7851]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-memory-input"
              type="text"
              placeholder="Search family memories, stories, people, places, or keywords..."
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-8 py-2.5 bg-[#F1EDE4] rounded-full border border-[#2D2D2D]/10 text-xs sm:text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851] focus:bg-white transition-all font-sans"
            />
            {filterState.searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#2D2D2D]/50 hover:text-[#2D2D2D]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Decade Quick Jump Pills (Desktop/Tablet) */}
          <div className="hidden md:flex items-center space-x-1 bg-[#F1EDE4] p-1 rounded-full border border-[#2D2D2D]/10 overflow-x-auto">
            <button
              id="decade-all-btn"
              onClick={() => setFilterState(prev => ({ ...prev, decade: 'all', year: 'all' }))}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                filterState.decade === 'all' && filterState.year === 'all'
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                  : 'text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
              }`}
            >
              All Eras
            </button>
            {decades.map(dec => (
              <button
                key={dec}
                id={`decade-${dec}-btn`}
                onClick={() => setFilterState(prev => ({ ...prev, decade: dec, year: 'all' }))}
                className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap transition-all ${
                  filterState.decade === dec
                    ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                    : 'text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
                }`}
              >
                {dec}
              </button>
            ))}
          </div>

          {/* Filter Bar Controls & Expand Toggle */}
          <div className="flex items-center space-x-2">
            {/* Favorites Toggle */}
            <button
              id="toggle-favorites-btn"
              onClick={() => setFilterState(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-sans uppercase tracking-wider border transition-all ${
                filterState.onlyFavorites
                  ? 'bg-rose-50 border-rose-200 text-rose-800 shadow-xs'
                  : 'bg-[#F1EDE4] border-[#2D2D2D]/10 text-[#2D2D2D]/70 hover:bg-[#E5E2D9]'
              }`}
              title="Filter Starred Memories"
            >
              <Heart className={`w-3.5 h-3.5 ${filterState.onlyFavorites ? 'fill-rose-500 text-rose-500' : 'text-[#8C7851]'}`} />
              <span className="hidden sm:inline">Favorites</span>
            </button>

            {/* Expand / Collapse All Filters Button */}
            <button
              id="expand-filters-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-sans uppercase tracking-wider border transition-all ${
                activeFilterCount > 0
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D]'
                  : 'bg-[#F1EDE4] border-[#2D2D2D]/10 text-[#2D2D2D]/70 hover:bg-[#E5E2D9]'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-[#8C7851]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#8C7851] text-white text-[10px] flex items-center justify-center font-bold ml-0.5">
                  {activeFilterCount}
                </span>
              )}
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Reset Filters (Visible if active) */}
            {activeFilterCount > 0 && (
              <button
                id="reset-filters-btn"
                onClick={handleResetFilters}
                className="p-2 rounded-full bg-[#F1EDE4] border border-[#2D2D2D]/10 text-[#8C7851] hover:text-[#2D2D2D] hover:bg-[#E5E2D9] transition-colors"
                title="Reset All Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Family Member Avatar Chips Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
          <span className="text-[10px] font-sans font-semibold text-[#2D2D2D]/50 uppercase tracking-[0.2em] whitespace-nowrap pl-0.5">
            Member:
          </span>
          <button
            id="filter-member-all-chip"
            onClick={() => setFilterState(prev => ({ ...prev, member: 'all' }))}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filterState.member === 'all'
                ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                : 'bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D]/80 border border-[#2D2D2D]/10'
            }`}
          >
            Everyone ({memories.length})
          </button>
          {familyMembers.map(member => {
            const count = memberCounts[member.name] || 0;
            const isSelected = filterState.member === member.name;
            return (
              <button
                key={member.id}
                id={`filter-member-${member.id}-chip`}
                onClick={() => setFilterState(prev => ({ ...prev, member: isSelected ? 'all' : member.name }))}
                className={`flex items-center space-x-1.5 pl-1.5 pr-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] shadow-xs'
                    : 'bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D] border-[#2D2D2D]/10'
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-5 h-5 rounded-full object-cover border border-white/60"
                  referrerPolicy="no-referrer"
                />
                <span>{member.name.split(' ')[0]}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#8C7851]' : 'text-[#2D2D2D]/50'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Expanded Filters Panel */}
        {isExpanded && (
          <div className="pt-3 pb-2 border-t border-[#2D2D2D]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-150">
            
            {/* Filter by Year / Specific Year */}
            <div className="space-y-1.5">
              <label htmlFor="filter-year-select" className="flex items-center space-x-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/60">
                <Calendar className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Specific Year / Era</span>
              </label>
              <select
                id="filter-year-select"
                value={filterState.year === 'all' ? (filterState.decade === 'all' ? 'all' : `decade:${filterState.decade}`) : filterState.year}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'all') {
                    setFilterState(prev => ({ ...prev, year: 'all', decade: 'all' }));
                  } else if (val.startsWith('decade:')) {
                    const dec = val.replace('decade:', '');
                    setFilterState(prev => ({ ...prev, decade: dec, year: 'all' }));
                  } else {
                    const yr = parseInt(val, 10);
                    const decStr = `${Math.floor(yr / 10) * 10}s`;
                    setFilterState(prev => ({ ...prev, year: yr, decade: decStr }));
                  }
                }}
                className="w-full px-3 py-2 bg-[#F1EDE4] rounded-xl border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              >
                <option value="all">All Years (1968 – 2024)</option>
                <optgroup label="Decades">
                  {decades.map(dec => (
                    <option key={`dec-${dec}`} value={`decade:${dec}`}>Entire {dec}</option>
                  ))}
                </optgroup>
                <optgroup label="Exact Years">
                  {years.map(yr => (
                    <option key={`yr-${yr}`} value={yr}>{yr}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Filter by Location */}
            <div className="space-y-1.5">
              <label htmlFor="filter-location-select" className="flex items-center space-x-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/60">
                <MapPin className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Location</span>
              </label>
              <select
                id="filter-location-select"
                value={filterState.location}
                onChange={(e) => setFilterState(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 bg-[#F1EDE4] rounded-xl border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              >
                <option value="all">All Locations ({locations.length} places)</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc} ({locationCounts[loc] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Category */}
            <div className="space-y-1.5">
              <label htmlFor="filter-category-select" className="flex items-center space-x-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/60">
                <Tag className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Event Category</span>
              </label>
              <select
                id="filter-category-select"
                value={filterState.category}
                onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-[#F1EDE4] rounded-xl border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-1.5">
              <label htmlFor="filter-sort-select" className="flex items-center space-x-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/60">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Sort Order</span>
              </label>
              <select
                id="filter-sort-select"
                value={filterState.sortBy}
                onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="w-full px-3 py-2 bg-[#F1EDE4] rounded-xl border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              >
                <option value="year-asc">Chronological (Oldest First: 1968 → 2024)</option>
                <option value="year-desc">Reverse Chronological (Newest First: 2024 → 1968)</option>
                <option value="title">Event Title (A → Z)</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
