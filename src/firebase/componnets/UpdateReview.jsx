import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState({
    gameCover: '',
    gameTitle: '',
    reviewDescription: '',
    rating: 1,
    publishYear: '',
    genres: '',
    userEmail: '',
    userName: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch review data when the component mounts
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:3000/review/${id}`);
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error('Error fetching review:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  // Handle form submission to update review
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedReview = {
      ...review, // Keep all current data
      gameCover: review.gameCover || 'default_image_url', // Handle optional fields
    };

    try {
      const response = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });

      if (response.ok) {
        Swal.fire('Success', 'Your review has been updated.', 'success');
        navigate('/my-reviews'); // Redirect to the "My Reviews" page after update
      } else {
        Swal.fire('Error', 'Failed to update the review. Please try again.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while updating the review.', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">Update Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="gameTitle" className="block text-sm font-medium text-white">Game Title</label>
          <input
            id="gameTitle"
            type="text"
            value={review.gameTitle}
            onChange={(e) => setReview({ ...review, gameTitle: e.target.value })}
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reviewDescription" className="block text-sm font-medium text-white">Review Description</label>
          <textarea
            id="reviewDescription"
            value={review.reviewDescription}
            onChange={(e) => setReview({ ...review, reviewDescription: e.target.value })}
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rating" className="block text-sm font-medium text-white">Rating</label>
          <input
            id="rating"
            type="number"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Math.min(Math.max(e.target.value, 1), 5) })}
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
            min="1"
            max="5"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="publishYear" className="block text-sm font-medium text-white">Published Year</label>
          <input
            id="publishYear"
            type="number"
            value={review.publishYear}
            onChange={(e) => setReview({ ...review, publishYear: e.target.value })}
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="genres" className="block text-sm font-medium text-white">Genres</label>
          <input
            id="genres"
            type="text"
            value={review.genres.join(', ')}
            onChange={(e) => setReview({ ...review, genres: e.target.value.split(',').map((genre) => genre.trim()) })}
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="userEmail" className="block text-sm font-medium text-white">User Email</label>
          <input
            id="userEmail"
            type="email"
            value={review.userEmail}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="userName" className="block text-sm font-medium text-white">User Name</label>
          <input
            id="userName"
            type="text"
            value={review.userName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
