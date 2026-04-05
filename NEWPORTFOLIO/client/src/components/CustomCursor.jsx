import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const M = motion;
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 50, stiffness: 300, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const handleHoverStart = useCallback(() => setIsHovered(true), []);
    const handleHoverEnd = useCallback(() => setIsHovered(false), []);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        attachListeners();

        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [cursorX, cursorY, handleHoverStart, handleHoverEnd]);

    return (
        <>
            {/* Primary dot — sharp, snappy */}
            <M.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovered ? '6px' : '4px',
                    height: isHovered ? '6px' : '4px',
                    background: '#ffffff',
                    borderRadius: '50%',
                    mixBlendMode: 'difference',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: '-50%',
                    translateY: '-50%',
                    x: cursorXSpring,
                    y: cursorYSpring,
                    boxShadow: isHovered
                        ? '0 0 14px 4px rgba(160,200,255,0.9)'
                        : '0 0 8px 2px rgba(200,220,255,0.6)',
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};

export default CustomCursor;
