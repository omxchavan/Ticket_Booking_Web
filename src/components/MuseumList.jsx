import { useState, useEffect } from 'react';
import { Form, Button, Spinner, Card, Row, Col } from 'react-bootstrap';
import '../css/MuseumList.css'; // Import the scoped CSS file

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [sortType, setSortType] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMuseums = async () => {
      setLoading(true);
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
          { id: 1, name: "National Museum", city: "Delhi", image: "/museum.jpg" },
          { id: 2, name: "Indian Museum", city: "Kolkata", image: "/museum.jpg" },
          { id: 3, name: "Chhatrapati Shivaji Maharaj Museum", city: "Mumbai", image: "/museum2.jpg" },
        ]), 500)
      );
      setMuseums(response);
      setLoading(false);
    };

    fetchMuseums();
  }, []);

  const filteredMuseums = museums.filter((museum) => {
    const matchesSearch = museum.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity ? museum.city === filterCity : true;
    return matchesSearch && matchesCity;
  });

  const sortedMuseums = [...filteredMuseums].sort((a, b) => {
    if (sortType === 'name') return a.name.localeCompare(b.name);
    if (sortType === 'city') return a.city.localeCompare(b.city);
    return 0;
  });

  return (
    <div className="museum-list container mt-5">
      <h2 className="mb-4 text-center">Museums in India</h2>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search for a museum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="museum-search-input"
          />
        </Form.Group>
      </Form>

      {/* Filters and Sorting */}
      <Form className="mb-4 d-flex flex-column flex-md-row justify-content-between">
        <Form.Group controlId="cityFilter" className="flex-grow-1 mb-2 mb-md-0 me-md-2">
          <Form.Control
            as="select"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="">Filter by City</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Mumbai">Mumbai</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="sortType" className="flex-grow-1">
          <Form.Control
            as="select"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="city">Sort by City</option>
          </Form.Control>
        </Form.Group>
      </Form>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {sortedMuseums.length ? (
            sortedMuseums.map((museum) => (
              <Col xs={12} sm={6} md={4} lg={3} key={museum.id} className="mb-4">
                <Card className="h-100 museum-card">
                  <Card.Img
                    variant="top"
                    src={museum.image}
                    alt={museum.name}
                    className="museum-image"
                  />
                  <Card.Body>
                    <Card.Title>{museum.name}</Card.Title>
                    <Card.Text>{museum.city}</Card.Text>
                    <Button variant="success" href={`/museums/${museum.id}/buy`} className="w-100">
                      Buy Ticket
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No museums found matching your search.</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default MuseumList;
