import React from 'react';
import formBg from '../images/formbg.jpeg';
import { FaMapMarkedAlt, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa';

const Form = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${formBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a192f] opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-2">Got a Question?</h2>
        <p className="text-base mb-12">We'd like to talk more about what you need</p>

        <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-xl shadow-lg p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-800">
          {/* Address */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-[#111827] text-white p-3 rounded-md shadow-md">
              <FaMapMarkedAlt className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Address</h3>
            <p className="text-sm text-gray-500">12124 First Street, nr 54</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-[#111827] text-white p-3 rounded-md shadow-md">
              <FaEnvelope className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-sm text-gray-500">hello@creative-tim.com</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-[#111827] text-white p-3 rounded-md shadow-md">
              <FaPhoneAlt className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Phone</h3>
            <p className="text-sm text-gray-500">+1 (424) 535-3523</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-[#111827] text-white p-3 rounded-md shadow-md">
              <FaUser className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Contact</h3>
            <p className="text-sm text-gray-500">Andrew Samian</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
