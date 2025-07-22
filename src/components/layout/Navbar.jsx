import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct

const Navbar = () => {
  // Get user status and logout function from the authentication context
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Define the navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/courses' },
    { title: 'Problems', path: '/problems' },
    { title: 'Blogs', path: '/blogs' },
    { title: 'Games', path: '/games' }, 
  ];

  // Handle the logout process
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to the home page after a successful logout
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <nav className="p-4 flex justify-between items-center container mx-auto z-50 relative">
      <h1 className="text-2xl font-mono font-bold text-accent">QuantProf</h1>
      <div className="flex items-center space-x-8">
        {/* Map through the standard navigation links */}
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

        {/* Conditionally render Login or Logout button */}
        {user ? (
          // If user is logged in, show Logout button
          <button
            onClick={handleLogout}
            className="text-lg bg-transparent hover:bg-accent/10 text-accent border border-accent px-4 py-1 rounded-md transition-colors duration-300"
          >
            Logout
          </button>
        ) : (
          // If user is not logged in, show Login link
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-lg hover:text-accent transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white'}`
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
