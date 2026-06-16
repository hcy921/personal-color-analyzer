export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-12 h-12 rounded-full border border-cream-hover border-t-cream-text animate-spin" />
      <p className="text-cream-text text-sm tracking-widest">AI 分析中...</p>
    </div>
  )
}