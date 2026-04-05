import { motion } from 'framer-motion';
import { Instagram, Music, MessageCircle, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VoxelCharacter = () => {
    return (
        <div className="relative w-32 h-48 perspective-1000">
            {/* Minecraft Style Head */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-[#e0ac69] absolute top-0 left-8 border-4 border-black/20"
            >
                {/* Eyes */}
                <div className="absolute top-6 left-2 w-3 h-3 bg-black" />
                <div className="absolute top-6 right-2 w-3 h-3 bg-black" />
            </motion.div>
            {/* Body */}
            <div className="w-20 h-24 bg-[#3d85c6] absolute top-16 left-6 border-4 border-black/20" />
            {/* Arms */}
            <motion.div
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-20 bg-[#e0ac69] absolute top-16 -left-2 origin-top border-4 border-black/20"
            />
            <motion.div
                animate={{ rotate: [20, -20, 20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-20 bg-[#e0ac69] absolute top-16 right-0 origin-top border-4 border-black/20"
            />
            {/* Legs */}
            <motion.div
                animate={{ rotate: [30, -30, 30] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-12 bg-[#333] absolute top-40 left-6 origin-top border-4 border-black/20"
            />
            <motion.div
                animate={{ rotate: [-30, 30, -30] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-12 bg-[#333] absolute top-40 right-4 origin-top border-4 border-black/20"
            />
        </div>
    );
};

const AboutDetail = () => {
    const navigate = useNavigate();
    const M = motion;
    const [score, setScore] = useState(0);

    return (
        <div className="bg-dark min-h-screen text-white">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 text-muted hover:text-white transition-colors mb-12 uppercase text-[10px] tracking-[0.3em] font-bold interactive"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Home</span>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
                        <M.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="h-xl mb-8">Beyond The <span className="text-muted italic font-serif normal-case">Code</span></h1>
                            <p className="text-gray-400 text-sm leading-loose uppercase tracking-[0.2em] mb-12">
                                When I'm not architecting AI systems or building modular backends,
                                I'm exploring the digital frontier or getting lost in soundscapes.
                                Here's a bit more about the human behind the terminal.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="https://instagram.com/__deepakk.singh/" target="_blank" className="flex items-center space-x-3 bg-surface p-4 rounded-xl hover:bg-white hover:text-black transition-all group interactive">
                                    <Instagram size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
                                </a>
                                <a href="https://open.spotify.com/user/cp6w2t5oalpevo0na6jzsuz28" target="_blank" className="flex items-center space-x-3 bg-surface p-4 rounded-xl hover:bg-white hover:text-black transition-all group interactive">
                                    <Music size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Spotify</span>
                                </a>
                            </div>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center py-20 bg-surface/20 rounded-[40px] border border-white/5 relative overflow-hidden"
                        >
                            <VoxelCharacter />
                            <div className="absolute bottom-8 text-center w-full">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-muted animate-pulse italic">Voxel Persona v1.0</span>
                            </div>
                        </M.div>
                    </div>

                    {/* Fun Section */}
                    <section className="mb-40">
                        <div className="flex items-center space-x-4 mb-12">
                            <Gamepad2 className="text-muted" />
                            <h2 className="h-md uppercase">The Voxel <span className="text-muted italic font-serif normal-case">Jump</span></h2>
                        </div>

                        <div className="bg-surface/30 p-12 rounded-[40px] border border-white/5 flex flex-col items-center">
                            <p className="text-center text-muted text-xs uppercase tracking-widest mb-12">Click the character to earn fragments</p>
                            <M.div
                                whileTap={{ scale: 0.9, y: -20 }}
                                onClick={() => setScore(s => s + 1)}
                                className="cursor-pointer interactive"
                            >
                                <VoxelCharacter />
                            </M.div>
                            <div className="mt-20">
                                <span className="text-8xl font-black font-mono opacity-20">{score.toString().padStart(3, '0')}</span>
                                <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold mt-4">Compiled Fragments</p>
                            </div>
                        </div>
                    </section>

                    {/* Spotify Playlist Idea */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-surface p-10 rounded-3xl border border-white/5">
                            <Music className="mb-6 text-muted" />
                            <h3 className="font-bold uppercase tracking-tight mb-4">Midnight Focus</h3>
                            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest opacity-60">Lofi & Ambient textures for deep work.</p>
                        </div>
                        <div className="bg-surface p-10 rounded-3xl border border-white/5">
                            <MessageCircle className="mb-6 text-muted" />
                            <h3 className="font-bold uppercase tracking-tight mb-4">Daily Logs</h3>
                            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest opacity-60">Sharing thoughts on AI and minimalism on X.</p>
                        </div>
                        <div className="bg-surface p-10 rounded-3xl border border-white/5 flex items-center justify-center italic text-muted text-xs">
                            More coming soon...
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutDetail;
