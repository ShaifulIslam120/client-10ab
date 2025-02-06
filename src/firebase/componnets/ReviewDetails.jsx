import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';

const ReviewDetails = () => {
  const { id } = useParams(); // Get review ID from URL
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:3000/review/${id}`);
        const data = await response.json();

        if (response.ok) {
          setReview(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Error fetching review details');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleAddToWatchList = async () => {
    if (!currentUser) {
      Swal.fire({
        title: 'Please log in',
        text: 'You need to be logged in to add a review to your watchlist.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/add-to-watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gameId: id,  // Match the backend field name
            gameTitle: review.gameTitle,
            gameCover: review.gameCover,
            rating: review.rating,
            genres: review.genres,
            publishYear: review.publishYear,
            userEmail: currentUser.email,
            userName: currentUser.displayName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Added to Watchlist',
          text: 'The review has been added to your watchlist.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add to watchlist. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">{review.gameTitle}</h2>
      <img src={review.gameCover} alt={review.gameTitle} className="w-full h-64 object-cover rounded-md mb-6" />
      <p><strong>Description:</strong> {review.reviewDescription}</p>
      <p><strong>Rating:</strong> {review.rating} / 5</p>
      <p><strong>Genre:</strong> {review.genres}</p>
      <p><strong>Published Year:</strong> {review.publishYear}</p>
      <p><strong>Reviewer:</strong> {review.userName} ({review.userEmail})</p>
      <div className="text-center mt-6">
        <button
          onClick={handleAddToWatchList}
          className="w-full py-3 bg-yellow-500 text-black rounded-md text-xl hover:bg-yellow-600 transition duration-300"
        >
          Add to WatchList
        </button>
      </div>
    </div>
  );
};

export default ReviewDetails;
