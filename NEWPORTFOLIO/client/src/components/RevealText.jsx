import { motion } from 'framer-motion';
import { useState } from 'react';

const RevealText = ({ children, className = "", delay = 0 }) => {
    const M = motion;
    const [isDone, setIsDone] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <div className={`${isDone ? 'overflow-visible' : 'overflow-hidden'} p-4 -m-4`}>
                <M.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onAnimationComplete={() => setIsDone(true)}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        delay: delay
                    }}
                >
                    {children}
                </M.div>
            </div>
        </div>
    );
};

export default RevealText;
