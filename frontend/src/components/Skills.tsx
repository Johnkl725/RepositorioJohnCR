'use client';

import { Skill } from '@/types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getProficiencyStars = (proficiency: string) => {
    const levels: Record<string, number> = {
      'Básico': 1,
      'Intermedio': 2,
      'Avanzado': 3,
      'Experto': 4,
    };
    return levels[proficiency] || 2;
  };

  const renderStars = (level: number) => {
    const stars = [];
    const fullStars = Math.floor(level);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    
    for (let i = fullStars; i < 4; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
    }
    
    return stars;
  };

  const getProficiencyColor = (proficiency: string) => {
    const colors: Record<string, string> = {
      'Básico': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'Intermedio': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'Avanzado': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
      'Experto': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    };
    return colors[proficiency] || colors['Intermedio'];
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Habilidades Técnicas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div
              key={category}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500">
                {category}
              </h3>

              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill._id} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(getProficiencyStars(skill.proficiency))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
