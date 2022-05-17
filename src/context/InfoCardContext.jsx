import { useState, createContext } from "react";

export const InfoCardContext = createContext();

export const InfoCardProvider = ({ children }) => {
  const [infoCardClicked, setInfoCardClicked] = useState(null);
  return (
    <InfoCardContext.Provider value={{ infoCardClicked, setInfoCardClicked }}>
      {children}
    </InfoCardContext.Provider>
  );
};
