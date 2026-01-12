'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { apiClient } from '@/services/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    featured: false,
    startDate: '',
    endDate: ''
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
    loadProjects();
  };

  const loadProjects = async () => {
    try {
      const response = await apiClient.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error loading projects:', error);
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
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingId) {
        await apiClient.put(`/projects/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post('/projects', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      resetForm();
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error al guardar');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured,
      startDate: project.startDate.split('T')[0],
      endDate: project.endDate ? project.endDate.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      await apiClient.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      featured: false,
      startDate: '',
      endDate: ''
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
          <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancelar' : 'Nuevo Proyecto'}
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar' : 'Nuevo'} Proyecto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Título del proyecto"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full"
                required
              />
              
              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="URL del proyecto (opcional)"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                />
                <input
                  type="url"
                  placeholder="URL de GitHub (opcional)"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                />
              </div>

              <input
                type="url"
                placeholder="URL de imagen (opcional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="bg-gray-700 rounded px-4 py-2 w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                />
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span>Proyecto destacado</span>
              </label>

              <div className="flex space-x-4">
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              {project.featured && (
                <span className="bg-yellow-600 text-xs px-2 py-1 rounded">Destacado</span>
              )}
              <p className="text-gray-400 mt-2">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-green-600 px-2 py-1 rounded text-sm">{tech}</span>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
