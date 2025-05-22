import Link from 'next/link';
import React from 'react';

export const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Track Your Fixed Deposits Effortlessly
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          A simple and intuitive way to manage all your fixed deposits in one
          place. Never miss a maturity date again.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">
              Easy Tracking
            </h3>
            <p className="text-gray-400">
              Keep all your fixed deposits organized and accessible in one
              dashboard
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">
              Smart Reminders
            </h3>
            <p className="text-gray-400">
              Never miss a maturity date with our intelligent notification
              system
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">
              Secure Storage
            </h3>
            <p className="text-gray-400">
              Your financial data is encrypted and stored securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
