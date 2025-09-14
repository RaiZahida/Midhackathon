import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../configuration/firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedEvent: event ? event.title : "",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

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
    if (event) {
      setFormData((prev) => ({ ...prev, selectedEvent: event.title }));
      checkRegistration();
    }
  }, [event]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const checkRegistration = async () => {
    if (!event) {
      setLoading(false);
      return;
    }
    if (!formData.email) {
      setLoading(false);
      return;
    }
    const q = query(
      collection(firestore, "registrations"),
      where("email", "==", formData.email),
      where("eventId", "==", event.id)
    );
    const querySnapshot = await getDocs(q);
    setIsRegistered(!querySnapshot.empty);
    setLoading(false);
  };

  const validateForm = () => {
    const { name, email, phone } = formData;
    if (!name.trim()) {
      alert("Name is required");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Valid email is required");
      return false;
    }
    if (!phone.trim() || !/^\+?\d{7,15}$/.test(phone)) {
      alert("Valid phone number is required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addDoc(collection(firestore, "registrations"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventId: event.id,
        eventTitle: event.title,
        registeredAt: new Date(),
      });
      setSuccessMessage(`Registered for ${formData.selectedEvent}!`);
      setIsRegistered(true);
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 5000);
    } catch (error) {
      alert("Error registering: " + error.message);
    }
  };

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 font-poppins">
      <div className="relative w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white text-4xl hover:text-gray-400 transition"
          aria-label="Close and go back"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Register for Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 text-left">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
              required
              disabled={isRegistered}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 text-left">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Email"
              required
              disabled={isRegistered}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 text-left">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Phone Number"
              required
              disabled={isRegistered}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 text-left">Selected Event</label>
            <input
              type="text"
              name="selectedEvent"
              value={formData.selectedEvent}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-600 text-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isRegistered}
              className={`flex-1 py-2 px-4 rounded-lg transition ${
                isRegistered
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isRegistered ? "Registered" : "Register Now"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="flex-1 py-2 px-4 bg-[#415a77] text-[#e0e1dd] rounded-lg hover:bg-[#778da9] transition"
            >
              View Events
            </button>
          </div>
        </form>
      </div>

      {/* Success modal */}
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2a] bg-opacity-90 backdrop-blur-md p-4">
          <div className="bg-[#778da9] rounded-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-4 border border-[#415a77] shadow-2xl transform scale-100 transition-transform duration-300 w-full relative">
            <button
              onClick={() => {
                setSuccessMessage('');
                navigate('/');
              }}
              className="absolute top-4 right-4 text-[#e0e1dd] text-2xl font-bold hover:text-[#415a77] transition-colors duration-300"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#415a77] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e0e1dd]">Registration Successful</h2>
            </div>
            <p className="text-[#e0e1dd] leading-relaxed text-sm sm:text-base md:text-lg">
              {successMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
