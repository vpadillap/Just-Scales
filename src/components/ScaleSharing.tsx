import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import type { Scale } from '../types'
import { motion } from 'framer-motion'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import jsQR from 'jsqr'

// --- EXPORT COMPONENT ---

interface ScaleExportProps {
    scale: Scale
    onClose: () => void
}

export const ScaleExport: React.FC<ScaleExportProps> = ({ scale, onClose }) => {
    const scaleJson = JSON.stringify(scale)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(scaleJson)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center space-y-6"
            >
                <div>
                    <h3 className="text-xl font-black text-slate-900 text-center uppercase tracking-tight">SHARE SCALE</h3>
                    <p className="text-slate-400 text-xs font-bold text-center uppercase tracking-widest mt-1">{scale.name}</p>
                </div>

                <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm">
                    <QRCodeCanvas value={scaleJson} size={200} level={"L"} />
                </div>

                <div className="w-full space-y-3">
                    <button
                        onClick={handleCopy}
                        className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2 group"
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                <span>Copy Text String</span>
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                        Scan with JustScales or copy text
                    </p>
                </div>

                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors">Close</button>
            </motion.div>
        </div>
    )
}


// --- IMPORT COMPONENT ---

interface ScaleImportProps {
    onImport: (scale: Scale) => void
    onClose: () => void
}

export const ScaleImport: React.FC<ScaleImportProps> = ({ onImport, onClose }) => {
    const [jsonText, setJsonText] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [scanning, setScanning] = useState(false)

    const validateAndImport = (text: string) => {
        try {
            const data = JSON.parse(text)
            // Basic validation
            if (!data.name || !data.notes || !Array.isArray(data.notes)) {
                throw new Error("Invalid scale format")
            }
            const newScale: Scale = {
                ...data,
                id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
                isCustom: true,
                category: 'Imported'
            }
            onImport(newScale)
            onClose()
        } catch (e) {
            setError("Invalid Scale Data")
        }
    }

    const handleScan = async () => {
        try {
            setScanning(true)
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            })

            // Decode
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const context = canvas.getContext('2d')
                if (context) {
                    context.drawImage(img, 0, 0)
                    const imageData = context.getImageData(0, 0, img.width, img.height)
                    const code = jsQR(imageData.data, imageData.width, imageData.height)
                    if (code) {
                        validateAndImport(code.data)
                    } else {
                        setError("No QR code found")
                    }
                }
                setScanning(false)
            }
            img.onerror = () => {
                setError("Failed to load image")
                setScanning(false)
            }
            if (image.webPath) {
                img.src = image.webPath
            } else {
                setError("Camera failed")
                setScanning(false)
            }

        } catch (e) {
            console.error(e)
            setError(String(e))
            setScanning(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Import Scale</h2>
                    <button onClick={onClose} className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={handleScan}
                        disabled={scanning}
                        className="w-full py-4 bg-neon-pink-500 hover:bg-neon-pink-600 text-white rounded-xl font-black transition-all shadow-lg shadow-neon-pink-500/20 active:translate-y-1 flex items-center justify-center gap-3 active:scale-95"
                    >
                        {scanning ? (
                            <span className="animate-pulse">Scanning...</span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>SCAN QR CODE</span>
                            </>
                        )}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="px-3 bg-white text-slate-400">or paste text</span>
                        </div>
                    </div>

                    <textarea
                        value={jsonText}
                        onChange={(e) => {
                            setJsonText(e.target.value)
                            setError(null)
                        }}
                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-xs font-mono focus:ring-2 focus:ring-neon-pink-500 outline-none resize-none placeholder:text-slate-400"
                        placeholder='Paste scale JSON here...'
                    />

                    {error && (
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                            <p className="text-red-500 text-xs font-bold text-center uppercase tracking-wide">{error}</p>
                        </div>
                    )}

                    <button
                        onClick={() => validateAndImport(jsonText)}
                        disabled={!jsonText.trim()}
                        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                    >
                        Import Text
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
