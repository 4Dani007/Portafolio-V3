'use client';
import Navbar from '../components/Navbar';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../hooks/useTheme';
import { Mail, Linkedin, Github, Instagram, Twitter, Globe, Workflow, Plug, LayoutDashboard, Wrench, Calendar, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import HeroDashboard from '../components/HeroDashboard';
import ContactForm from '../components/ContactForm';
import FloatingContactCTA from '../components/FloatingContactCTA';
import AboutCodePanel from '../components/AboutCodePanel';
import { getCustomProjects, getCustomProjectNames } from '../../lib/customProjects';
import { getProjectOrder } from '../../lib/projectOrder';

export default function HomePage() {
  const t = useTranslations();
  const { isDark, mounted } = useTheme();
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const serviceItems = [
    { key: 'web', icon: Globe },
    { key: 'automation', icon: Workflow },
    { key: 'apis', icon: Plug },
    { key: 'dashboards', icon: LayoutDashboard },
    { key: 'maintenance', icon: Wrench },
  ];

  const contactTopics = t.raw('contactSection.topics');

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const whatsappMessage = encodeURIComponent(t('contactSection.whatsappMessage'));

  const contactLinkClass =
    'flex items-center gap-3 px-5 py-3 rounded-lg border transition-all hover:scale-105 w-full sm:w-auto justify-center';

  // Manejar scroll a secciones cuando se navega con hash
  useEffect(() => {
    if (!mounted) return;

    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Ejecutar al montar si hay hash
    handleHashScroll();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [mounted]);

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
        const customProjectNames = getCustomProjectNames();
        const filteredGithubRepos = githubRepos.filter((repo) => !customProjectNames.has(repo.name));

        // Combinar ambos tipos de proyectos
        const combined = [...customProjects, ...filteredGithubRepos];

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
            <div className="flex flex-col justify-center space-y-6 max-w-xl">
              <h1 
                className="text-4xl md:text-5xl font-bold transition-colors leading-tight"
                style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 102, 204)' }}
              >
                {t('hero.title')}
              </h1>
              <p 
                className="text-xl font-medium transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
              >
                {t('hero.subtitle')}
              </p>
              <p 
                className="text-lg leading-relaxed transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
              >
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                    color: 'rgb(255, 255, 255)',
                  }}
                >
                  {t('hero.ctaProjects')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 rounded-lg font-medium border transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                    borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                    color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                    e.currentTarget.style.color = 'rgb(255, 255, 255)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
                    e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                  }}
                >
                  {t('hero.ctaContact')}
                </button>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="flex justify-center lg:justify-end w-full">
              <HeroDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 102, 204)' }}
            >
              {t('servicesSection.title')}
            </h2>
            <p
              className="text-lg transition-colors max-w-2xl mx-auto"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
            >
              {t('servicesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceItems.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-lg p-6 border transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(0, 102, 204)',
                  borderWidth: isDark ? '1px' : '2px',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: isDark ? 'rgb(30, 58, 138)' : 'rgb(230, 244, 255)',
                  }}
                >
                  <Icon
                    size={24}
                    style={{ color: isDark ? 'rgb(147, 197, 253)' : 'rgb(0, 102, 204)' }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2 transition-colors"
                  style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(0, 102, 204)' }}
                >
                  {t(`servicesSection.${key}.title`)}
                </h3>
                <p
                  className="text-sm leading-relaxed transition-colors"
                  style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
                >
                  {t(`servicesSection.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 102, 204)' }}
            >
              {t('projectsSection.title')}
            </h2>
            <p 
              className="text-lg transition-colors"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
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
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 102, 204)' }}
              >
                {t('aboutSection.title')}
              </h2>
              <p 
                className="text-lg leading-relaxed mb-6 transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
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
                    {['React', 'Next.js', 'Python', 'Flask', 'TypeScript', 'APIs REST'].map((skill) => (
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
            
            <div className="flex justify-center lg:justify-end w-full">
              <AboutCodePanel />
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 102, 204)' }}
            >
              {t('contactSection.title')}
            </h2>
            <p
              className="text-lg transition-colors max-w-2xl mx-auto"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(74, 85, 104)' }}
            >
              {t('contactSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Formulario */}
            <ContactForm />

            {/* Acciones rápidas + temas */}
            <div className="space-y-6">
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4 transition-colors"
                  style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(15, 23, 42)' }}
                >
                  {t('contactSection.quickActions')}
                </h3>

                <div className="flex flex-col gap-3">
                  {calendlyUrl && (
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                      style={{
                        backgroundColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                        borderColor: 'transparent',
                        color: 'rgb(255, 255, 255)',
                      }}
                    >
                      <Calendar size={20} />
                      <span>{t('contactSection.scheduleMeeting')}</span>
                    </a>
                  )}

                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                      style={{
                        backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                        borderColor: 'rgb(37, 211, 102)',
                        color: 'rgb(37, 211, 102)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(37, 211, 102)';
                        e.currentTarget.style.color = 'rgb(255, 255, 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
                        e.currentTarget.style.color = 'rgb(37, 211, 102)';
                      }}
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{t('contactSection.whatsapp')}</span>
                    </a>
                  )}

                  {contactEmail && (
                    <a
                      href={`mailto:${contactEmail}`}
                      className={contactLinkClass}
                      style={{
                        backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                        borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                        color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                        e.currentTarget.style.color = 'rgb(255, 255, 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
                        e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                      }}
                    >
                      <Mail size={20} />
                      <span>{contactEmail}</span>
                    </a>
                  )}

                  {contactPhone && (
                    <a
                      href={`tel:${contactPhone}`}
                      className={contactLinkClass}
                      style={{
                        backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                        borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                        color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                        e.currentTarget.style.color = 'rgb(255, 255, 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
                        e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                      }}
                    >
                      <Phone size={20} />
                      <span>
                        {t('contactSection.phone')}: 300 641 7651
                      </span>
                    </a>
                  )}

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                      style={{
                        backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                        borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                        color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                        e.currentTarget.style.color = 'rgb(255, 255, 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
                        e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                      }}
                    >
                      <Linkedin size={20} />
                      <span>{t('contactSection.linkedin')}</span>
                    </a>
                  )}
                </div>
              </div>

              <div
                className="rounded-lg p-6 border text-left"
                style={{
                  backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                }}
              >
                <p
                  className="font-medium mb-4 transition-colors"
                  style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(26, 26, 26)' }}
                >
                  {t('contactSection.intro')}
                </p>
                <ul className="space-y-2">
                  {Array.isArray(contactTopics) &&
                    contactTopics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2 text-sm transition-colors"
                        style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
                      >
                        <span style={{ color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)' }}>✓</span>
                        {topic}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {process.env.NEXT_PUBLIC_GITHUB_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                      borderColor: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                      color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)',
                    }}
                  >
                    <Github size={16} />
                    {t('contactSection.github')}
                  </a>
                )}
                {process.env.NEXT_PUBLIC_INSTAGRAM_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                      borderColor: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                      color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)',
                    }}
                  >
                    <Instagram size={16} />
                    {t('contactSection.instagram')}
                  </a>
                )}
                {process.env.NEXT_PUBLIC_TWITTER_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                      borderColor: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                      color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)',
                    }}
                  >
                    <Twitter size={16} />
                    {t('contactSection.twitter')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingContactCTA onScrollToContact={() => scrollToSection('contact')} />

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