
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col pointer-events-auto overflow-hidden">

                            {/* Header */}
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                        {showCredits ? 'Credits' : 'About Just Scales'}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {showCredits ? (
                                    <div className="animate-fade-in">
                                        <button
                                            onClick={() => setShowCredits(false)}
                                            className="mb-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                                        >
                                            ← Back to About
                                        </button>
                                        <CreditsList />
                                    </div>
                                ) : (
                                    <div className="space-y-6 text-center">
                                        <div className="flex justify-center">
                                            <div className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-2xl shadow-lg flex items-center justify-center text-white text-4xl font-bold">
                                                JS
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Just Scales</h3>
                                            <p className="text-slate-500 dark:text-slate-400">v{packageJson.version}</p>
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300">
                                            A simple, effective vocal practicing tool for singers.
                                        </p>

                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <p className="text-sm text-slate-500 mb-2">Developed by</p>
                                            <p className="font-medium text-slate-900 dark:text-white">Victor Padilla Prado (Acuario)</p>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                onClick={() => setShowCredits(true)}
                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 w-full"
                                            >
                                                Open Source Licenses & Credits
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                                © 2026 Victor Padilla Prado. All rights reserved.
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
