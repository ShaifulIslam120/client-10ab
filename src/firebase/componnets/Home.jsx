import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel component from React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AllReviews from './AllReviews'; // Import AllReviews component

const Home = () => {
  const [topReviews, setTopReviews] = useState([]); // State to store top reviews
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Effect to apply the dark theme class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Add dark mode class
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark mode class
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  return (
    <div>
      {/* Theme Toggle Button */}
      <button cla
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-20"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Banner/Slider */}
      <section className="mb-8 mt-16">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co/5gKLd9QL/maxresdefault-1.jpg"
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h3>Discover New Games</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co/rRcBR8Pr/maxresdefault.jpg"
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h3>Top Rated Games</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co/1Yy72832/Vol08-Speed-Pass-Premium-3840x2160.jpg"
              alt="Slide 3"
            />
            <Carousel.Caption>
              <h3>Game of the Year</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Top Reviews Section */}
      {/* All Reviews Component to fetch reviews */}
      <AllReviews setTopReviews={setTopReviews} />
    </div>
  );
};

export default Home;
