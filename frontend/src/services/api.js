const API_URL = 'https://personal-color-analyzer-pdxv.onrender.com'

export async function analyzeImage(imageBase64, mediaType = 'image/jpeg') {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_base64: imageBase64,
      media_type: mediaType,
    }),
  })
  if (!response.ok) throw new Error('分析失敗，請稍後再試')
  return response.json()
}