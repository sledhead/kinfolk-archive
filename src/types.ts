export interface MemoryComment {
  id: string;
  author: string;
  relation?: string;
  text: string;
  date: string;
}

export interface FamilyMemory {
  id: string;
  title: string;
  story: string;
  date: string; // YYYY-MM-DD or readable
  year: number;
  decade: string; // "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"
  location: string;
  coordinates?: { lat: number; lng: number };
  imageUrl: string;
  additionalImages?: string[];
  familyMembers: string[];
  category: 'Holiday' | 'Reunion' | 'Vacation' | 'Birthday' | 'Milestone' | 'Everyday' | 'Tradition' | 'Wedding';
  quote?: string;
  photographer?: string;
  isFavorite?: boolean;
  comments: MemoryComment[];
  tags: string[];
  audioNarrative?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  birthYear?: number;
  bio?: string;
  color?: string;
}

export type ViewMode = 'timeline' | 'grid' | 'storybook' | 'slideshow';

export interface FilterState {
  searchQuery: string;
  year: number | 'all';
  decade: string | 'all';
  member: string | 'all';
  location: string | 'all';
  category: string | 'all';
  onlyFavorites: boolean;
  sortBy: 'year-asc' | 'year-desc' | 'date-newest' | 'title';
}
