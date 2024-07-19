import React, { useState } from 'react';
import MyContext from './PlayerContext';

const MyProvider = ({ children }) => {
  const [participantsInfo, setParticipantsInfo] = useState(null);


  return (
    <MyContext.Provider value={{ participantsInfo, setParticipantsInfo }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;