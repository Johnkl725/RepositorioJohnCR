'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { apiClient } from '@/services/api';

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export default function EducationAdmin() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ''
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
    loadEducation();
  };

  const loadEducation = async () => {
    try {
      const response = await apiClient.get('/education');
      setEducation(response.data.data);
    } catch (error) {
      console.error('Error loading education:', error);
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

    const data = {
      ...formData,
      achievements: formData.achievements.split('\n').filter(a => a.trim()),
      endDate: formData.current ? undefined : formData.endDate
    };

    try {
      if (editingId) {
        await apiClient.put(`/education/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post('/education', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      resetForm();
      loadEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error al guardar');
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu._id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate.split('T')[0],
      endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
      current: edu.current,
      description: edu.description,
      achievements: edu.achievements.join('\n')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este registro de educación?')) return;
    
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      await apiClient.delete(`/education/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadEducation();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ''
    });
    setEditingId(null);
    setShowForm(false);
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
          <h1 className="text-2xl font-bold">Gestión de Educación</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancelar' : 'Nueva Educación'}
            </button>
            <a href="/admin" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md inline-block">
              Volver
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar' : 'Nueva'} Educación</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institución"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Título/Grado"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Campo de estudio"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-gray-700 rounded px-4 py-2 flex-1"
                    required
                  />
                  {!formData.current && (
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="bg-gray-700 rounded px-4 py-2 flex-1"
                    />
                  )}
                </div>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                />
                <span>Actualmente cursando</span>
              </label>

              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-24"
                required
              />

              <textarea
                placeholder="Logros (uno por línea)"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-32"
              />

              <div className="flex space-x-4">
                <button type="submit" className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu._id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.institution} • {edu.field}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} - 
                    {edu.current ? ' Actualidad' : ` ${new Date(edu.endDate!).toLocaleDateString()}`}
                  </p>
                  <p className="mt-2">{edu.description}</p>
                  {edu.achievements.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-300">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
