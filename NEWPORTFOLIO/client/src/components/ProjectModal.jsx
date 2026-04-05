import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const M = motion;
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <M.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <M.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Content */}
                    <M.div
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-6xl max-h-[90vh] bg-surface overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden">
                            <M.img
                                layoutId={`img-${project._id || project.id}`}
                                src={project.thumbnail}
                                alt={project.title}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000";
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <span className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Project</span>
                                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">{project.title}</h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors interactive"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-8 mb-12">
                                    <div>
                                        <span className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Category</span>
                                        <p className="text-sm uppercase tracking-widest">{project.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Description</span>
                                        <p className="text-gray-400 text-sm leading-relaxed leading-[1.8]">
                                            {project.description || "A deep dive into minimalist aesthetics and functional design patterns. This project explores the intersection of user experience and high-end visual branding."}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Tech Stack</span>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {(project.tools || ["React", "Motion", "Tailwind"]).map(tool => (
                                                <span key={tool} className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-white/10 rounded-full">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <a href={project.link || "#"} className="interactive block">
                                    <MagneticButton className="w-full">
                                        Live Experience ↗
                                    </MagneticButton>
                                </a>
                            </div>
                        </div>
                    </M.div>
                </M.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
