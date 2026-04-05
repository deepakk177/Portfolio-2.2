import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, index, onClick }) => {
    const M = motion;
    return (
        <M.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer interactive"
            onClick={onClick}
        >
            <div className="overflow-hidden aspect-[16/9] bg-surface relative mb-6">
                <M.img
                    layoutId={`img-${project._id || project.id}`}
                    src={project.thumbnail}
                    alt={project.title}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000";
                    }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="uppercase tracking-[0.3em] text-sm font-semibold border-b border-white pb-1">View Project</span>
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{project.title}</h3>
                    <p className="text-muted text-xs uppercase tracking-widest">{project.category}</p>
                </div>
                <div className="text-[10px] text-muted uppercase tracking-widest pt-1 px-2 border border-muted/30">
                    {new Date().getFullYear()}
                </div>
            </div>
        </M.div>
    );
};

const ProjectGrid = () => {
    const M = motion;
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                const fallbackData = [
                    { id: 1, title: 'Activity Recognition', category: 'AI / Deep Learning', thumbnail: 'https://www.labellerr.com/blog/content/images/2023/06/sports-activity-recognition.jpeg' },
                    { id: 2, title: 'NyaaySahayak', category: 'Backend / NLP', thumbnail: 'https://www.lawpreptutorial.com/blog/wp-content/uploads/2024/06/what-is-law.jpg' },
                    { id: 3, title: 'Interview Saathi', category: 'Backend / OOP', thumbnail: 'https://s3-alpha.figma.com/hub/file/5389437157/18dc7c30-8739-4f86-8c84-5736cd875657-cover.png' },
                    { id: 4, title: 'Open Source', category: 'Git / Collaboration', thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f1a1?auto=format&fit=crop&q=80&w=1000' },
                ];
                setProjects(fallbackData);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark">
                <M.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-t-2 border-white rounded-full"
                />
            </div>
        );
    }

    return (
        <section id="work" className="py-32 bg-dark">
            <div className="container mx-auto px-6">
                <M.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex justify-between items-end mb-24"
                >
                    <h2 className="h-lg uppercase">Selected <br /> <span className="text-muted font-serif italic normal-case">Works</span></h2>
                    <div className="hidden md:block text-right">
                        <p className="text-muted text-sm max-w-xs leading-relaxed uppercase tracking-[0.2em] leading-[1.8] font-medium opacity-60">
                            EXPLORING THE BOUNDARIES OF DIGITAL INTERACTION AND MINIMALIST AESTHETICS.
                        </p>
                    </div>
                </M.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id || project._id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                <ProjectModal
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </section>
    );
};

export default ProjectGrid;
