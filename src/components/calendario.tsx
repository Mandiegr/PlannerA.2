import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventApi, EventInput, EventChangeArg } from '@fullcalendar/core';
import { Button, Model } from './styles-callendar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, firebaseConfig } from '@/config/firebaseConfig';
import { useQuery } from 'react-query';

import moment from 'moment';

interface MyCalendarProps {
  handleEventNotification: (eventNotification: any) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ handleEventNotification }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', start: '', end: '' });

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const buscarEventos = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const eventosRef = collection(db, 'eventos');
        const queryRef = query(eventosRef, where('ownerId', '==', userId));
        const querySnapshot = await getDocs(queryRef);
        const eventosBuscados = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setEvents(eventosBuscados);
      }
    };
    buscarEventos();
  }, [auth.currentUser, db]);

  const { isLoading, error, data } = useQuery('events', async () => {
    const eventosProximos = events.filter(event => {
      const timeToEventStart = moment(event.start).diff(moment(), 'minutes');
      return timeToEventStart <= 60; //
    });
    return eventosProximos;
  });

  const handleDateSelect = (arg: DateSelectArg) => {
    setFormData({
      title: '',
      start: arg.startStr,
      end: arg.endStr || arg.startStr,
    });
    setShowForm(true);
  };

  const handleEventClick = async (info: EventClickArg) => {
    if (window.confirm(`Deseja excluir o evento '${info.event.title}'?`)) {
      const eventId = info.event.id;
      try {
        await deleteDoc(doc(db, 'eventos', eventId));
      } catch (error) {
        console.error('Erro ao excluir evento no Firestore:', error);
        alert('Erro ao excluir evento. Tente novamente.');
        return;
      }
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const eventToRemove = calendarApi.getEventById(eventId);
        if (eventToRemove) {
          eventToRemove.remove();
        }
      }
    }
  };

  const handleEventUpdate = (updatedEvent: EventApi) => {
    console.log('Evento atualizado:', updatedEvent);
  };

  const handleSubmit = async () => {
    const { title, start, end } = formData;
    if (title && start && end) {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      const newEvent = {
        title,
        start: moment(start).format('YYYY-MM-DDTHH:mm:ss'),
        end: moment(end).format('YYYY-MM-DDTHH:mm:ss'),
        allDay: false,
        createdAt: serverTimestamp(),
        ownerId: userId,
      };
      try {
        const eventosRef = collection(db, 'eventos');
        await addDoc(eventosRef, newEvent);
        if (calendarRef.current) {
          calendarRef.current.getApi().addEvent(newEvent);
        }
        setShowForm(false);
        handleEventNotification(newEvent);
      } catch (error) {
        console.error('Erro ao salvar evento:', error);
        alert('Erro ao salvar evento. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos do formulário.');
    }
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        aspectRatio={1.8}
        height="500px"
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        events={events}
        eventChange={(arg: EventChangeArg) => handleEventUpdate(arg.event)}
      />
      {showForm && (
        <Model>
          <input
            type="text"
            placeholder="Digite o título do evento"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="datetime-local"
            value={formData.start}
            onChange={e => setFormData({ ...formData, start: e.target.value })}
          />
          <input
            type="datetime-local"
            value={formData.end}
            onChange={e => setFormData({ ...formData, end: e.target.value })}
          />
          <Button onClick={handleSubmit}>Criar Evento</Button>
        </Model>
      )}
    </div>
  );
};

export default MyCalendar;
