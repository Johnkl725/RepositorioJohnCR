'use client';

import { Experience as ExperienceType } from '@/types';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { formatDateLimaShort } from '@/utils/dateUtils';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const formatDate = (date: string) => {
    return formatDateLimaShort(date);
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Experiencia Profesional
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp._id}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {exp.position}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                    <FaBriefcase />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" />
                    <span>
                      {formatDate(exp.startDate)} - {exp.current ? 'Actualidad' : formatDate(exp.endDate!)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>

              {/* Responsibilities */}
              {exp.responsibilities.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Responsabilidades:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="ml-4">{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
