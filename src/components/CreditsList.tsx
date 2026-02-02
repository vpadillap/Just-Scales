
import React from 'react';
import licenseData from '../assets/licenses.json';

interface LicenseItem {
    name: string;
    version: string;
    license: string | string[];
    author: string;
    repository: string;
    licenseText: string;
}

const licenses = licenseData as LicenseItem[];

interface CreditsListProps {
    className?: string;
}

export const CreditsList: React.FC<CreditsListProps> = ({ className }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {licenses.map((pkg, index) => (
                <div key={`${pkg.name}-${pkg.version}-${index}`} className="p-3 bg-white/50 border border-surface-mid rounded-lg hover:border-surface-mid/80 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-text-primary text-sm">{pkg.name}</h3>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
                                v{pkg.version}
                            </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {Array.isArray(pkg.license) ? pkg.license.join(', ') : pkg.license}
                        </span>
                    </div>

                    <div className="text-xs flex flex-wrap gap-x-4 gap-y-1 text-text-secondary">
                        {pkg.author && pkg.author !== 'Unknown' && (
                            <span className="flex items-center gap-1">
                                <span className="text-slate-400">by</span>
                                <span className="font-medium text-slate-700">{pkg.author}</span>
                            </span>
                        )}

                        {pkg.repository && (
                            <a
                                href={pkg.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neon-pink-500 hover:text-neon-pink-600 hover:underline flex items-center gap-0.5"
                            >
                                Source
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {licenses.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                    <p className="text-sm italic">No open source attribution data available.</p>
                </div>
            )}
        </div>
    );
};
