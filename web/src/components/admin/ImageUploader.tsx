'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { api } from '@/lib/api'
interface Props { value?: string; onChange: (url: string) => void; folder?: string; label?: string }
export default function ImageUploader({ value, onChange, folder = 'flora', label = 'Imagem' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value || '')
  const inputRef = useRef<HTMLInputElement>(null)
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    try {
      const formData = new FormData(); formData.append('file', file); formData.append('folder', folder)
      const { data } = await api.post('/upload', formData)
      setPreview(data.url); onChange(data.url)
    } catch (err) { console.error(err) }
    finally { setUploading(false) }
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-body font-medium text-flora-forest">{label}</p>
      <div onClick={() => inputRef.current?.click()} className="relative w-full aspect-video border-2 border-dashed border-flora-moss/30 rounded overflow-hidden cursor-pointer hover:border-flora-moss/60 transition-colors bg-flora-offwhite flex items-center justify-center">
        {preview ? <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px"/> : <div className="text-center"><p className="text-2xl mb-2 opacity-30">☁</p><p className="text-xs font-body text-flora-moss/50">Clique para enviar</p></div>}
        {uploading && <div className="absolute inset-0 bg-flora-deep/60 flex items-center justify-center"><p className="text-xs font-body text-flora-cream animate-pulse">Enviando...</p></div>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden"/>
      <input type="text" value={preview} onChange={e => { setPreview(e.target.value); onChange(e.target.value) }} placeholder="Ou cole uma URL de imagem" className="text-xs font-body px-3 py-2 border border-flora-moss/20 rounded text-flora-moss focus:outline-none focus:border-flora-forest"/>
    </div>
  )
}
