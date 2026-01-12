'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { apiClient } from '@/services/api';

interface Experience {
  _id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: ''
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
    loadExperiences();
  };

  const loadExperiences = async () => {
    try {
      const response = await apiClient.get('/experience');
      setExperiences(response.data.data);
    } catch (error) {
      console.error('Error loading experiences:', error);
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
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
      endDate: formData.current ? undefined : formData.endDate
    };

    try {
      if (editingId) {
        await apiClient.put(`/experience/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post('/experience', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      resetForm();
      loadExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error al guardar. Verifica tus permisos.');
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp._id);
    setFormData({
      position: exp.position,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities.join('\n'),
      technologies: exp.technologies.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return;
    
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      await apiClient.delete(`/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Error al eliminar');
    }
  };

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: '',
      technologies: ''
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
          <h1 className="text-2xl font-bold">Gestión de Experiencia</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancelar' : 'Nueva Experiencia'}
            </button>
            <a
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md inline-block"
            >
              Volver
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Editar' : 'Nueva'} Experiencia
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Título del puesto"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  className="rounded"
                />
                <span>Trabajo actual</span>
              </label>

              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-24"
                required
              />

              <textarea
                placeholder="Responsabilidades (una por línea)"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full h-32"
                required
              />

              <input
                type="text"
                placeholder="Tecnologías (separadas por coma)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full"
                required
              />

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
                >
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <p className="text-gray-400">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} - 
                    {exp.current ? ' Actualidad' : ` ${new Date(exp.endDate!).toLocaleDateString()}`}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="bg-blue-600 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
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
