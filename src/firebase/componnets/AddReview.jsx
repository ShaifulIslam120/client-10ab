import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth

const AddReview = () => {
  const [gameCover, setGameCover] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [publishYear, setPublishYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  // Fetch the current user data (name, email) when component mounts
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);  // Set user email from Firebase Auth
      setUserName(user.displayName || 'Anonymous');  // Use user display name, fallback to 'Anonymous'
    } else {
      setUserEmail('');  // Handle user not logged in
      setUserName('');  // Handle user not logged in
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!gameCover || !gameTitle || !reviewDescription || !publishYear || !genres || !userEmail || !userName) {
      setError('All fields are required.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    // Prepare the review data
    const reviewData = {
      gameCover,
      gameTitle,
      reviewDescription,
      rating,
      publishYear,
      genres,
      userEmail,
      userName
    };

    try {
      // Send POST request to the backend using fetch
      const response = await fetch('http://localhost:3000/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();

        // Show success message if review is added successfully
        Swal.fire({
          title: 'Review Submitted!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form fields
        setGameCover('');
        setGameTitle('');
        setReviewDescription('');
        setRating(1);
        setPublishYear('');
        setGenres([]);
        setError('');
      } else {
        // Handle error if response is not ok
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'There was an error submitting your review.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding review:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error submitting your review.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">Add New Review</h2>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Game Cover Image URL */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Game Cover Image URL"
            value={gameCover}
            onChange={(e) => setGameCover(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Game Title */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Game Title"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Review Description */}
        <div className="mb-4">
          <textarea
            placeholder="Review Description"
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block mb-2">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Publish Year */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Publishing Year (e.g. 2021)"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* User Email (Read-Only) */}
        <div className="mb-4">
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* User Name (Read-Only) */}
        <div className="mb-4">
          <input
            type="text"
            value={userName}
            readOnly
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black rounded-md text-xl hover:bg-yellow-600 transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
