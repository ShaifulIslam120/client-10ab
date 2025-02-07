import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://assignment10-serversite.vercel.app/reviews');
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews. Please try again later.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  const handleExploreClick = (reviewId) => {
    // Navigate to the review details page with the review ID
    navigate(`/review/${reviewId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
      {error ? (
        <p>{error}</p>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="card p-4 border shadow-lg">
              <img
                src={review.gameCover}
                alt={`Cover image of ${review.gameTitle}`}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-bold mt-4">{review.gameTitle}</h2>
              <p className="text-gray-600">{review.reviewDescription}</p>
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Genres:</strong> {Array.isArray(review.genres) ? review.genres.join(', ') : 'No genres available'}
              </p>
              <p>
                <strong>Published Year:</strong> {review.publishYear}
              </p>
              <p>
                <strong>Reviewed by:</strong> {review.userName} ({review.userEmail})
              </p>
              <button
                onClick={() => handleExploreClick(review._id)} // Pass the review ID to the function
                className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Explore Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};


export default AllReviews;
