import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import pic1 from '../images/pic1.png';
import pic2 from '../images/pic2.png';
import pic3 from '../images/pic3.png';
import pic4 from '../images/pic4.png';
import pic5 from '../images/pic5.png';

const images = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
];

const HeroSection = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white py-16 px-4" style={{ backgroundColor: '#415a77' }}>
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          WHERE YOUR IDEAS TAKE OFF
        </h2>
        <h3 className="text-4xl sm:text-5xl font-extrabold">
          <span style={{ color: '#0d1b2a' }}>Z </span>
          <span style={{ color: '#e0e1dd' }}>EVENTS</span>
        </h3>
        <button
          className="bg-[#0d1b2a] hover:bg-[#778da9] text-[#e0e1dd] font-bold py-3 px-6 rounded-md transition-colors duration-300 mt-6"
          onClick={() => {
            navigate('/events');
          }}
        >
          View Events
        </button>
      </div>

      <div className="relative mx-auto overflow-hidden" style={{ height: '450px', maxWidth: '1100px' }}>
        <div
          className="flex absolute top-0 left-0"
          style={{
            animation: 'scrollRight 15s linear infinite',
          }}
        >
          {images.concat(images).map((img, index) => {
            const realIndex = index % images.length;
            const isCenter = realIndex === centerIndex;
            return (
              <img
                key={index}
                src={img}
                alt={`Slide ${realIndex + 1}`}
                style={{
                  width: '210px',
                  height: isCenter ? '450px' : '380px',
                  marginRight: '15px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: isCenter ? '0 8px 16px rgba(0,0,0,0.5)' : '0 4px 8px rgba(0,0,0,0.3)',
                  transition: 'height 0.5s ease, box-shadow 0.5s ease',
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
