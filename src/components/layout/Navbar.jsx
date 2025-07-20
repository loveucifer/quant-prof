import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Reverted "Tools" back to "Games" as requested
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/courses' },
    { title: 'Problems', path: '/problems' },
    { title: 'Blogs', path: '/blogs' },
    { title: 'Games', path: '/games' }, 
  ];

  return (
    <nav className="p-4 flex justify-between items-center container mx-auto z-50 relative">
      <h1 className="text-2xl font-mono font-bold text-accent">QuantProf</h1>
      <div className="space-x-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className={({ isActive }) =>
              `text-lg hover:text-accent transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white'}`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
