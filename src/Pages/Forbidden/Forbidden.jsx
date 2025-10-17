import React from 'react';
import { Link } from 'react-router';
import { MdBlock, MdOutlineHome } from 'react-icons/md';



export default function ForbiddenPage({ title = '403 — Forbidden', message = "You don't have permission to access this page." }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <main className="max-w-4xl w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left: visual */}
                    <section className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-8 lg:p-12 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto w-40 h-40 rounded-full bg-white/80 dark:bg-white/6 backdrop-blur flex items-center justify-center shadow-lg">
                                <MdBlock className="w-20 h-20 text-red-600 dark:text-red-300" aria-hidden="true" />
                            </div>

                            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-red-700 dark:text-red-200 tracking-tight">{title}</h1>
                            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">{message}</p>

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-medium shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                                >
                                    <MdOutlineHome className="w-5 h-5" />
                                    Go Home
                                </Link>

                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-transparent bg-white text-red-600 font-medium shadow-sm hover:bg-gray-50 dark:bg-transparent dark:text-red-300 dark:hover:bg-gray-900 transition"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>

                        {/* decorative blobs */}
                        <svg className="absolute -right-10 -bottom-10 opacity-20 w-56 h-56" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <defs>
                                <linearGradient id="g1" x1="0%" x2="100%">
                                    <stop offset="0%" stopColor="#ff7a7a" />
                                    <stop offset="100%" stopColor="#ffb199" />
                                </linearGradient>
                            </defs>
                            <path fill="url(#g1)" d="M36.8,-55.8C47.3,-48.8,57.1,-40.3,62.6,-28.7C68,-17.1,69.2,-2.3,66.8,11.3C64.4,24.9,58.4,37,49.1,45.6C39.9,54.3,27.4,59.5,13.8,63.9C0.2,68.4,-14.3,72.1,-25.9,68.2C-37.6,64.4,-46.5,52.9,-56.5,40.2C-66.6,27.5,-77.8,13.7,-78.7,-0.4C-79.6,-14.4,-70.1,-28.9,-58.3,-36.5C-46.5,-44.1,-32.3,-44.8,-18.6,-49.8C-4.9,-54.9,8.4,-64.4,21.9,-66.8C35.4,-69.3,49.4,-63.6,36.8,-55.8Z" transform="translate(100 100)" />
                        </svg>
                    </section>

                    {/* Right: details */}
                    <section className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">Whoops — looks like you're not allowed here</h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-lg">This resource is restricted. If you believe this is an error, reach out to the administrator or contact support.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Possible reasons</h3>
                                <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                                    <li>You're not signed in or your session expired</li>
                                    <li>Your account lacks required permissions</li>
                                    <li>Resource owner restricted access</li>
                                </ul>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Quick fixes</h3>
                                <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                                    <li>Sign out and sign in again</li>
                                    <li>Contact admin to request access</li>
                                    <li>Try from a different network or device</li>
                                </ul>
                            </div>
                        </div>

                        <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400">Error code: <span className="font-medium">403</span></footer>
                    </section>
                </div>
            </main>
        </div>
    );
}
