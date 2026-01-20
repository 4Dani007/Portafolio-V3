'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 
          className="text-3xl font-bold mb-4 transition-colors"
          style={{ color: 'rgb(0, 0, 0)' }}
        >
          Oops! Algo salió mal
        </h1>
        <p 
          className="text-lg mb-6 transition-colors"
          style={{ color: 'rgb(63, 63, 70)' }}
        >
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-lg transition-colors hover:scale-105"
          style={{
            backgroundColor: 'rgb(37, 99, 235)',
            color: 'rgb(255, 255, 255)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(29, 78, 216)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
          }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
