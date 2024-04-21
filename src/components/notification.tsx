import React from 'react';
import { EventInput } from '@fullcalendar/core';

interface NotificationToastProps {
  events?: EventInput[]; 
  onClose: () => void;
  message?: string; 
}

const NotificationToast: React.FC<NotificationToastProps> = ({ events, message }) => {

  if (events && events.length > 0) {
    return (
      <div>
        <ul  style={{ listStyleType: 'none', padding: 0 }}>
          {events.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <p>{message || 'Não há eventos próximos'}</p>
      </div>
    );
  }
};

export default NotificationToast;
