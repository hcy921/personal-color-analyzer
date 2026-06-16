import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../components/ImageUpload'
import Camera from '../components/Camera'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeImage } from '../services/api'

export default function HomePage() {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('upload') //'upload' or 'camera'
  const navigate = useNavigate()

  const handleImageSelect = async (base64, mediaType, previewUrl) => {
    setPreview(previewUrl)
    setError(null)
    setLoading(true)
    try {
      const data = await analyzeImage(base64, mediaType)
      navigate('/result', { state: { result: data.result, preview: previewUrl } })
    } catch (e) {
      setError('分析失敗，請重試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-bg flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <p className="text-cream-text text-sm tracking-widest2 mb-4">PERSONAL COLOR ANALYSIS</p>
        <h1 className="font-sans text-cream-dark font-bold text-4xl tracking-widest3 mb-4">個人色彩診斷</h1>
        <div className="w-12 h-px bg-cream-border mx-auto my-4" />
        <p className="text-cream-text text-sm tracking-wider">上傳照片，探索你的專屬色季</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full max-w-xl">
          {/* 模式切換 */}
          <div className="border border-cream-border flex mb-6">
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 py-3 text-sm tracking-widest transition ${mode === 'upload' ? 'bg-cream-border text-cream-bg' : 'text-cream-text hover:bg-cream-hover'}`}
            >
              上傳照片
            </button>
            <div className="w-px bg-cream-border" />
            <button
              onClick={() => setMode('camera')}
              className={`flex-1 py-3 text-sm tracking-widest transition ${mode === 'camera' ? 'bg-cream-border text-cream-bg' : 'text-cream-text hover:bg-cream-hover'}`}
            >
              相機拍照
            </button>
          </div>

          {mode === 'upload' ? (
            <ImageUpload onImageSelect={handleImageSelect} />
          ) : (
            <Camera onCapture={handleImageSelect} />
          )}

          {preview && (
            <img src={preview} alt="預覽" className="mt-6 w-full max-h-72 object-cover" />
          )}
          {error && <p className="text-xs text-center mt-4 text-cream-text">{error}</p>}
        </div>
      )}
    </div>
  )
}