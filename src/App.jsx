
import React, { useState, useEffect } from "react";
import Home from "./components/Home";

function App() {
  // Theme state: check localStorage or system pref, default to dark
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'dark'; // Defaulting to dark for this app as it's the primary aesthetic
  });

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-50 overflow-x-hidden relative transition-colors duration-300">

      {/* Animated Background Mesh - Dynamic based on theme */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 transition-opacity duration-300">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300 dark:bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-300 dark:bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
      </div>



      <div className="relative z-10 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4 tracking-tight">
            Image Enhancer
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your photos with intelligent sharpening and enhancement filters using client-side processing.
          </p>
        </header>

        <main className="w-full max-w-6xl animate-fade-in flex flex-col items-center">
          <Home />
        </main>

        <footer className="mt-16 text-center text-slate-500 text-sm animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            Powered By <a href="https://www.linkedin.com/in/sayan-saha-03s/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-400">
              SAYAN SAHA
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
