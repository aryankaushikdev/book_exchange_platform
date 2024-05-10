import React, { useState } from 'react';

const PaymentGateway = ({ removeAllItemsfromCart , onPaymentSuccess}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Perform payment processing logic here
    // After successful payment processing
    onPaymentSuccess();
   // Wrap removeAllItemsfromCart in a Promise and await it
    handleCartRemoval();
  };

  const handleCartRemoval = async () => {
    try {
      setSubmitted(true);
      // Call removeAllItemsfromCart and update cartCleared state
      await removeAllItemsfromCart();
      setSubmitted(true);
    } catch (error) {
      console.error('Error while clearing cart:', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="payment-container" style={{ width: '900px', marginRight: '10px' }}>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            required
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YYYY"
            required
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Enter CVV"
            required
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <label htmlFor="name">Name on Card:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
      {submitted && <p>Payment submitted successfully!</p>}
    </div>
  );
};

export default PaymentGateway;
