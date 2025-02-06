import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from "../firebase/componnets/Mainlayouts";
import Home from "../firebase/componnets/Home";
import Login from "../firebase/componnets/Login"; 
import Register from "../firebase/componnets/Register"; 
import AddReview from "../firebase/componnets/AddReview";
import ReviewDetails from "../firebase/componnets/ReviewDetails";
import AllReviews from "../firebase/componnets/AllReviews";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyReviews from "../firebase/componnets/MyReviews";
import UpdateReview from "../firebase/componnets/UpdateReview";
import GameWatchlist from "../firebase/componnets/GameWatchlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayouts />,
    children: [
      {
        path: '/',
        element: <Home />, // Home component for the default route
      },
      {
        path: '/login',
        element: <Login />, // Login page route
      },
      {
        path: '/register',
        element: <Register />, // Register page route
      },
      {
        path: '/add-review',  // New route for AddReview
        element: <AddReview />,
      },
      {
        path: '/review/:id',  // New dynamic route for review details page
        element: <ReviewDetails />,
      },
      {
        path: '/reviews',  // New route for AllReviews
        element: <AllReviews />,
      },
      {
        path: '/my-reviews',
        element: <PrivateRoute element={<MyReviews />} />,
      },
      {
        path: '/myWatchlist',  // Private route for Game Watchlist
        element: <PrivateRoute element={<GameWatchlist />} />,  // Protected Game Watchlist page
      },
      {
        path: '/updateReview/:id',  // Route for updating a review
        element: <UpdateReview />,  // Add UpdateReview component
      }
      
    ]
  }
]);

export default router;
