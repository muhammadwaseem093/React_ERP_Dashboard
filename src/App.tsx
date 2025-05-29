import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import useSessionTimeout from './hooks/useSessionTimeout';

const App:React.FC = () => {
  const logoutCallback = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; // Redirect to login page
  };

  useSessionTimeout({ logoutCallback, timeoutMinutes: 15 });

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
