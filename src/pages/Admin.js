import React, { useState, useEffect } from 'react';
import { firestore } from '../configuration/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';

const Admin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('userDetails');

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventImage, setNewEventImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regsSnapshot = await getDocs(collection(firestore, 'registrations'));
        const regs = regsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegistrations(regs);

        const eventsSnapshot = await getDocs(collection(firestore, 'events'));
        let evts = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // If no events in Firestore, seed with hardcoded events
        if (evts.length === 0) {
          const hardcodedEvents = [
            { title: 'Wedding Celebration', date: '2024-07-15', description: 'A beautiful wedding celebration with friends and family.', image: 'pic1.png' },
            { title: 'Garden Ceremony', date: '2024-08-01', description: 'An elegant garden ceremony with floral decorations.', image: 'pic2.png' },
            { title: 'Birthday Party', date: '2024-09-10', description: 'A fun birthday party with cake and candles.', image: 'pic3.png' },
            { title: 'Corporate Event', date: '2024-10-05', description: 'A professional corporate event with networking.', image: 'pic4.png' },
            { title: 'City Lights Festival', date: '2024-11-20', description: 'A vibrant festival showcasing city lights and music.', image: 'pic5.png' },
            { title: 'Dance Night', date: '2024-12-15', description: 'An energetic dance night with live performances.', image: 'pic6.png' },
            { title: 'Bridal Photoshoot', date: '2025-01-10', description: 'A beautiful bridal photoshoot session.', image: 'pic7.png' },
            { title: 'Champagne Toast', date: '2025-02-14', description: 'A classy champagne toast event.', image: 'pic8.png' },
            { title: 'Concert Night', date: '2025-03-22', description: 'A lively concert with a great crowd.', image: 'pic9.png' },
          ];
          for (const event of hardcodedEvents) {
            await addDoc(collection(firestore, 'events'), event);
          }
          // Fetch again after seeding
          const newEventsSnapshot = await getDocs(collection(firestore, 'events'));
          evts = newEventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        setEvents(evts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupedByEvent = registrations.reduce((acc, reg) => {
    if (!acc[reg.eventTitle]) {
      acc[reg.eventTitle] = [];
    }
    acc[reg.eventTitle].push(reg);
    return acc;
  }, {});

  const handleAddEvent = async () => {
    if (!newEventTitle || !newEventDate || !newEventDescription || !newEventImage) {
      alert('Please fill all fields including image URL to add an event.');
      return;
    }
    try {
      await addDoc(collection(firestore, 'events'), {
        title: newEventTitle,
        date: newEventDate,
        description: newEventDescription,
        image: newEventImage,
      });
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventDescription('');
      setNewEventImage('');
      // Refresh events list
      const eventsSnapshot = await getDocs(collection(firestore, 'events'));
      const evts = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(evts);
      alert('Event added successfully.');
    } catch (error) {
      alert('Error adding event: ' + error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
      // Refresh events list
      const eventsSnapshot = await getDocs(collection(firestore, 'events'));
      const evts = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(evts);
      alert('Event deleted successfully.');
    } catch (error) {
      alert('Error deleting event: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1b2a] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-[#415a77] p-6 flex flex-col space-y-4">
        <div className="text-3xl font-bold mb-6 select-none">
          Z<span className="text-[#0d1b2a]">events</span>
        </div>
        <button
          className={`py-3 px-4 rounded-lg font-semibold text-left transition-colors duration-300 ${
            activeTab === 'userDetails' ? 'bg-[#778da9] text-[#e0e1dd]' : 'text-white hover:bg-[#778da9]'
          }`}
          onClick={() => setActiveTab('userDetails')}
        >
          See User Detail
        </button>
        <button
          className={`py-3 px-4 rounded-lg font-semibold text-left transition-colors duration-300 ${
            activeTab === 'addEvent' ? 'bg-[#778da9] text-[#e0e1dd]' : 'text-white hover:bg-[#778da9]'
          }`}
          onClick={() => setActiveTab('addEvent')}
        >
          Add Event
        </button>
        <button
          className={`py-3 px-4 rounded-lg font-semibold text-left transition-colors duration-300 ${
            activeTab === 'deleteEvent' ? 'bg-[#778da9] text-[#e0e1dd]' : 'text-white hover:bg-[#778da9]'
          }`}
          onClick={() => setActiveTab('deleteEvent')}
        >
          Delete Event
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          ✕
        </button>
        {activeTab === 'userDetails' && (
          <>
            <h1 className="text-4xl font-bold mb-6 text-center">User Registrations</h1>
            {Object.keys(groupedByEvent).length === 0 ? (
              <p className="text-center">No registrations yet.</p>
            ) : (
              Object.entries(groupedByEvent).map(([eventTitle, regs]) => (
                <div key={eventTitle} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{eventTitle}</h2>
                  {/* Mobile Cards */}
                  <div className="block md:hidden space-y-4">
                    {regs.map((reg) => (
                      <div key={reg.id} className="bg-[#1b263b] rounded-lg p-4 border border-[#415a77]">
                        <div className="mb-2">
                          <span className="font-semibold">Name:</span> {reg.name}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Email:</span> {reg.email}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Phone:</span> {reg.phone}
                        </div>
                        <div>
                          <span className="font-semibold">Registered At:</span> {reg.registeredAt?.toDate?.().toLocaleString() || 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full bg-[#1b263b] rounded-lg">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Phone</th>
                          <th className="px-4 py-2 text-left">Registered At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regs.map((reg) => (
                          <tr key={reg.id} className="border-t border-[#415a77]">
                            <td className="px-4 py-2">{reg.name}</td>
                            <td className="px-4 py-2">{reg.email}</td>
                            <td className="px-4 py-2">{reg.phone}</td>
                            <td className="px-4 py-2">{reg.registeredAt?.toDate?.().toLocaleString() || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'addEvent' && (
          <>
            <h1 className="text-4xl font-bold mb-6 text-center">Add New Event</h1>
            <div className="max-w-md space-y-4 mx-auto">
              <input
                type="text"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-[#e0e1dd] border border-[#415a77]"
              />
              <input
                type="date"
                placeholder="Event Date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-[#e0e1dd] border border-[#415a77]"
              />
              <textarea
                placeholder="Event Description"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-[#e0e1dd] border border-[#415a77]"
                rows={4}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newEventImage}
                onChange={(e) => setNewEventImage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-[#e0e1dd] border border-[#415a77]"
              />
              <button
                onClick={handleAddEvent}
                className="px-6 py-2 bg-[#415a77] text-[#e0e1dd] rounded-lg hover:bg-[#778da9] transition"
              >
                Add Event
              </button>
            </div>
          </>
        )}

        {activeTab === 'deleteEvent' && (
          <>
            <h1 className="text-4xl font-bold mb-6">Delete Events</h1>
            {events.length === 0 ? (
              <p>No events available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {events.map((event) => {
                  // Map image filename to actual import
                  const imageMap = {
                    'pic1.png': require('../images/pic1.png'),
                    'pic2.png': require('../images/pic2.png'),
                    'pic3.png': require('../images/pic3.png'),
                    'pic4.png': require('../images/pic4.png'),
                    'pic5.png': require('../images/pic5.png'),
                    'pic6.png': require('../images/pic6.png'),
                    'pic7.png': require('../images/pic7.png'),
                    'pic8.png': require('../images/pic8.png'),
                    'pic9.png': require('../images/pic9.png'),
                  };
                  const eventImage = imageMap[event.image];
                  return (
                    <div key={event.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-4 border-[#778da9] flex flex-col">
                      {eventImage && <img src={eventImage} alt={event.title} className="w-full h-48 object-cover" />}
                      <div className="p-4 text-white">
                        <h2 className="font-semibold text-lg mb-1">{event.title}</h2>
                        <p className="text-sm mb-4">{event.date}</p>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-[#415a77] px-4 py-1 rounded hover:bg-[#e0e1dd] hover:text-[#415a77] transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
