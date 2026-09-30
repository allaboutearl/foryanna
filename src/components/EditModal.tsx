import React, { useState } from 'react';
import { X, Heart, Sparkles, RotateCcw, Check, Upload, Music } from 'lucide-react';
import { SurpriseConfig } from '../types.ts';
import { DEFAULT_CONFIG } from '../config.ts';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SurpriseConfig;
  onSave: (newConfig: SurpriseConfig) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<SurpriseConfig>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset everything to default cute messages and photos?')) {
      setFormData(DEFAULT_CONFIG);
    }
  };

  const handleImageFileChange = (key: 'scenePhoto' | 'favoritePhoto', file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMemoryImageChange = (index: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => {
          const nextMemories = [...prev.memories];
          nextMemories[index] = {
            ...nextMemories[index],
            image: reader.result as string,
          };
          return {
            ...prev,
            memories: nextMemories,
          };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-pink-200 rounded-3xl w-full max-w-md max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 flex items-center justify-between border-b border-pink-200/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐰</span>
            <h2 className="font-cute font-bold text-gray-800 text-base">
              Customize Her Surprise ♡
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 text-gray-500 hover:text-gray-800 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm hide-scrollbar">
          {/* Page 1 Welcome */}
          <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 space-y-3">
            <h3 className="font-cute font-bold text-pink-700 text-xs flex items-center gap-1.5">
              <span>🎀</span>
              Page 1 — Welcome
            </h3>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Welcome Title:</label>
              <input
                type="text"
                value={formData.welcomeTitle}
                onChange={(e) => setFormData({ ...formData, welcomeTitle: e.target.value })}
                className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-pink-400"
                placeholder="e.g. happy girlfriend day darlng"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Her Name / Dedication:
              </label>
              <input
                type="text"
                value={formData.herName}
                onChange={(e) => setFormData({ ...formData, herName: e.target.value })}
                className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-pink-400 font-medium"
                placeholder="e.g. for yanna"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Your Name / Sign-off:
              </label>
              <input
                type="text"
                value={formData.yourName}
                onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-pink-400 font-medium"
                placeholder="e.g. Your Boyfriend ♡"
              />
            </div>
          </div>

          {/* Page 2 Guide Usagi */}
          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 space-y-3">
            <h3 className="font-cute font-bold text-amber-800 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Page 2 — Guide Usagi
            </h3>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Journey Header Message:</label>
              <input
                type="text"
                value={formData.sceneText}
                onChange={(e) => setFormData({ ...formData, sceneText: e.target.value })}
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-amber-400"
                placeholder="e.g. Tap along the path to guide Usagi ♡"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Opened Vault Message:</label>
              <input
                type="text"
                value={formData.journeyVaultMessage || ''}
                onChange={(e) => setFormData({ ...formData, journeyVaultMessage: e.target.value })}
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-amber-400"
                placeholder="e.g. I saved some little moments of us here ♡"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Button Text to Memories:</label>
              <input
                type="text"
                value={formData.journeyButtonText || formData.sceneButtonText}
                onChange={(e) => setFormData({ ...formData, journeyButtonText: e.target.value, sceneButtonText: e.target.value })}
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-amber-400"
                placeholder="e.g. See Our Memories →"
              />
            </div>
          </div>

          {/* Page 3 Memories */}
          <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 space-y-4">
            <h3 className="font-cute font-bold text-pink-700 text-xs flex items-center gap-1.5">
              <span>📸</span>
              Page 3 — 3 Memory Cards
            </h3>

            {formData.memories.map((mem, idx) => (
              <div key={mem.id} className="bg-white p-3 rounded-xl border border-pink-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-cute text-pink-500">
                  <span>Card {idx + 1}</span>
                  <label className="text-[10px] text-pink-600 hover:underline cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleMemoryImageChange(idx, e.target.files?.[0])}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={mem.message}
                  onChange={(e) => {
                    const next = [...formData.memories];
                    next[idx] = { ...next[idx], message: e.target.value };
                    setFormData({ ...formData, memories: next });
                  }}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-lg px-2.5 py-1.5 text-xs"
                  placeholder="Card message..."
                />
              </div>
            ))}
          </div>

          {/* Page 4 Love Letter */}
          <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-100 space-y-3">
            <h3 className="font-cute font-bold text-rose-800 text-xs flex items-center gap-1.5">
              <span>💌</span>
              Page 4 — Final Love Letter
            </h3>
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Favorite Photo (images/favorite.jpg):
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.favoritePhoto}
                  onChange={(e) => setFormData({ ...formData, favoritePhoto: e.target.value })}
                  className="flex-1 bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs font-mono"
                />
                <label className="bg-rose-100 text-rose-800 hover:bg-rose-200 px-3 py-1.5 rounded-xl text-xs font-cute flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3 h-3" /> Pick
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFileChange('favoritePhoto', e.target.files?.[0])}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Letter Text:</label>
              <textarea
                rows={6}
                value={formData.loveLetter}
                onChange={(e) => setFormData({ ...formData, loveLetter: e.target.value })}
                className="w-full bg-white border border-rose-200 rounded-xl px-3 py-2 text-xs leading-relaxed focus:outline-rose-400 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-pink-500 to-rose-400 text-white font-cute font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {savedNotice ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved!
              </>
            ) : (
              <>Save Changes ♡</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
