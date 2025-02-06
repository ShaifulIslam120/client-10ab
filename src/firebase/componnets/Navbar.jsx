// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">Chill Gamer</Link>
      </div>

      <div className="md:flex space-x-6">
        <Link to="/reviews" className="hover:text-gray-400 p-2">All Reviews</Link>
        {user && <Link to="/add-review" className="hover:text-gray-400 p-2">Add Review</Link>}
        {user && <Link to="/my-reviews" className="hover:text-gray-400 p-2">My Reviews</Link>}
        {user && <Link to="/myWatchlist" className="hover:text-gray-400 p-2">Game WatchList</Link>}
      </div>

      <div className="relative">
        {user ? (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <span>{user.displayName}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md">
                <button
                  onClick={handleLogout} // Trigger logout
                  className="w-full text-left p-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-400">Login</Link> // Show login button if user is not logged in
        )}
      </div>
    </nav>
  );
};

export default Navbar;
