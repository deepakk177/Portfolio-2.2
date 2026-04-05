import { motion } from 'framer-motion';

const Capabilities = () => {
    const M = motion;
    const services = [
        {
            id: "01",
            title: "AI & Machine Learning",
            description: "Developing end-to-end ML systems, activity recognition, and legal document processing using Scikit-learn and TensorFlow.",
            tags: ["Python", "DL", "Scikit-learn"]
        },
        {
            id: "02",
            title: "Backend Engineering",
            description: "Architecting modular, object-oriented backend systems and high-performance REST APIs.",
            tags: ["Node.js", "REST APIs", "OOP"]
        },
        {
            id: "03",
            title: "Web Development",
            description: "Building scalable web interfaces with seamless motion and intuitive user journeys.",
            tags: ["React", "JavaScript", "GSAP"]
        },
        {
            id: "04",
            title: "Systems & Security",
            description: "Implementing secure network configurations, firewall basics, and performance-monitored infrastructures.",
            tags: ["Docker", "Git", "Networking"]
        }
    ];

    return (
        <section id="services" className="py-40 bg-dark border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
                    <h2 className="h-lg uppercase max-w-xl">
                        Our <span className="text-muted italic font-serif normal-case">Capabilities</span> & Expertises
                    </h2>
                    <div className="mt-8 md:mt-0">
                        <p className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold">What we offer</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-px bg-white/5">
                    {services.map((service, index) => (
                        <M.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-dark group py-16 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-surface transition-colors duration-500 interactive"
                        >
                            <div className="flex items-start space-x-12 mb-8 md:mb-0">
                                <span className="text-muted text-xs font-mono pt-2">{service.id}</span>
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 group-hover:translate-x-4 transition-transform duration-500">
                                        {service.title}
                                    </h3>
                                    <div className="flex space-x-4">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-widest text-muted border border-white/10 px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-xs transition-opacity duration-500 opacity-60 group-hover:opacity-100">
                                <p className="text-gray-400 text-sm leading-relaxed uppercase text-[10px] tracking-widest leading-[1.8]">
                                    {service.description}
                                </p>
                            </div>
                        </M.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
