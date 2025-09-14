import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../configuration/firebase';
import { firestore } from '../configuration/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);
  const [event, setEvent] = useState(null);

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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(firestore, 'events', id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!userEmail || !event) {
        setLoading(false);
        return;
      }
      const q = query(
        collection(firestore, "registrations"),
        where("email", "==", userEmail),
        where("eventId", "==", event.id)
      );
      const querySnapshot = await getDocs(q);
      setIsRegistered(!querySnapshot.empty);
      setLoading(false);
    };
    checkRegistration();
  }, [userEmail, event]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Event not found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const handleRegisterClick = () => {
    if (!userEmail) {
      setShowSignInModal(true);
      return;
    }
    if (isRegistered) {
      setShowAlreadyRegisteredModal(true);
    } else {
      navigate(`/register/${id}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0d1b2a] text-white p-4 md:p-6 relative flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate('/events')}
          className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-[#778da9] transition-colors duration-300"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="md:w-1/2 flex items-center">
          <img
            src={getImageSrc(event.image)}
            alt={event.title}
            className="rounded-lg shadow-lg object-cover w-full max-h-[400px]"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold text-[#415a77]">{event.title}</h1>
          <p className="text-lg text-[#e0e1dd]">Date: {event.date}</p>
          <p className="text-base text-[#e0e1dd]">{event.description}</p>
          <div className="flex justify-center">
            <button
              onClick={handleRegisterClick}
              className={`font-semibold py-3 px-6 rounded-md w-max transition-colors duration-300 ${
                isRegistered
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-[#415a77] hover:bg-[#778da9] text-[#e0e1dd]"
              }`}
              disabled={isRegistered}
            >
              {isRegistered ? "Registered" : "Register"}
            </button>
          </div>
        </div>
      </div>

      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2a] bg-opacity-90 backdrop-blur-md p-4">
          <div className="bg-[#415a77] rounded-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-4 border border-[#778da9] shadow-2xl transform scale-100 transition-transform duration-300 w-full">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#778da9] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e0e1dd]">Sign In Required</h2>
            </div>
            <p className="mb-6 sm:mb-8 md:mb-10 text-[#e0e1dd] leading-relaxed text-sm sm:text-base md:text-lg">
              You must be signed in to register for an event.
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowSignInModal(false)}
                className="px-6 sm:px-8 py-3 bg-[#778da9] text-[#e0e1dd] rounded-xl hover:bg-[#415a77] transition-all duration-300 font-semibold shadow-md w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignInModal(false);
                  navigate('/signin');
                }}
                className="px-6 sm:px-8 py-3 bg-[#415a77] text-[#e0e1dd] rounded-xl hover:bg-[#778da9] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlreadyRegisteredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2a] bg-opacity-90 backdrop-blur-md p-4">
          <div className="bg-[#415a77] rounded-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-4 border border-[#778da9] shadow-2xl transform scale-100 transition-transform duration-300 w-full">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#778da9] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e0e1dd]">Already Registered</h2>
            </div>
            <p className="mb-6 sm:mb-8 md:mb-10 text-[#e0e1dd] leading-relaxed text-sm sm:text-base md:text-lg">
              You have already registered for this event.
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowAlreadyRegisteredModal(false)}
                className="px-6 sm:px-8 py-3 bg-[#778da9] text-[#e0e1dd] rounded-xl hover:bg-[#415a77] transition-all duration-300 font-semibold shadow-md w-full sm:w-auto"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
