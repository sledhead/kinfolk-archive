import React, { useState } from 'react';
import { 
  Clock, 
  Grid, 
  BookOpen, 
  Play, 
  Users, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Share2, 
  Menu, 
  X,
  Camera
} from 'lucide-react';
import { ViewMode } from '../types';
import { soundFx } from '../utils/sound';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  totalMemories: number;
  filteredCount: number;
  onOpenFamilyModal: () => void;
  onOpenFlashbackModal: () => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  totalMemories,
  filteredCount,
  onOpenFamilyModal,
  onOpenFlashbackModal,
  onOpenExportModal,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleModeChange = (mode: ViewMode) => {
    soundFx.playChime(440, 0.1);
    setViewMode(mode);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2D2D2D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          
          {/* Masthead Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#2D2D2D] text-[#F9F7F2] flex items-center justify-center shadow-xs">
              <Camera className="w-4 h-4 text-[#8C7851]" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#2D2D2D]/60 font-semibold mb-0.5">
                Family Archive & Oral History
              </p>
              <div className="flex items-center space-x-2.5">
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-tighter text-[#2D2D2D]">
                  The Klempel Chronicle
                </span>
                <span className="hidden sm:inline-block text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#2D2D2D]/5 text-[#8C7851] border border-[#8C7851]/30 font-semibold">
                  1948 — 2024
                </span>
              </div>
            </div>
          </div>

          {/* Center: View Switcher (Desktop Editorial Navigation) */}
          <div className="hidden lg:flex items-center p-1 bg-[#F1EDE4] rounded-full border border-[#2D2D2D]/10 text-xs uppercase tracking-wider font-sans">
            <button
              id="view-timeline-btn"
              onClick={() => handleModeChange('timeline')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                  : 'text-[#2D2D2D]/70 hover:text-[#2D2D2D]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>

            <button
              id="view-grid-btn"
              onClick={() => handleModeChange('grid')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                  : 'text-[#2D2D2D]/70 hover:text-[#2D2D2D]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Photo Album</span>
            </button>

            <button
              id="view-storybook-btn"
              onClick={() => handleModeChange('storybook')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
                viewMode === 'storybook'
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                  : 'text-[#2D2D2D]/70 hover:text-[#2D2D2D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Storybook</span>
            </button>

            <button
              id="view-slideshow-btn"
              onClick={() => handleModeChange('slideshow')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
                viewMode === 'slideshow'
                  ? 'bg-[#2D2D2D] text-[#F9F7F2] shadow-xs'
                  : 'text-[#2D2D2D]/70 hover:text-[#2D2D2D]'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Flashback */}
            <button
              id="flashback-btn"
              onClick={onOpenFlashbackModal}
              title="Memory Flashback"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-full bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D] border border-[#2D2D2D]/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
              <span className="hidden sm:inline">Flashback</span>
            </button>

            {/* Family Members */}
            <button
              id="family-members-btn"
              onClick={onOpenFamilyModal}
              title="Family Members Directory"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-full bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D] border border-[#2D2D2D]/10 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#8C7851]" />
              <span className="hidden md:inline">Directory</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={handleToggleMute}
              title={isMuted ? "Enable Memory Chimes" : "Mute Sound Effects"}
              className={`p-2 rounded-full border transition-colors ${
                !isMuted 
                  ? 'bg-[#8C7851]/15 border-[#8C7851]/40 text-[#2D2D2D]' 
                  : 'bg-[#F1EDE4] border-[#2D2D2D]/10 text-[#2D2D2D]/50 hover:text-[#2D2D2D]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8C7851]" />}
            </button>

            {/* Export / Options */}
            <button
              id="export-archive-btn"
              onClick={onOpenExportModal}
              title="Archive Options & Backup"
              className="p-2 rounded-full bg-[#F1EDE4] hover:bg-[#E5E2D9] border border-[#2D2D2D]/10 text-[#2D2D2D]/70 transition-colors hidden sm:flex"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#F1EDE4] border border-[#2D2D2D]/10 text-[#2D2D2D]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-3 border-t border-[#2D2D2D]/10 flex flex-col space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/50 px-1 font-sans">
              Display Archive Mode
            </p>
            <div className="grid grid-cols-2 gap-2 font-sans text-xs">
              <button
                onClick={() => handleModeChange('timeline')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl font-medium ${
                  viewMode === 'timeline'
                    ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                    : 'bg-[#F1EDE4] text-[#2D2D2D]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Timeline</span>
              </button>

              <button
                onClick={() => handleModeChange('grid')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl font-medium ${
                  viewMode === 'grid'
                    ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                    : 'bg-[#F1EDE4] text-[#2D2D2D]'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Photo Album</span>
              </button>

              <button
                onClick={() => handleModeChange('storybook')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl font-medium ${
                  viewMode === 'storybook'
                    ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                    : 'bg-[#F1EDE4] text-[#2D2D2D]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Storybook</span>
              </button>

              <button
                onClick={() => handleModeChange('slideshow')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl font-medium ${
                  viewMode === 'slideshow'
                    ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                    : 'bg-[#F1EDE4] text-[#2D2D2D]'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Slideshow</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2D2D2D]/10 text-xs font-sans">
              <button
                onClick={() => { onOpenExportModal(); setMobileMenuOpen(false); }}
                className="text-[#8C7851] hover:underline flex items-center space-x-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Backup Archive</span>
              </button>
              <span className="text-[#2D2D2D]/50 text-[10px] uppercase tracking-widest">
                {filteredCount} / {totalMemories} records
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
