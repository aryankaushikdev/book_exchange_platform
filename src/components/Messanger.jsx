import React from 'react';
import whatsappIcon from '../../public/whatsapp-icon.png'; // Import the WhatsApp icon image

const Messenger = ({ phoneNumber }) => {
  // Create WhatsApp Web link
  const whatsappWebLink = `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  return (
    <a href={whatsappWebLink} target="_blank" rel="noopener noreferrer">
      <img src={whatsappIcon} alt="WhatsApp Icon" style={{ width: '80px', height: '80px', cursor: 'pointer' }} />
    </a>
  );
}

export default Messenger;
