import React, { useState, useEffect } from 'react';
import backgrounds from '../data/backgrounds.json';

const Background = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const randNum = Math.floor(Math.random() * 10);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="h-full bg-blue-950">
      <div className={`absolute inset-0 bg-cover bg-center duration-500 ease-in-out ${ backgrounds[`${randNum}`].hue}`}
        style={{ backgroundImage: isLoaded ? `url(/${backgrounds[`${randNum}`].background})` : 'none' }}>
      </div>

      <div className="absolute inset-0 bg-cover bg-center bg-gradient-to-b from-transparent to-blue-950"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;