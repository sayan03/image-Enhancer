import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

function Home() {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalFile, setOriginalFile] = useState(null);
  const [settings, setSettings] = useState({
    sharpness: 5,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    resolution: "original",
  });

  const handleEnhance = async (file, currentSettings) => {
    setLoading(true);
    try {
      const enhancedData = await enhancedImageAPI(file, currentSettings);
      if (enhancedData) {
        setEnhancedImage(enhancedData);
      } else {
        setEnhancedImage(null);
      }
    } catch (error) {
      console.error("Error while enhancing the image:", error);
      alert("Error while enhancing the image. Please try again later.");
      setEnhancedImage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (originalFile) {
      // Debounce to prevent too many re-renders
      const timer = setTimeout(() => {
        handleEnhance(originalFile, settings);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [settings, originalFile]);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setOriginalFile(file);
    // Initial enhance (useEffect will trigger, but we set file first)
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="w-full pb-20 px-4">
      <ImageUpload UploadImageHandler={UploadImageHandler} />

      {originalFile && (
        <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
          <div className="glass-panel rounded-2xl p-6 md:p-8 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-blue-500/5 transition-colors duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Enhancement Settings
              </h3>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-500/30">
                Real-time Preview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Sharpness</label>
                  <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{settings.sharpness}/10</span>
                </div>
                <input
                  type="range"
                  name="sharpness"
                  min="0"
                  max="10"
                  step="1"
                  value={settings.sharpness}
                  onChange={handleSettingChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Soft</span>
                  <span>Sharp</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Brightness</label>
                  <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{settings.brightness}%</span>
                </div>
                <input
                  type="range"
                  name="brightness"
                  min="0"
                  max="200"
                  value={settings.brightness}
                  onChange={handleSettingChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Dark</span>
                  <span>Light</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Contrast</label>
                  <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{settings.contrast}%</span>
                </div>
                <input
                  type="range"
                  name="contrast"
                  min="0"
                  max="200"
                  value={settings.contrast}
                  onChange={handleSettingChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Saturation</label>
                  <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{settings.saturation}%</span>
                </div>
                <input
                  type="range"
                  name="saturation"
                  min="0"
                  max="200"
                  value={settings.saturation}
                  onChange={handleSettingChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Gray</span>
                  <span>Vibrant</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Target Resolution</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["original", "2x", "4k", "8k"].map((res) => (
                  <button
                    key={res}
                    onClick={() => setSettings(prev => ({ ...prev, resolution: res }))}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm border ${settings.resolution === res
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white"
                      }`}
                  >
                    {res === "original" ? "Original" : res.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage?.image || ""}
      />
    </div>
  );
}

export default Home;
