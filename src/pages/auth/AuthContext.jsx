import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

export function AuthContextProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')) || {});
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  function logOut() {
    debugger;
    window.localStorage.removeItem('auth');
    setAuth({});
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      { children }
    </AuthContext.Provider>
  )
}
