import React from 'react';
import { useLocation } from 'react-router-dom';
import ArrowUp from '../assets/up_arrow.png';

const hideArrow = [
  '/generation',
  '/upload'
];

const UpArrow = () => {
  const location = useLocation();

  const shouldHideArrow = hideArrow.includes(location.pathname);

  if (shouldHideArrow) {
    return null;
  }
  
  return (
    <div>
      
        <div className="relative">
          <div className="group fixed bottom-5 right-5 z-50 cursor-pointer">
            {/* Arrow Icon */}
            <img
              src={ArrowUp}
              alt="arrow-up"
              className="w-16 h-16 transform transition-transform duration-300 group-hover:-translate-y-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-8 text-white text-sm px-8 py-1  opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-32 rounded-full border-2 border-black bg-black">
              Go to top
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default UpArrow;
