import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddReview = () => {
  const [gameCover, setGameCover] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [publishYear, setPublishYear] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!gameCover || !gameTitle || !reviewDescription || !publishYear) {
      setError('All fields are required.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    // Process the form data (you can save this to Firebase, for example)
    // Here, we'll just show a success message
    Swal.fire({
      title: 'Review Submitted!',
      text: 'Your review has been submitted successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Reset form fields
    setGameCover('');
    setGameTitle('');
    setReviewDescription('');
    setRating(1);
    setPublishYear('');
    setError('');
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
