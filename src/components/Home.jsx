import { Carousel } from 'react-bootstrap';
import '../css/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="mb-4 home-title">Welcome to the Indian Museum Ticket Booking System</h1>
      <p className="lead home-subtitle">Explore India's best museums and book your tickets online!</p>

      {/* Bootstrap Carousel */}
      <Carousel className="home-carousel" interval={3000} fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/museum.jpg"
            alt="National Museum, Delhi"
          />
          <div className="carousel-info-box">
            <h3 className="carousel-caption-title">National Museum, Delhi</h3>
            <p className="carousel-caption-text">Discover India's rich history and heritage.</p>
            <a href="/museums/1" className="btn view-info-btn">View Info</a>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/museum2.jpg"
            alt="Indian Museum, Kolkata"
          />
          <div className="carousel-info-box">
            <h3 className="carousel-caption-title">Indian Museum, Kolkata</h3>
            <p className="carousel-caption-text">Explore one of the oldest museums in the world.</p>
            <a href="/museums/2" className="btn view-info-btn">View Info</a>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/museum.jpg"
            alt="Chhatrapati Shivaji Maharaj Museum, Mumbai"
          />
          <div className="carousel-info-box">
            <h3 className="carousel-caption-title">Chhatrapati Shivaji Maharaj Museum, Mumbai</h3>
            <p className="carousel-caption-text">Experience the art and culture of India.</p>
            <a href="/museums/3" className="btn view-info-btn">View Info</a>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
