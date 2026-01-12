'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { apiClient } from '@/services/api';

interface Profile {
  fullName: string;
  title: string;
  bio: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  profileImageUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    profileImageUrl: '',
    githubUrl: '',
    linkedinUrl: ''
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const isValid = await authService.verifyToken();
    if (!isValid) {
      router.push('/admin/login');
      return;
    }
    loadProfile();
  };

  const loadProfile = async () => {
    try {
      const response = await apiClient.get('/profile');
      const data = response.data.data;
      setProfile(data);
      setFormData({
        fullName: data.fullName || '',
        title: data.title || '',
        bio: data.bio || '',
        summary: data.summary || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        profileImageUrl: data.profileImageUrl || '',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      await apiClient.put('/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Perfil actualizado exitosamente');
      loadProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Perfil</h1>
          <a href="/admin" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">
            Volver
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Información Personal</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Título profesional</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Biografía (max 500 caracteres)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-32"
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resumen profesional (max 2000 caracteres) *</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-40"
                maxLength={2000}
                required
                placeholder="Describe tu experiencia, habilidades y objetivos profesionales..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full"
                required
              />
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4">Enlaces y Redes Sociales (Opcional)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foto de perfil (URL)</label>
                  <input
                    type="url"
                    value={formData.profileImageUrl}
                    onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                    className="bg-gray-700 rounded px-4 py-2 w-full"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="bg-gray-700 rounded px-4 py-2 w-full"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="bg-gray-700 rounded px-4 py-2 w-full"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-md font-medium"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
