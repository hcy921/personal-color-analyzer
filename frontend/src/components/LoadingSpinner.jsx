export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
      <p className="text-pink-400 text-sm tracking-widest">AI 分析中...</p>
    </div>
  )
}