import { useLocation, useNavigate } from 'react-router-dom'

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { result, preview } = state || {}

  if (!result) return <div className="text-center p-8">無分析結果</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-light text-pink-400 tracking-widest text-center mb-8">分析結果</h1>

        {preview && <img src={preview} alt="分析照片" className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-md" />}

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-4">
          <p className="text-xs text-gray-400 tracking-widest mb-1">色季類型</p>
          <p className="text-2xl font-medium text-pink-500">{result.season}季型</p>
          <p className="text-sm text-gray-400 mt-1">{result.undertone}</p>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{result.description}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-4">
          <p className="text-xs text-gray-400 tracking-widest mb-3">推薦色盤</p>
          <div className="flex gap-2 flex-wrap">
            {result.colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                <p className="text-xs text-gray-400">{color}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <p className="text-xs text-gray-400 tracking-widest mb-3">妝容建議</p>
          <div className="flex flex-col gap-2">
            {Object.entries(result.makeup).map(([key, value]) => (
              <div key={key}>
                <span className="text-xs text-pink-300 uppercase">{key}　</span>
                <span className="text-sm text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 rounded-2xl border border-pink-300 text-pink-400 text-sm tracking-widest hover:bg-pink-50 transition"
        >
          重新分析
        </button>
      </div>
    </div>
  )
}
