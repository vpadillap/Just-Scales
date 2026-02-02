
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditsList } from './CreditsList';
// @ts-ignore
import packageJson from '../../package.json';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    const [showCredits, setShowCredits] = useState(false);

    // Reset view when modal closes
    React.useEffect(() => {
        if (!isOpen) setShowCredits(false);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-surface-base rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col pointer-events-auto overflow-hidden border border-surface-mid">

                            {/* Header */}
                            <div className="p-5 border-b border-surface-mid flex justify-between items-center bg-surface-highlight sticky top-0 z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary">
                                        {showCredits ? 'Credits' : 'About'}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-surface-base relative">
                                {showCredits ? (
                                    <div className="animate-fade-in pb-4">
                                        <button
                                            onClick={() => setShowCredits(false)}
                                            className="mb-4 text-xs font-bold text-neon-pink-500 hover:text-neon-pink-600 hover:underline flex items-center gap-1 uppercase tracking-wide"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            Back to About
                                        </button>
                                        <CreditsList />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center space-y-6 py-6">
                                        {/* Logo / Icon */}
                                        <div className="w-24 h-24 bg-gradient-to-tr from-neon-pink-500 to-indigo-bloom-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                            <span className="text-white text-5xl font-black tracking-tighter">JS</span>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black text-text-primary tracking-tight">Just Scales</h3>
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon-pink-50 text-neon-pink-600 border border-neon-pink-200">
                                                v{packageJson.version}
                                            </div>
                                        </div>

                                        <div className="max-w-xs text-text-secondary text-sm leading-relaxed">
                                            <p>{packageJson.description || "A clean, efficient tool for vocal practice."}</p>
                                        </div>

                                        <div className="pt-6 border-t border-surface-mid w-full">
                                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Developed By</p>
                                            <a href="https://github.com/Start-sys" target="_blank" rel="noopener noreferrer" className="font-semibold text-text-primary hover:text-neon-pink-500 transition-colors">
                                                Victor Padilla Prado
                                                <span className="block text-xs font-normal text-slate-400 mt-0.5">(Acuario)</span>
                                            </a>
                                        </div>

                                        <div className="pt-2 w-full">
                                            <button
                                                onClick={() => setShowCredits(true)}
                                                className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-surface-mid rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group"
                                            >
                                                <span>Open Source Licenses</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-neon-pink-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {!showCredits && (
                                <div className="p-3 bg-slate-50 border-t border-surface-mid text-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                    © 2026 Victor Padilla Prado. All rights reserved.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
