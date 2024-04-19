// NotificationToast.tsx
import React from 'react';
import { EventInput } from '@fullcalendar/core';

interface NotificationToastProps {
  events?: EventInput[]; // Tornando events opcional
}

const NotificationToast: React.FC<NotificationToastProps> = ({ events }) => {
  // Verifica se há eventos e renderiza a mensagem de notificação
  if (events && events.length > 0) {
    return (
      <div>
        <h2>Próximos Eventos:</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null; // Se não houver eventos, retorna null para não renderizar nada
  }
};

export default NotificationToast;
