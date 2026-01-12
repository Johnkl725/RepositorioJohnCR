'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { apiClient } from '@/services/api';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: string;
  yearsOfExperience: number;
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Lenguajes de Programación',
    proficiency: 'Intermedio',
    yearsOfExperience: 1
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
    loadSkills();
  };

  const loadSkills = async () => {
    try {
      const response = await apiClient.get('/skills');
      setSkills(response.data.data);
    } catch (error) {
      console.error('Error loading skills:', error);
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
      if (editingId) {
        await apiClient.put(`/skills/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post('/skills', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      resetForm();
      loadSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Error al guardar');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      yearsOfExperience: skill.yearsOfExperience
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta habilidad?')) return;
    
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      await apiClient.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Lenguajes de Programación',
      proficiency: 'Intermedio',
      yearsOfExperience: 1
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

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Habilidades</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancelar' : 'Nueva Habilidad'}
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar' : 'Nueva'} Habilidad</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre de la habilidad"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2"
                  required
                >
                  <option value="Lenguajes de Programación">Lenguajes de Programación</option>
                  <option value="Bases de Datos">Bases de Datos</option>
                  <option value="Cloud & Big Data">Cloud & Big Data</option>
                  <option value="Herramientas">Herramientas</option>
                  <option value="BI & Visualización">BI & Visualización</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Nivel de dominio</label>
                <select
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                  required
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Experto">Experto</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Años de experiencia</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseFloat(e.target.value) })}
                  className="bg-gray-700 rounded px-4 py-2 w-full"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill._id} className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                    <p className="text-sm text-purple-400 mb-2">Nivel: {skill.proficiency}</p>
                    <p className="text-sm text-gray-400 mb-3">{skill.yearsOfExperience} años de experiencia</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
