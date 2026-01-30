
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

// Ensure type safety with the JSON import
const licenses = licenseData as LicenseItem[];

interface CreditsListProps {
    className?: string;
}

export const CreditsList: React.FC<CreditsListProps> = ({ className }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {licenses.map((pkg, index) => (
                <div key={`${pkg.name}-${pkg.version}-${index}`} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{pkg.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">v{pkg.version}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                            {Array.isArray(pkg.license) ? pkg.license.join(', ') : pkg.license}
                        </span>
                    </div>

                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        <p>Author: <span className="font-medium">{pkg.author}</span></p>
                        {pkg.repository && (
                            <a
                                href={pkg.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-1 inline-block text-xs"
                            >
                                {pkg.repository.replace(/^git\+/, '').replace(/^https?:\/\//, '')}
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {licenses.length === 0 && (
                <p className="text-center text-slate-500 italic p-4">
                    No license information available.
                </p>
            )}
        </div>
    );
};
