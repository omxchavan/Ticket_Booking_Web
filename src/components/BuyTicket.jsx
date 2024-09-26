import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BuyTicket.css'; // Import custom CSS for additional styling
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
const BuyTicket = () => {
  const { id } = useParams(); // Get the museum ID from the URL
  const [ticketCount, setTicketCount] = useState(1);
  const [museum, setMuseum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMuseum = async () => {
      try {
        // Simulated API call for fetching museum details
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({
            id: 1,
            name: "National Museum",
            image: "/museum.jpg",
          }), 500)
        );
        setMuseum(response);
      } catch (err) {
        setError('Failed to load museum details.');
      }
    };
    fetchMuseum();
  }, [id]);
  let cashfree;
  let initializeSDK = async function name(params) {
    cashfree = await load({
      mode: "sandbox",
    })
  }
  initializeSDK();
  const [orderId, setOrderId] = useState("")
  const getSessionId = async () => {
    try {
      let res = await axios.get("http://localhost:5001/payment")
      if(res.data && res.data.payment_session_id){
        console.log(res.data)
        setOrderId(res.data.order_id)
        return res.data.payment_session_id
      }
    } catch (error) {
      console.log(error)
    }
  }
  const verifyPayment = async () => {
    try {
      let res = await axios.post("http://locahost:5000/verify",{
        orderId: orderId
      })
      if(res && res.data){
        alert("Payment Verified!")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handlePurchase = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Simulated payment gateway integration
      // Replace this with actual payment integration code
      alert('Payment processing...');
      // Logic to handle the payment will go here
      let sessionId= await getSessionId()
      let checkoutOptions = {
        paymentSessionId : sessionId,
        
      }
      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initiated!")
        verifyPayment(orderId)
      })
    } catch (err) {
      setError('Failed to process the payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Buy Ticket for {museum?.name || 'Loading...'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {museum && (
        <Card className="mb-4">
          <Card.Img variant="top" src={museum.image} alt={museum.name} className="museum-image" />
          <Card.Body>
            <Card.Title>{museum.name}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date().toLocaleDateString()}<br />
              <strong>Time:</strong> {new Date().toLocaleTimeString()}
            </Card.Text>
            <Form onSubmit={handlePurchase} className="buy-ticket-form">
              <Form.Group className="mb-3" controlId="formTicketCount">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Control
                  type="number"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(e.target.value)}
                  min="1"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : `Pay ₹${ticketCount * 500}`}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
export default BuyTicket;
