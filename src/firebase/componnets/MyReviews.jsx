import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = getAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://assignment10-serversite.vercel.app/reviews'); // Fetch reviews for the logged-in user
        const data = await response.json();
        
        // Filter the reviews to only show the ones added by the current user
        const userReviews = data.filter((review) => review.userEmail === currentUser.email);
        setReviews(userReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentUser]);

  const handleUpdateClick = (id) => {
    navigate(`/updateReview/${id}`);
  };

  const handleDeleteClick = (id) => {
    // Show confirmation prompt using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to the backend to delete the review
          const response = await fetch(`https://assignment10-serversite.vercel.app//reviews/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Remove the deleted review from the UI by filtering it out
            setReviews(reviews.filter((review) => review._id !== id));
            Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete the review. Please try again.', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete the review. Please try again.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">My Reviews</h2>
      
      {reviews.length === 0 ? (
        <p>No reviews available. Add a new review to see it here.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-700 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-white">Game Title</th>
              <th className="py-2 px-4 text-left text-white">Rating</th>
              <th className="py-2 px-4 text-left text-white">Published Year</th>
              <th className="py-2 px-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t border-gray-600">
                <td className="py-2 px-4 text-white">{review.gameTitle}</td>
                <td className="py-2 px-4 text-white">{review.rating} / 5</td>
                <td className="py-2 px-4 text-white">{review.publishYear}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleUpdateClick(review._id)}
                    className="mr-2 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(review._id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;
