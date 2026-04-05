import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Standard scroll to top
        window.scrollTo(0, 0);

        // In case Lenis is active, this helps reset its internal state
        const html = document.documentElement;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        html.style.scrollBehavior = '';
    }, [pathname]);

    return null;
};

export default ScrollToTop;
