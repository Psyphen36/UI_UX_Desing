export default function BotSkeletonLoader() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-slate-800/30 h-32 rounded-xl shadow-sm" />
      ))}
    </div>
  );
}
