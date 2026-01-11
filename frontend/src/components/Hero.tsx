'use client';

import { Profile } from '@/types';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Profile Image Placeholder */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
              {profile.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            {profile.fullName}
          </h1>
          <p className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-6 animate-slide-up">
            {profile.title}
          </p>

          {/* Location and Contact */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <a href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-500" />
              <span>{profile.phone}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {profile.summary}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
              >
                <FaLinkedin size={20} />
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex items-center gap-2 shadow-lg"
              >
                <FaGithub size={20} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
