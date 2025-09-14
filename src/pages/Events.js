import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../configuration/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'events'), (snapshot) => {
      const evts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(evts);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching events:', error);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDoubleClick = (id) => {
    navigate(`/events/${id}`);
  };

  // Map image filename to actual import
  const getImageSrc = (imageName) => {
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
    return imageMap[imageName];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-[#778da9] transition-colors duration-300"
        aria-label="Close and go to Home"
      >
        &times;
      </button>
      <h1 className="text-4xl font-extrabold text-center text-white mb-12">
        OUR <span style={{ color: '#415a77' }}>GALLERY</span>
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-4 border-[#778da9] cursor-pointer"
            onDoubleClick={() => handleDoubleClick(event.id)}
          >
            <img
              src={getImageSrc(event.image)}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
