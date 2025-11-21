export default function Loading() {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-[#27272728]">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-gray-600/60 blur-3xl animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gray-800/80" />
        </div>

        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-cyan-500/30 rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80" />
        </div>

        <div className="absolute inset-0 animate-spin-medium [animation-direction:reverse]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-purple-500/30 rounded-full -rotate-45" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/80" />
        </div>
        <div className="absolute inset-30 animate-spin-fast [animation-direction:reverse]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-purple-500/30 rounded-full -rotate-45" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-purple-400/80" />
        </div>
        <div className="absolute inset-0 animate-spin-fast">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-emerald-500/25 rounded-full rotate-12" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/80" />
        </div>

        <div className="absolute -inset-20">
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
