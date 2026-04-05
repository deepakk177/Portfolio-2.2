import { motion } from 'framer-motion';

const Education = () => {
    const M = motion;
    const education = [
        {
            year: "2025 – 2027",
            degree: "Master of Technology — Artificial Intelligence",
            institution: "Maulana Azad National Institute of Technology (MANIT)",
            location: "Bhopal, India",
            details: "Specializing in advanced AI architectures, focusing on neural networks and model evaluation."
        },
        {
            year: "2021 – 2025",
            degree: "Bachelor of Technology — Computer Science and Engineering",
            institution: "Jabalpur Engineering College (JEC)",
            location: "Jabalpur, India",
            details: "Core emphasis on data structures, algorithms, and modular object-oriented backend systems."
        }
    ];

    return (
        <section className="py-40 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
                    <h2 className="h-lg uppercase max-w-xl">
                        Path of <br /> <span className="text-muted italic font-serif normal-case">Learning</span>
                    </h2>
                    <div className="mt-8 md:mt-0">
                        <p className="text-muted text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">Academic Journey</p>
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 top-0 w-px h-full bg-white/5 md:left-1/2 md:-ml-px" />

                    <div className="space-y-24 md:space-y-40">
                        {education.map((item, index) => (
                            <M.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Year indicator circle */}
                                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-white border-4 border-dark z-10 md:left-1/2 md:-ml-2 -mt-1 md:top-2 md:block hidden" />

                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-20' : 'md:pr-20'}`}>
                                    <div className="bg-surface/30 p-8 md:p-12 hover:bg-surface/50 transition-colors group interactive">
                                        <span className="text-muted text-xs font-mono tracking-widest block mb-4 italic">{item.year}</span>
                                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-white transition-colors">
                                            {item.degree}
                                        </h3>
                                        <p className="text-white/80 font-medium text-sm mb-2 uppercase tracking-wide">
                                            {item.institution}
                                        </p>
                                        <p className="text-muted text-[10px] uppercase tracking-widest mb-6">
                                            {item.location}
                                        </p>
                                        <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-wider leading-[1.8] opacity-60">
                                            {item.details}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block w-1/2" />
                            </M.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
        </section>
    );
};

export default Education;
