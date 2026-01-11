'use client';

import { Profile } from '@/types';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">
          ¿Hablamos?
        </h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
            <FaEnvelope className="text-4xl mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email</h3>
            <a
              href={`mailto:${profile.email}`}
              className="text-blue-200 hover:text-white transition break-all"
            >
              {profile.email}
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
            <FaPhone className="text-4xl mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Teléfono</h3>
            <a
              href={`tel:${profile.phone}`}
              className="text-blue-200 hover:text-white transition"
            >
              {profile.phone}
            </a>
          </div>

          {/* Location */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
            <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Ubicación</h3>
            <p className="text-blue-200">{profile.location}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaGithub size={24} />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-blue-200">
            © {new Date().getFullYear()} {profile.fullName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}
