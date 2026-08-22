import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  FileText, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { FamilyMemory, FamilyMember } from '../types';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: FamilyMemory[];
  familyMembers: FamilyMember[];
  onImportArchive: (data: { memories: FamilyMemory[]; familyMembers: FamilyMember[] }) => void;
  onResetArchive: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  memories,
  familyMembers,
  onImportArchive,
  onResetArchive,
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const data = {
      archiveName: 'Kinfolk Family Archive',
      exportDate: new Date().toISOString(),
      familyMembers,
      memories,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `kinfolk-family-archive-${new Date().getFullYear()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.memories && Array.isArray(parsed.memories)) {
          onImportArchive({
            memories: parsed.memories,
            familyMembers: parsed.familyMembers || familyMembers,
          });
          setImportStatus('Archive successfully imported!');
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus('Invalid archive file format.');
        }
      } catch {
        setImportStatus('Error reading JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="editorial-bracket relative bg-[#F9F7F2] rounded-3xl shadow-2xl border border-[#2D2D2D]/15 w-full max-w-lg overflow-hidden flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between px-6 py-4 bg-[#F1EDE4] border-b border-[#2D2D2D]/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#2D2D2D] text-[#F9F7F2] flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#8C7851]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-light italic text-[#2D2D2D]">
                Archive Backup & Storage
              </h2>
              <p className="text-xs text-[#2D2D2D]/60">
                JSON export and data synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Export */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#2D2D2D]/10 flex items-center justify-between space-x-4">
            <div>
              <h4 className="font-serif text-sm font-medium text-[#2D2D2D]">Export Archive File</h4>
              <p className="text-xs text-[#2D2D2D]/60">
                Download all {memories.length} family event memories and stories.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-full bg-[#2D2D2D] hover:bg-black text-[#F9F7F2] text-xs font-sans uppercase tracking-wider flex items-center space-x-1.5 shrink-0 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#8C7851]" />
              <span>Export</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#2D2D2D]/10 flex items-center justify-between space-x-4">
            <div>
              <h4 className="font-serif text-sm font-medium text-[#2D2D2D]">Import Archive</h4>
              <p className="text-xs text-[#2D2D2D]/60">
                Restore stories from a previously saved JSON file.
              </p>
            </div>
            <div>
              <input
                id="import-archive-file"
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              <label
                htmlFor="import-archive-file"
                className="px-4 py-2 rounded-full bg-[#F1EDE4] hover:bg-[#E5E2D9] text-[#2D2D2D] text-xs font-sans uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shrink-0 border border-[#2D2D2D]/10 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Import</span>
              </label>
            </div>
          </div>

          {importStatus && (
            <p className="text-xs font-medium text-center text-[#2D2D2D] bg-[#F1EDE4] py-2 rounded-xl border border-[#8C7851]/40">
              {importStatus}
            </p>
          )}

          {/* Reset to Default Sample Data */}
          <div className="p-4 rounded-2xl bg-[#F1EDE4]/60 border border-[#2D2D2D]/10 flex items-center justify-between space-x-4">
            <div>
              <h4 className="font-serif text-sm font-medium text-[#2D2D2D] flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Reset to Default Collection</span>
              </h4>
              <p className="text-xs text-[#2D2D2D]/60">
                Restore the default 16 historical family event memories (1968–2024).
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all memories to the original sample archive?')) {
                  onResetArchive();
                  onClose();
                }
              }}
              className="px-4 py-2 rounded-full bg-[#E5E2D9] hover:bg-[#d8d4ca] text-[#2D2D2D] text-xs font-sans uppercase tracking-wider flex items-center space-x-1 shrink-0 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
