import React from 'react';
import { MdEmail, MdPhotoCamera, MdMusicNote, MdDirectionsCar, MdLocationOn, MdRestaurant } from 'react-icons/md';

const services = [
  {
    icon: <MdEmail size={40} className="text-blue-600" />,
    title: 'Invitation Card Design',
    description: 'Custom-Designed Invitations That Reflect Your Event’s Theme And Personality, With Premium Printing Options.',
  },
  {
    icon: <MdPhotoCamera size={40} className="text-blue-600" />,
    title: 'Photos And Videos',
    description: 'Professional Photography And Videography Services To Capture Every Special Moment Of Your Event.',
  },
  {
    icon: <MdMusicNote size={40} className="text-blue-600" />,
    title: 'Entertainment',
    description: 'Live Bands, DJs, Performers, And Complete Sound Systems Tailored To Your Event’s Atmosphere.',
  },
  {
    icon: <MdDirectionsCar size={40} className="text-blue-600" />,
    title: 'Event Vehicles',
    description: 'Luxury Transportation Services Including Limousines, Vintage Cars, And Shuttle Services For Guests.',
  },
  {
    icon: <MdLocationOn size={40} className="text-blue-600" />,
    title: 'Venue Selection',
    description: 'Expert Guidance in Selecting The Perfect Venue From Our Extensive Network Of Premium Locations.',
  },
  {
    icon: <MdRestaurant size={40} className="text-blue-600" />,
    title: 'Food Catering',
    description: 'Gourmet Catering Services With Customizable Menus To Suit All Dietary Requirements And Preferences.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-12 bg-gray-900 text-white px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        OUR <span className="text-blue-600">SERVICES</span>
      </h2>
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
