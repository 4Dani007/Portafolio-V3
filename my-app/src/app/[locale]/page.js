'use client';
import Navbar from '../components/Navbar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from '../../hooks/useTheme';
import { Mail, Linkedin, Github } from 'lucide-react';
import FadeInSection from '../components/FadeinSection';
import ScrollSection from '../components/ScrollSection';
import BlurInSection from '../components/BlurInSection';
import FadeInUpSection from '../components/FadeInUpSection';

export default function HomePage() {
  const t = useTranslations();
  const { isDark, mounted } = useTheme();

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <BlurInSection>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda */}
            <div className="flex flex-col justify-center space-y-6 max-w-lg">
              <h1 
                className="text-4xl md:text-5xl font-bold transition-colors"
                style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
              >
                {t('hero.title')}
              </h1>
              <p 
                className="text-xl font-medium transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {t('hero.subtitle')}
              </p>
              <p 
                className="text-lg leading-relaxed transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {t('hero.description')}
              </p>
            </div>

            {/* Columna derecha */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full h-auto">
                {!isDark ? (
                  <Image 
                    src="/images/sketch-draw-white.webp"
                    alt="Sketch drawing"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl w-full h-auto transition-opacity"
                    priority
                  />
                ) : (
                  <Image 
                    src="/images/sketch-draw.png"
                    alt="Sketch drawing"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl w-full h-auto transition-opacity"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      </BlurInSection>

      <FadeInUpSection>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              {t('projectsSection.title')}
            </h2>
            <p 
              className="text-lg transition-colors"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
            >
              {t('projectsSection.subtitle')}
            </p>
          </div>
          
          {/* Placeholder para proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg p-6 border transition-colors"
                style={{
                  backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
                  borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)'
                }}
              >
                <div 
                  className="h-48 rounded-lg mb-4 transition-colors"
                  style={{ backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)' }}
                />
                <h3 
                  className="text-xl font-semibold mb-2 transition-colors"
                  style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
                >
                  Project {item}
                </h3>
                <p 
                  className="text-sm transition-colors"
                  style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
                >
                  {t('projectsSection.comingSoon')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </FadeInUpSection>

      <FadeInSection>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 transition-colors"
                style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
              >
                {t('aboutSection.title')}
              </h2>
              <p 
                className="text-lg leading-relaxed mb-6 transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {t('aboutSection.description')}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-xl font-semibold mb-3 transition-colors"
                    style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
                  >
                    {t('aboutSection.skills')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Autodesk API', 'BIM'].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
                          color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative max-w-md w-full h-auto">
                {!isDark ? (
                  <Image 
                    src="/images/sketch-draw-white.webp"
                    alt="About me"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                ) : (
                  <Image 
                    src="/images/sketch-draw.png"
                    alt="About me"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      </FadeInSection>

      <ScrollSection>
      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 transition-colors"
            style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
          >
            {t('contactSection.title')}
          </h2>
          <p 
            className="text-lg mb-12 transition-colors"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
          >
            {t('contactSection.subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:tu-email@ejemplo.com"
              className="flex items-center gap-3 px-6 py-3 rounded-lg border transition-colors hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
                borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)';
              }}
            >
              <Mail size={20} />
              <span>{t('contactSection.email')}</span>
            </a>
            
            <a
              href="https://linkedin.com/in/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg border transition-colors hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
                borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)';
              }}
            >
              <Linkedin size={20} />
              <span>{t('contactSection.linkedin')}</span>
            </a>
            
            <a
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg border transition-colors hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
                borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)';
              }}
            >
              <Github size={20} />
              <span>{t('contactSection.github')}</span>
            </a>
          </div>
        </div>
      </section>
      </ScrollSection>
    </>
  );
}