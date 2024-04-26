import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, firebaseConfig } from '@/config/firebaseConfig';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventApi, EventInput, EventChangeArg } from '@fullcalendar/core';
import { Button, CallendarContainer, Model } from './styles-callendar';
import { useQuery } from 'react-query';
import moment from 'moment';

interface MyCalendarProps {
  handleEventNotification: (eventNotification: any) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ handleEventNotification }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

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
      const eventStartDate = moment(event.start);
      const daysUntilEventStart = eventStartDate.diff(moment(), 'days');
      return daysUntilEventStart >= 0 && daysUntilEventStart <= 7;
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

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event.toPlainObject());
    setShowEditForm(true);
  };

  const handleEventUpdate = async (updatedEvent: EventApi) => {
    if (updatedEvent.extendedProps.edited === false) {
      handleEventNotification(updatedEvent.toPlainObject());
    }
  };
  

  const handleSubmit = async () => {
    const { title, start, end } = formData;
    if (title && start && end) {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      const newEvent = {
        title,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(), 
        allDay: false,
        createdAt: serverTimestamp(),
        ownerId: userId,
        edited: false, 
      };
      try {
        const eventosRef = collection(db, 'eventos');
        const docRef = await addDoc(eventosRef, newEvent);
        const addedEvent = { ...newEvent, id: docRef.id }; 
        setEvents(prevEvents => [...prevEvents, addedEvent]); 
        setShowForm(false);
        handleEventNotification(addedEvent);
      } catch (error) {
        console.error('Erro ao salvar evento:', error);
        alert('Erro ao salvar evento. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos do formulário.');
    }
  };
  
  const handleEditSubmit = async () => {
    const { title, start, end } = formData;
    if (title && start && end && selectedEvent && selectedEvent.id) {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      const updatedEvent = {
        ...selectedEvent,
        title,
        start: new Date(start).toISOString(), 
        end: new Date(end).toISOString(),
        ownerId: userId,
         edited: true,
      };
      try {
        await updateDoc(doc(db, 'eventos', selectedEvent.id), updatedEvent);
        setEvents(prevEvents => {
          const updatedEvents = prevEvents.map(event =>
            event.id === selectedEvent.id ? updatedEvent : event
          );
          return updatedEvents;
        });
        setShowEditForm(false);
        //handleEventNotification(updatedEvent);
      } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        alert('Erro ao atualizar evento. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos do formulário.');
    }
  };

  const handleDelete = async () => {
    if (selectedEvent && selectedEvent.id) {
      if (window.confirm(`Deseja excluir o evento '${selectedEvent.title}'?`)) {
        try {
          await deleteDoc(doc(db, 'eventos', selectedEvent.id));
          setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const eventToRemove = calendarApi.getEventById(selectedEvent.id);
            if (eventToRemove) {
              eventToRemove.remove();
            }
          }
          setShowEditForm(false);
          handleEventNotification(null);
        } catch (error) {
          console.error('Erro ao excluir evento:', error);
          alert('Erro ao excluir evento. Tente novamente.');
        }
      }
    } else {
      console.error('ID do evento não está disponível');
    }
  };
  
  

  return (
    <CallendarContainer>
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
      {showEditForm && (
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
          <div>
            <Button onClick={handleDelete}>Excluir Evento</Button>
            <Button onClick={handleEditSubmit}>Editar Evento</Button>
          </div>
        
        </Model>
      )}
    </CallendarContainer>
  );
};

export default MyCalendar;
