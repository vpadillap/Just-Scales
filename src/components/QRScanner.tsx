import React, { useEffect, useRef } from 'react'
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning'
import { Capacitor } from '@capacitor/core'


interface QRScannerProps {
    onScan: (content: string) => void
    onError: (error: string) => void
    onClose: () => void
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, onClose }) => {
    // We use a ref to track if we've already started the scan to prevent double-init in strict mode
    const didStartRef = useRef(false)

    useEffect(() => {
        if (didStartRef.current) return
        didStartRef.current = true

        const startScanning = async () => {
            // 1. Check/Request Permissions
            try {
                // Check permissions first
                const status = await BarcodeScanner.checkPermissions()

                if (status.camera !== 'granted') {
                    const request = await BarcodeScanner.requestPermissions()
                    if (request.camera !== 'granted') {
                        onError("Camera permission denied")
                        return
                    }
                }

                // 2. Add Listener
                await BarcodeScanner.addListener('barcodesScanned', async (result) => {
                    if (result.barcodes.length > 0) {
                        const content = result.barcodes[0].rawValue;
                        if (content) {
                            // Stop scan immediately on success
                            await BarcodeScanner.removeAllListeners();
                            await BarcodeScanner.stopScan();
                            onScan(content)
                        }
                    }
                });

                // 3. Start Scan
                // On native, this opens the camera view BEHIND the webview usually, so we must make html transparent
                // or the plugin handles it. @capacitor-mlkit usually handles it well, but often requires
                // making the body transparent on Android.
                // However, let's start with standard implementation.

                await BarcodeScanner.startScan({
                    formats: [BarcodeFormat.QrCode],
                    lensFacing: LensFacing.Back
                });


            } catch (e) {
                console.error("Scanner error:", e);
                onError(String(e));
            }
        };

        // Platform Check
        const isNative = Capacitor.isNativePlatform()

        if (isNative) {
            // Make WebView transparent on Native to see Camera behind
            document.body.style.backgroundColor = 'transparent'
            document.documentElement.style.backgroundColor = 'transparent'
            document.body.classList.add('scanning-active')
            // If there's a root div (e.g. #root) that has a background, we might need to set it too.
            // Assuming typical setup where body has the background color or root app does.
        }

        startScanning()

        return () => {
            // Cleanup on unmount
            didStartRef.current = false
            BarcodeScanner.removeAllListeners().catch(console.error)
            BarcodeScanner.stopScan().catch(console.error)

            // Restore Background
            if (isNative) {
                document.body.style.backgroundColor = ''
                document.documentElement.style.backgroundColor = ''
                document.body.classList.remove('scanning-active')
            }
        }
    }, [onScan, onError])

    const isNative = Capacitor.isNativePlatform()

    // UI Layer
    // On native, the camera is technically "behind" the WebView.
    // We render a transparent overlay or standard UI.
    // For Web/Electron, the plugin injects video into the body or specific element?
    // Capawesome docs say for web it requests getUserMedia.
    // We interpret the implementation: usually rendering 'nothing' (transparent) or a 'Stop' button is what we do here.
    return (
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center ${isNative ? 'bg-transparent' : 'bg-black/50'}`}>
            {/* This overlay sits on top. 
                 On Native: The camera is BEHIND. We need to make sure this div is TRANSPARENT where the camera should be seen?
                 Actually, @capacitor-mlkit on Web usually renders a video element. 
                 Let's stick to a simple UI with a Close/Stop button. 
                 For native, we might need to hide the webview background. 
                 But let's assume standard implementation first. */}

            {/* If we are on web, video might be mounted. */}

            <button
                onClick={() => {
                    BarcodeScanner.stopScan().catch(console.error)
                    onClose()
                }}
                className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="pointer-events-none mt-auto mb-12 text-center space-y-2">
                <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative mx-auto overflow-hidden">
                    <div className="absolute inset-0 border-2 border-neon-pink-500 animate-pulse rounded-3xl opacity-50"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neon-pink-500 shadow-[0_0_15px_rgba(236,72,153,1)] animate-scan-line"></div>
                </div>
                <p className="text-white font-bold uppercase tracking-widest text-shadow-sm">Scanning QR Code...</p>
            </div>
            {/* Native Transparency Hack: On Android/iOS, if video is behind, background must be transparent.
                Tailwind 'bg-black/50' might block it if the camera is behind.
                Usually we set 'document.body.style.background = "transparent"' etc. 
                But let's try just rendering and see. 
            */}
        </div>
    )
}
