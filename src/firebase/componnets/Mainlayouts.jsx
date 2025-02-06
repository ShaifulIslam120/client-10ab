// Mainlayouts.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.init'; // Firebase config import
import Navbar from './Navbar';

const Mainlayouts = () => {
  const [user, setUser] = useState(null); // State to manage user info

  useEffect(() => {
    // Check for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user info when the state changes
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  // Logout function
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null); // Reset user state on logout
    }).catch((error) => {
      console.error(error); // Handle any errors during logout
    });
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} /> {/* Pass user info and logout handler */}
      <Outlet /> {/* Render the page content based on the route */}
    </div>
  );
};

export default Mainlayouts;
