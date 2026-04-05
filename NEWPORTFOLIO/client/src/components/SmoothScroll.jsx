import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
        }

        gsap.ticker.add(raf);

        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
            lenis.off('scroll', ScrollTrigger.update);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
