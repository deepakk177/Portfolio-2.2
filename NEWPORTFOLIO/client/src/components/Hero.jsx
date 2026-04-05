import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import RevealText from './RevealText';

const Hero = () => {
    const M = motion;

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* ── Ambient background orbs ── */}
            <div
                className="hero-orb absolute rounded-full pointer-events-none"
                style={{
                    width: '520px',
                    height: '520px',
                    background: 'radial-gradient(circle, rgba(80,120,255,0.08) 0%, transparent 70%)',
                    top: '5%',
                    left: '-10%',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            <div
                className="hero-orb absolute rounded-full pointer-events-none"
                style={{
                    width: '380px',
                    height: '380px',
                    background: 'radial-gradient(circle, rgba(140,80,255,0.07) 0%, transparent 70%)',
                    top: '20%',
                    right: '-8%',
                    animation: 'float 10s ease-in-out infinite',
                    animationDelay: '3s',
                }}
            />

            {/* ── Main content ── */}
            <div className="container mx-auto px-6 z-10 relative">
                <div className="max-w-5xl">
                    <RevealText>
                        <p className="text-muted uppercase tracking-[0.5em] mb-8 text-xs font-semibold">
                            Creative Developer &amp; AI Engineer
                        </p>
                    </RevealText>

                    <div className="mb-12">
                        <RevealText delay={0.1}>
                            <h1 className="h-xl">WE BUILD</h1>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <h1 className="h-xl italic font-serif normal-case text-muted -mt-2">
                                Digital
                            </h1>
                        </RevealText>
                        <RevealText delay={0.3}>
                            <h1 className="h-xl -mt-2">EXPERIENCES</h1>
                        </RevealText>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-16">
                        <RevealText delay={0.5}>
                            <p className="max-w-sm text-gray-500 leading-relaxed uppercase text-[10px] tracking-widest font-medium leading-[2]">
                                Designing interfaces that feel alive. Combining motion with minimalistic design to create premium digital products.
                            </p>
                        </RevealText>

                        <RevealText delay={0.6}>
                            <a href="#work" className="interactive block">
                                <MagneticButton className="border-none px-0 py-0 flex items-center space-x-6 group">
                                    <span className="uppercase text-xs tracking-[0.4em] font-bold">View Projects</span>
                                    <div className="w-16 h-px bg-white group-hover:w-20 transition-all duration-500" />
                                </MagneticButton>
                            </a>
                        </RevealText>
                    </div>

                    {/* Particle interaction hint */}
                    <RevealText delay={1.2}>
                        <p className="mt-16 text-[9px] uppercase tracking-[0.5em] text-white/20">
                            Move cursor over particles — click to scatter
                        </p>
                    </RevealText>
                </div>
            </div>

            {/* ── Bottom gradient fade ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(to bottom, transparent, #000000)',
                }}
            />
        </section>
    );
};

export default Hero;
