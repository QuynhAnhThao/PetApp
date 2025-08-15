import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl hover:opacity-90">
          Pet Clinic Management
        </Link>

        {user ? (
          <div className="flex items-center gap-5">
            <Link to="/appointments" className="hover:opacity-90">Appointment</Link>
            <Link to="/pets" className="hover:opacity-90">Pets</Link>
            <Link to="/profile" className="hover:opacity-90">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-white text-zinc-900 px-3 py-1.5 rounded font-semibold hover:opacity-90"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white/10 px-3 py-1.5 rounded font-semibold hover:bg-white/20"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
