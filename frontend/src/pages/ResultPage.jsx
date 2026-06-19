import { useLocation, useNavigate } from 'react-router-dom'

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { result, preview } = state || {}

  if (!result) return <div className="text-center p-8">無分析結果</div>

  return (
    <div className="min-h-screen bg-cream-bg p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="tont-serif text-cream-dark font-bold text-2xl tracking-widest3 text-center mb-8">分析結果</h1>

        {preview && <img src={preview} alt="分析照片" className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-md" />}

        <div className="bg-white border border-cream-border rounded-3xl p-6 mb-4">
          <p className="text-cream-text text-xs tracking-widest mb-1">色季類型</p>
          <p className="ont-serif text-cream-dark font-bold text-2xl tracking-wider mt-1">{result.season}季型</p>
          <p className="text-cream-text text-sm mt-1">{result.undertone}</p>
          <p className="text-cream-dark text-sm mt-3 leading-relaxed font-light">{result.description}</p>
        </div>

        <div className="bg-white border border-cream-border rounded-3xl p-6 mb-4">
          <p className="text-cream-text text-xs tracking-widest mb-3">推薦色盤</p>
          <div className="flex gap-2 flex-wrap">
            {result.colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                <p className="text-cream-text" style={{ fontSize: '10px' }}>{color.name}</p>
              </div>
            ))}
          </div>
          <p className="text-cream-text text-xs mt-2 tracking-widest mb-3">應避開色盤</p>
          <div className="flex gap-2 flex-wrap">
            {result.worstColors.map((worstColors, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: worstColors.hex }} />
                <p className="text-cream-text" style={{ fontSize: '10px' }}>{worstColors.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-cream-border rounded-3xl p-6 mb-6">
          <p className="text-cream-text text-xs tracking-widest mb-3">妝容建議</p>
          <div className="flex flex-col gap-2">
            {Object.entries(result.makeup).map(([key, value]) => (
              <div key={key}>
                <span className="text-cream-border text-xs tracking-widest uppercase">{key}　</span>
                <span className="text-cream-dark text-sm font-light">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {/*唇彩推薦 */}
          <div className="bg-white border border-cream-border rounded-3xl p-4">
            <p className="text-cream-text text-xs tracking-widest mb-3">唇彩推薦</p>
            <div className="flex gap-2 mb-3">
              {result.lip.map((lip, i) => (
                  <div key={i} className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: lip.hex }} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {result.lip.map((lip, i) => (
                 <p className="text-cream-dark" style={{ fontSize: '11px' }}>{lip.name}</p>
              ))}
            </div>
          </div>

          {/*腮紅推薦 */}
          <div className="bg-white border border-cream-border rounded-3xl p-4">
            <p className="text-cream-text text-xs tracking-widest mb-3">腮紅推薦</p>
            <div className="flex gap-2 mb-3">
              {result.blush.map((blush, i) => (
                <div key={i} className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: blush.hex }} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {result.blush.map((blush, i) => (
                <p  key={i} className="text-cream-dark" style={{ fontSize: '11px' }}>{blush.name}</p>
              ))}
            </div>
          </div>

          {/*髮色推薦 */}
          <div className="bg-white border border-cream-border rounded-3xl p-4">
            <p className="text-cream-text text-xs tracking-widest mb-3">髮色推薦</p>
            <div className="flex gap-2 mb-3">
              {result.hair.map((hair, i) => (
                <div key={i} className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: hair.hex }} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {result.hair.map((hair, i) => (
                <p key={i} className="text-cream-dark" style={{ fontSize: '11px' }}>{hair.name}</p>

              ))}
            </div>
          </div>
        </div>
        

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 border border-cream-border rounded-2xl text-cream-text text-sm tracking-widest hover:bg-cream-hover transition"
        >
          重新分析
        </button>
      </div>
    </div>
  )
}
