'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authService.verifyToken();
      if (!isValid) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Verificando autenticación...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Experiencia Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Experiencia</h2>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Gestiona tu experiencia profesional</p>
            <a
              href="/admin/experience"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Administrar
            </a>
          </div>

          {/* Proyectos Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Proyectos</h2>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Administra tus proyectos</p>
            <a
              href="/admin/projects"
              className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Administrar
            </a>
          </div>

          {/* Skills Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Habilidades</h2>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Actualiza tus habilidades técnicas</p>
            <a
              href="/admin/skills"
              className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Administrar
            </a>
          </div>

          {/* Educación Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Educación</h2>
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Gestiona tu formación académica</p>
            <a
              href="/admin/education"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Administrar
            </a>
          </div>

          {/* Perfil Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Perfil</h2>
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Actualiza tu información personal</p>
            <a
              href="/admin/profile"
              className="inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Administrar
            </a>
          </div>

          {/* Ver Sitio Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Vista Pública</h2>
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">Ver tu portfolio como lo ven los visitantes</p>
            <a
              href="/"
              target="_blank"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Ver Sitio
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
