import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const M = motion;
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > lastScrollY.current && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 50);
        lastScrollY.current = latest;
    });

    const menuItems = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <M.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-8'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <M.a
                    href="/"
                    className="text-2xl font-bold tracking-tighter flex items-center group interactive"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    DEEPAK<span className="text-white transition-transform group-hover:rotate-45 duration-300">.</span>
                </M.a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-12">
                    {menuItems.map((item, i) => (
                        <M.a
                            key={item.name}
                            href={item.href}
                            className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-muted transition-colors relative group interactive"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
                        </M.a>
                    ))}
                    <a href="#contact" className="px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 interactive font-bold">
                        Start Project
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 p-2 hover:bg-white/10 rounded-full transition-colors interactive"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <M.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 text-4xl font-bold uppercase"
                        >
                            {menuItems.map((item, i) => (
                                <M.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="hover:italic hover:text-muted transition-all"
                                >
                                    {item.name}
                                </M.a>
                            ))}
                        </M.div>
                    )}
                </AnimatePresence>
            </div>
        </M.nav>
    );
};

export default Navbar;
