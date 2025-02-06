import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Authentication methods
import { auth } from '../firebase.init';
import { updateProfile } from 'firebase/auth'; // Import updateProfile method

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleRegister = async () => {
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
      return;
    }

    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // You can also update the user's display name and photo URL if desired
      const user = userCredential.user;

      // Use the updateProfile method from the Firebase Auth module
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Show success alert and navigate to login
      Swal.fire({
        title: 'Registration Successful!',
        text: 'You can now login with your credentials.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      // Handle registration errors
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">Register</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password input types
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>

      <div className="text-center">
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-yellow-500 text-black rounded-md text-xl hover:bg-yellow-600 transition duration-300"
        >
          Register Now
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
