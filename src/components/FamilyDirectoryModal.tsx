import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Plus, 
  Calendar, 
  Image as ImageIcon, 
  Check, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { FamilyMember, FamilyMemory } from '../types';

interface FamilyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  memories: FamilyMemory[];
  onSelectMemberFilter: (memberName: string) => void;
  onAddMember: (member: FamilyMember) => void;
}

export const FamilyDirectoryModal: React.FC<FamilyDirectoryModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  memories,
  onSelectMemberFilter,
  onAddMember,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [birthYear, setBirthYear] = useState<number | ''>('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  if (!isOpen) return null;

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relation.trim()) return;

    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim(),
      birthYear: birthYear ? Number(birthYear) : undefined,
      bio: bio.trim() || undefined,
      avatar: avatarUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    };

    onAddMember(newMember);
    setName('');
    setRelation('');
    setBirthYear('');
    setBio('');
    setAvatarUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="editorial-bracket relative bg-[#F9F7F2] rounded-3xl shadow-2xl border border-[#2D2D2D]/15 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F1EDE4] border-b border-[#2D2D2D]/10 shrink-0 font-sans">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#2D2D2D] text-[#F9F7F2] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-light italic text-[#2D2D2D]">
                Family Members & Heritage Directory
              </h2>
              <p className="text-xs text-[#2D2D2D]/60">
                {familyMembers.length} relatives chronicled across generations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 rounded-full bg-[#2D2D2D] hover:bg-black text-[#F9F7F2] text-xs font-sans uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add Relative'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Member Form (Accordion) */}
        {showAddForm && (
          <form onSubmit={handleCreateMember} className="p-6 bg-[#F1EDE4] border-b border-[#2D2D2D]/10 space-y-4 animate-in slide-in-from-top-4 duration-200 font-sans">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2D2D]/70">
              Add New Family Member
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name (e.g. Grandma Rose)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              />
              <input
                type="text"
                placeholder="Relation (e.g. Great Grandmother)"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                required
                className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              />
              <input
                type="number"
                placeholder="Birth Year (e.g. 1948)"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : '')}
                className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="url"
                placeholder="Portrait Image URL (optional)"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              />
              <input
                type="text"
                placeholder="Short bio or personal note (e.g. Master gardener, piano teacher)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="px-3 py-2 bg-white rounded-lg border border-[#2D2D2D]/10 text-xs text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#2D2D2D] text-[#F9F7F2] text-xs font-sans uppercase tracking-wider hover:bg-black"
              >
                Save Member Profile
              </button>
            </div>
          </form>
        )}

        {/* Directory Grid */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          {familyMembers.map((member) => {
            const memberMemories = memories.filter(m => m.familyMembers.includes(member.name));
            
            return (
              <div
                key={member.id}
                className="bg-white/80 rounded-2xl border border-[#2D2D2D]/10 p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#8C7851]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#2D2D2D]/10 shadow-2xs group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#2D2D2D] leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[#8C7851] font-medium">
                        {member.relation}
                      </p>
                      {member.birthYear && (
                        <p className="text-[11px] text-[#2D2D2D]/50">
                          Born {member.birthYear}
                        </p>
                      )}
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-[#2D2D2D]/75 italic leading-relaxed mb-3">
                      "{member.bio}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#2D2D2D]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#2D2D2D]/50 font-medium">
                    {memberMemories.length} {memberMemories.length === 1 ? 'event photo' : 'event photos'}
                  </span>

                  <button
                    onClick={() => {
                      onSelectMemberFilter(member.name);
                      onClose();
                    }}
                    className="text-xs font-semibold text-[#8C7851] hover:text-[#2D2D2D] hover:underline flex items-center space-x-1"
                  >
                    <span>View Memories</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
