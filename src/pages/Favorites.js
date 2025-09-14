import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../configuration/firebase';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { AiFillHeart } from 'react-icons/ai';

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      const q = query(
        collection(firestore, 'favorites'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const eventIds = querySnapshot.docs.map(doc => doc.data().eventId);

      const events = [];
      for (const eventId of eventIds) {
        const eventDoc = await getDoc(doc(firestore, 'events', eventId));
        if (eventDoc.exists()) {
          events.push({ id: eventDoc.id, ...eventDoc.data() });
        }
      }
      setFavoriteEvents(events);
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  const handleDoubleClick = (id) => {
    navigate(`/events/${id}`);
  };

  const removeFavorite = async (eventId) => {
    const q = query(
      collection(firestore, 'favorites'),
      where('userId', '==', auth.currentUser.uid),
      where('eventId', '==', eventId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setFavoriteEvents(favoriteEvents.filter(event => event.id !== eventId));
  };

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

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Please sign in to view your favorites.</p>
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
        YOUR <span style={{ color: '#415a77' }}>FAVORITES</span>
      </h1>
      {favoriteEvents.length === 0 ? (
        <p className="text-center text-white">No favorites yet.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-4 border-[#778da9] cursor-pointer relative"
              onDoubleClick={() => handleDoubleClick(event.id)}
            >
              <img
                src={getImageSrc(event.image)}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(event.id);
                }}
                className="absolute top-2 right-2 text-red-500 text-2xl hover:text-red-700 transition"
              >
                <AiFillHeart />
              </button>
              <div className="p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/register/${event.id}`);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition mb-2"
                >
                  Register Now
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(event.id);
                  }}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
