import React from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel component from React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => {
  return (
    <div>
      {/* Banner/Slider */}
      <section className="mb-8 mt-16">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co.com/5gKLd9QL/maxresdefault-1.jpg"
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h3>Discover New Games</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co.com/rRcBR8Pr/maxresdefault.jpg"
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h3>Top Rated Games</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              src="https://i.ibb.co.com/1Yy72832/Vol08-Speed-Pass-Premium-3840x2160.jpg"
              alt="Slide 3"
            />
            <Carousel.Caption>
              <h3>Game of the Year</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
