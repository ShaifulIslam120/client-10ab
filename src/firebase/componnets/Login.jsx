import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Authentication method
import { auth } from '../firebase.init'; // Import the auth instance from firebase.init.js

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      // Use Firebase Authentication to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, show success message
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/'); // Redirect to home page after successful login
      });
    } catch (error) {
      // Handle login errors (e.g., wrong credentials)
      setLoginError(error.message);
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
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">Login</h2>

      <div className="mb-4">
        <input
          type="email" // Change to email field as it's common for login
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
        />
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>} {/* Show error message if login fails */}
      </div>

      <div className="text-center">
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-yellow-500 text-black rounded-md text-xl hover:bg-yellow-600 transition duration-300"
        >
          Login
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-yellow-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
