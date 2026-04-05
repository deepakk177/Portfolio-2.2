import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.5);
            yTo(y * 0.5);
        };

        const onMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", onMouseMove);
        button.addEventListener("mouseleave", onMouseLeave);

        return () => {
            button.removeEventListener("mousemove", onMouseMove);
            button.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <button ref={buttonRef} className={`relative px-8 py-4 border border-white uppercase text-[10px] tracking-[0.4em] font-bold rounded-full transition-colors hover:bg-white hover:text-black interactive ${className}`}>
            {children}
        </button>
    );
};

export default MagneticButton;
