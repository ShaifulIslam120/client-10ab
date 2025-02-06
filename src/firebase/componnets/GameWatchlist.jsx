import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const GameWatchlist = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(`http://localhost:3000/myWatchlist/${currentUser.email}`);

        if (!response.ok) {
          throw new Error('Failed to fetch watchlist');
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (err) {
        setError('Error fetching watchlist');
      }
    };

    fetchWatchlist();
  }, [currentUser]);

  if (!currentUser) {
    return <div className="text-center text-red-500">Please log in to view your watchlist.</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">Your Game Watchlist</h2>
      {watchlist.length === 0 ? (
        <div className="text-center text-gray-300">Your watchlist is empty.</div>
      ) : (
        <table className="min-w-full bg-gray-700 border border-gray-600 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-600 text-yellow-300">
              <th className="py-3 px-6 text-left">Game Title</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Genre</th>
              <th className="py-3 px-6 text-left">Published Year</th>
              <th className="py-3 px-6 text-left">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((item) => (
              <tr key={item._id} className="border-b border-gray-600 hover:bg-gray-800 transition">
                <td className="py-3 px-6">{item.gameTitle || 'Unknown'}</td>
                <td className="py-3 px-6">{item.rating || 'N/A'}</td>
                <td className="py-3 px-6">{item.genres ? item.genres.join(', ') : 'N/A'}</td>
                <td className="py-3 px-6">{item.publishYear || 'N/A'}</td>
                <td className="py-3 px-6">{item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameWatchlist;
