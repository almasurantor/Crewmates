import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="p-4 bg-gray-800 text-white flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/create">Add Crewmate</Link>
    <Link to="/summary">Crew Summary</Link>
  </nav>
);

export default Navbar;