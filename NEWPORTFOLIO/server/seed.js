const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const projects = [
    {
        title: 'Obsidian Flow',
        category: 'Web Design',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        description: 'A minimalist exploration of dark UI patterns and smooth interaction design.',
        tools: ['React', 'Framer Motion', 'Gsap'],
        order: 1
    },
    {
        title: 'Minimalist Pulse',
        category: 'Identity',
        thumbnail: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1000',
        description: 'Brand identity system developed for a premium Swiss-based architectural firm.',
        tools: ['Illustrator', 'Framer', 'WebGL'],
        order: 2
    },
    {
        title: 'Dark Matter',
        category: 'Motion Graphics',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
        description: 'Experimental motion design project exploring fluid dynamics in digital spaces.',
        tools: ['After Effects', 'Cinema 4D'],
        order: 3
    },
    {
        title: 'Ethereal Soul',
        category: 'UI/UX Design',
        thumbnail: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1000',
        description: 'User interface design for a meditative mobile application focus on mindfulness.',
        tools: ['Figma', 'Next.js', 'Tailwind'],
        order: 4
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gordian_portfolio');
        await Project.deleteMany({});
        await Project.insertMany(projects);
        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
