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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-light text-pink-400 tracking-widest mb-2">個人色彩分析</h1>
      <p className="text-gray-400 text-sm mb-10">上傳照片或直接拍照，AI為你判斷專屬色季</p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full max-w-md">
          {/* 模式切換 */}
          <div className="flex rounded-2xl border border-pink-200 overflow-hidden mb-6">
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 py-2 text-sm tracking-widest transition ${mode === 'upload' ? 'bg-pink-400 text-white' : 'text-pink-300 hover:bg-pink-50'}`}
            >
              上傳照片
            </button>
            <button
              onClick={() => setMode('camera')}
              className={`flex-1 py-2 text-sm tracking-widest transition ${mode === 'camera' ? 'bg-pink-400 text-white' : 'text-pink-300 hover:bg-pink-50'}`}
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
            <img src={preview} alt="預覽" className="mt-6 rounded-2xl w-full object-cover max-h-64" />
          )}
          {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
        </div>
      )}
    </div>
  )
}