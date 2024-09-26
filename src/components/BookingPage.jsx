import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const BookingPage = () => {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    // Here, we can call the booking API and handle the response.
  };

  return (
    <div className="container mt-5">
      <h2>Book Tickets for Museum ID: {id}</h2>
      <Form onSubmit={handleBooking}>
        <Form.Group controlId="ticketCount">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control 
            type="number" 
            value={ticketCount} 
            onChange={(e) => setTicketCount(e.target.value)} 
            min="1" 
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">Book Now</Button>
      </Form>

      {showConfirmation && (
        <Alert variant="success" className="mt-4">
          Successfully booked {ticketCount} ticket(s) for museum ID: {id}.
        </Alert>
      )}
    </div>
  );
}

export default BookingPage;
