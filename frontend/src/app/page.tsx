'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import { Profile, Experience as ExperienceType, Project, Skill, Education as EducationType } from '@/types';
import { profileService } from '@/services/profileService';
import { experienceService } from '@/services/experienceService';
import { projectService } from '@/services/projectService';
import { skillService } from '@/services/skillService';
import { educationService } from '@/services/educationService';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [profileData, experiencesData, projectsData, skillsData, educationData] = await Promise.all([
          profileService.getProfile(),
          experienceService.getAllExperiences(),
          projectService.getAllProjects(),
          skillService.getAllSkills(),
          educationService.getAllEducation(),
        ]);

        setProfile(profileData);
        setExperiences(experiencesData);
        setProjects(projectsData);
        setSkills(skillsData);
        setEducation(educationData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300">Cargando portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      {profile && <Hero profile={profile} />}
      {experiences.length > 0 && <Experience experiences={experiences} />}
      {projects.length > 0 && <Projects projects={projects} />}
      {skills.length > 0 && <Skills skills={skills} />}
      {education.length > 0 && <Education education={education} />}
      {profile && <Contact profile={profile} />}
    </main>
  );
}
