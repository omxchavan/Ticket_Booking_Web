import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import '../css/Navbar.css';
import { FaHome, FaUniversity, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  // Function to toggle navbar open/close state
  const handleToggle = () => setIsNavOpen(prevState => !prevState);

  // Function to close navbar explicitly
  const closeNavbar = () => setIsNavOpen(false);

  // Close navbar on route change
  useEffect(() => {
    closeNavbar(); // Close the navbar on navigation
  }, [location]);

  return (
    <BootstrapNavbar expand="lg" className="navbar custom-navbar" expanded={isNavOpen}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" onClick={closeNavbar} className="brand">
          <FaUniversity size={24} /> Museum Booking
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
          className={`toggle-btn ${isNavOpen ? 'open' : ''}`}
        >
          {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </BootstrapNavbar.Toggle>
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className={`collapse ${isNavOpen ? 'show' : ''}`}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={closeNavbar} className="nav-link">
              <FaHome size={20} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/museums" onClick={closeNavbar} className="nav-link">
              <FaUniversity size={20} /> Museums
            </Nav.Link>
            <Nav.Link as={Link} to="/PrivacyPolicy" onClick={closeNavbar} className="nav-link">
              <FaEnvelope size={20} /> Privacy Policy
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navigation;
