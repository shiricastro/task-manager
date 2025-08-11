import { createContext, useContext, useMemo, useState } from "react";

const DropdownContext = createContext(null);

const DropdownProvider = ({ children }) => {
  const [openId, setOpenId] = useState(null); 
  const value = useMemo(() => ({ openId, setOpenId }), [openId]);
  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

const useDropdowns = () => useContext(DropdownContext);

export { DropdownProvider, useDropdowns };