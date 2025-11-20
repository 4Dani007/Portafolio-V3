'use client';
import Navbar from '../components/Navbar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from '../../hooks/useTheme';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { getCustomProjects } from '../../lib/customProjects';
import { getProjectOrder } from '../../lib/projectOrder';

export default function HomePage() {
  const t = useTranslations();
  const { isDark, mounted } = useTheme();
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Obtener repositorios de GitHub y combinar con proyectos personalizados
  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoadingRepos(true);
        setReposError(null);
        
        // Obtener proyectos de GitHub
        const response = await fetch('/api/github/repos?sort=updated&per_page=6&type=owner');
        const data = await response.json();
        
        let githubRepos = [];
        if (data.success && data.data) {
          githubRepos = data.data;
        } else {
          setReposError(data.error || 'Failed to load projects');
        }

        // Obtener proyectos personalizados
        const customProjects = getCustomProjects();

        // Combinar ambos tipos de proyectos
        const combined = [...customProjects, ...githubRepos];

        // Agregar orden a proyectos de GitHub desde projectOrder.js
        const projectsWithOrder = combined.map(project => {
          // Si es proyecto personalizado, ya tiene su campo 'order' si está definido
          if (project.isCustom) {
            return project;
          }
          
          // Si es proyecto de GitHub, buscar orden en projectOrder.js
          const order = getProjectOrder(project.name);
          if (order !== undefined) {
            return { ...project, order };
          }
          
          return project;
        });

        // Ordenar proyectos
        // Prioridad: 1. Campo 'order' (más bajo = primero), 2. Fecha de actualización (más reciente = primero)
        projectsWithOrder.sort((a, b) => {
          // Si ambos tienen campo 'order', ordenar por ese campo
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          
          // Si solo uno tiene 'order', ese va primero
          if (a.order !== undefined) {
            return -1;
          }
          if (b.order !== undefined) {
            return 1;
          }
          
          // Si ninguno tiene 'order', ordenar por fecha (más reciente primero)
          const dateA = new Date(a.updatedAt || 0);
          const dateB = new Date(b.updatedAt || 0);
          return dateB - dateA;
        });

        setRepos(githubRepos);
        setAllProjects(projectsWithOrder);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setReposError('Failed to load projects');
        // Aún así, mostrar proyectos personalizados si hay error
        const customProjects = getCustomProjects();
        setAllProjects(customProjects);
      } finally {
        setLoadingRepos(false);
      }
    }
    
    if (mounted) {
      fetchRepos();
    }
  }, [mounted]);

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
          
          {/* Lista de proyectos */}
          {loadingRepos ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg p-6 border animate-pulse"
                  style={{
                    backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
                    borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)'
                  }}
                >
                  <div 
                    className="h-32 rounded-lg mb-4"
                    style={{ backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)' }}
                  />
                  <div 
                    className="h-4 rounded mb-2"
                    style={{ backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)' }}
                  />
                  <div 
                    className="h-3 rounded w-3/4"
                    style={{ backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)' }}
                  />
                </div>
              ))}
            </div>
          ) : reposError ? (
            <div className="text-center py-12">
              <p 
                className="text-lg transition-colors mb-4"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {reposError}
              </p>
              <p 
                className="text-sm transition-colors"
                style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
              >
                {t('projectsSection.comingSoon')}
              </p>
            </div>
          ) : allProjects.length === 0 ? (
            <div className="text-center py-12">
              <p 
                className="text-lg transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {t('projectsSection.comingSoon')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {allProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

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

      {/* Modal de proyecto */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}