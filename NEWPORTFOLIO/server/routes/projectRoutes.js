const express = require('express');
const router = express.Router();

const projects = [
    {
        _id: '1',
        title: 'Obsidian Flow',
        category: 'Web Design',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        description: 'A minimalist exploration of dark UI patterns and smooth interaction design.',
        tools: ['React', 'Framer Motion', 'Gsap'],
        order: 1
    },
    {
        _id: '2',
        title: 'Minimalist Pulse',
        category: 'Identity',
        thumbnail: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1000',
        description: 'Brand identity system developed for a premium Swiss-based architectural firm.',
        tools: ['Illustrator', 'Framer', 'WebGL'],
        order: 2
    },
    {
        _id: '3',
        title: 'Dark Matter',
        category: 'Motion Graphics',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
        description: 'Experimental motion design project exploring fluid dynamics in digital spaces.',
        tools: ['After Effects', 'Cinema 4D'],
        order: 3
    },
    {
        _id: '4',
        title: 'Ethereal Soul',
        category: 'UI/UX Design',
        thumbnail: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1000',
        description: 'User interface design for a meditative mobile application focus on mindfulness.',
        tools: ['Figma', 'Next.js', 'Tailwind'],
        order: 4
    }
];

// GET all projects
router.get('/', (req, res) => {
    res.json(projects);
});

module.exports = router;
