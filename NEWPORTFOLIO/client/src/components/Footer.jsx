import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const M = motion;
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <footer id="contact" className="bg-surface py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                    <div>
                        <h2 className="h-lg mb-12 uppercase">Let's <br /> <span className="font-serif italic text-muted normal-case italic">Connect</span></h2>
                        <p className="text-gray-400 mb-8 max-w-sm uppercase text-xs tracking-widest leading-loose">
                            Always looking for new challenges and creative collaborations. Get in touch to start something new.
                        </p>
                        <a
                            href="mailto:deepaksinghporte85@gmail.com"
                            className="text-2xl md:text-3xl font-light hover:text-muted transition-colors border-b border-muted group flex items-center w-fit py-2"
                        >
                            deepaksinghporte85@gmail.com
                            <M.span
                                className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                            >
                                ↗
                            </M.span>
                        </a>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-12 md:mb-0">
                            {[
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/deepak-singh-porte-a0566a224/' },
                                { name: 'GitHub', url: 'https://github.com/deepakk177' },
                                { name: 'Instagram', url: 'https://instagram.com/__deepakk.singh/' },
                                { name: 'Spotify', url: 'https://open.spotify.com/user/cp6w2t5oalpevo0na6jzsuz28' },
                                { name: 'X', url: 'https://x.com/porte_deep74061' },
                            ].map((social) => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="uppercase text-[10px] tracking-[0.3em] font-bold hover:text-muted transition-colors">
                                    {social.name}
                                </a>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">Local Time</span>
                                <span className="text-xl font-mono tracking-tighter">{formattedTime} GMT+5:30</span>
                            </div>
                            <div>
                                <span className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">Based In</span>
                                <span className="text-xl tracking-tight uppercase">Bhopal, IND</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-muted uppercase tracking-[0.4em] font-medium">
                    <p>© {new Date().getFullYear()} DEEPAK PORTFOLIO</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
