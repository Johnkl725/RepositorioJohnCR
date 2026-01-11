'use client';

import { Education as EducationType } from '@/types';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Educación
        </h2>

        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu._id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    <FaGraduationCap />
                    <span>{edu.institution}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.field}</p>
                </div>

                <div className="mt-4 md:mt-0 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" />
                    <span>
                      {formatDate(edu.startDate)} - {edu.current ? 'Actualidad' : formatDate(edu.endDate!)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <div className="flex items-center gap-2">
                      <FaTrophy className="text-yellow-500" />
                      <span className="font-semibold">{edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements */}
              {edu.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Logros:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="ml-4">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
