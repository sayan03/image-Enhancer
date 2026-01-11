import Loading from "./Loading";

function ImagePreview(props) {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full animate-fade-in bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-blue-500/5 transition-colors duration-300" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-bold text-center bg-slate-100/50 dark:bg-white/5 text-slate-700 dark:text-slate-200 py-3 border-b border-slate-200 dark:border-white/10 tracking-wide">
          Original Image
        </h2>
        <div className="flex-grow flex items-center justify-center bg-slate-50 dark:bg-black/20 relative min-h-[320px]">
          {props.uploaded ? (
            <img
              src={props.uploaded}
              alt="Uploaded Image"
              className="w-full h-80 object-contain p-2"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-slate-400 dark:text-slate-500">
              No Image Selected
            </div>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full animate-fade-in bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-blue-500/5 transition-colors duration-300" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-bold text-center bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-600/20 dark:to-purple-600/20 text-slate-800 dark:text-white py-3 border-b border-slate-200 dark:border-white/10 tracking-wide backdrop-blur-md">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Enhanced Result
          </span>
        </h2>
        <div className="flex-grow flex items-center justify-center bg-slate-50 dark:bg-black/20 relative min-h-[320px]">
          {props.enhanced && !props.loading ? (
            <img
              src={props.enhanced}
              alt="Enhanced Image"
              className="w-full h-80 object-contain p-2"
            />
          ) : props.loading ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <Loading />
              <span className="text-blue-500 dark:text-blue-400 text-sm font-medium animate-pulse">Enhancing details...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full text-slate-400 dark:text-slate-500">
              Enhancement not started
            </div>
          )}
        </div>

        {props.enhanced && !props.loading && (
          <div className="p-4 flex justify-center bg-slate-50/50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10">
            <a
              href={props.enhanced}
              download="enhanced-image.jpg"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Enhanced Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
export default ImagePreview;
