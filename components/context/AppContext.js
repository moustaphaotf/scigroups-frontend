import { createContext, useState } from 'react';
export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return(
    <AppContext.Provider>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
