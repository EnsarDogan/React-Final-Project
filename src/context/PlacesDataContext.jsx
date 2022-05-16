import { useState, createContext } from "react";

export const PlacesDataContext = createContext();

export const PlacesDataProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  return (
    <PlacesDataContext.Provider value={{ places, setPlaces }}>
      {children}
    </PlacesDataContext.Provider>
  );
};
