import { useRef } from 'react'

export default function ImageUpload({ onImageSelect }) {
  const inputRef = useRef()

  // 處理檔案
  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1]
      onImageSelect(base64, file.type, e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // 處理拖曳檔案
  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      onDrop={handleDrop} // 滑鼠放開時呼叫 handleDrop
      onDragOver={(e) => e.preventDefault()} // 拖曳時防止預設行為
      onClick={() => inputRef.current.click()}
      className="border-2 border-dashed border-pink-300 rounded-2xl p-12 text-center cursor-pointer hover:bg-pink-50 transition"
    >
      <p className="text-pink-400 text-lg mb-2">點擊或拖曳照片至此</p>
      <p className="text-gray-400 text-sm">建議使用自然光下的正面照</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}