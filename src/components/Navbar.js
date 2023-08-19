import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" shadow-md px-4 py-6">
      <ul className="space-y-4 text-lg font-bold">
        <li>
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="hover:text-gray-600">
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/charts" className="hover:text-gray-600">
            Charts & Maps
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
