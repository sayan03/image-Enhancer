import React from 'react';

function ImageUpload(props) {
  const ShowImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      props.UploadImageHandler(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="glass-panel rounded-2xl p-1 transition-all hover:scale-[1.01] duration-300 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-blue-500/5">
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center w-full h-40 cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
        >
          <input type="file" id="fileInput" className="hidden" onChange={ShowImageHandler} accept="image/*" />
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white dark:bg-slate-700/50 rounded-full shadow-sm dark:shadow-none group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="text-lg font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
              Drop your image here or <span className="text-blue-500 dark:text-blue-400">browse</span>
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
export default ImageUpload;
