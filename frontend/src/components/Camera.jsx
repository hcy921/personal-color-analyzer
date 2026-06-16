import { useRef, useState, useCallback } from 'react'

export default function Camera({ onCapture }) {
  
  const [active, setActive] = useState(false)
  const [stream, setStream] = useState(null)
  
  // 確認 stream 是否存在，如果存在則設置到 srcObject 上
  // 避免 useRef 的非同步問題（元素尚未渲染就嘗試存取）
  const videoRef = useCallback(node => {
    if (node && stream) {
      node.srcObject = stream
    }
  }, [stream])
  const canvasRef = useRef()

  // 開啟相機
  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(s)
      setActive(true)
    } catch (e) {
      alert('無法開啟相機，請確認瀏覽器權限')
    }
  }

  // 關閉相機
  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop())
    setStream(null)
    setActive(false)
  }

  // 拍照
  const capture = () => {
    // 取得 video 元素
    const video = document.querySelector('video')
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg')
    const base64 = dataUrl.split(',')[1]
    stopCamera()
    onCapture(base64, 'image/jpeg', dataUrl)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!active ? (
        <button
          onClick={startCamera}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-pink-300 text-pink-400 hover:bg-pink-50 transition"
        >
          📷 開啟相機拍照
        </button>
      ) : (
        <div className="w-full flex flex-col items-center gap-3">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl" />
          <div className="flex gap-3 w-full">
            <button
              onClick={capture}
              className="flex-1 py-3 rounded-2xl bg-pink-400 text-white text-sm tracking-widest hover:bg-pink-500 transition"
            >
              拍照
            </button>
            <button
              onClick={stopCamera}
              className="flex-1 py-3 rounded-2xl border border-gray-300 text-gray-400 text-sm hover:bg-gray-50 transition"
            >
              取消
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}