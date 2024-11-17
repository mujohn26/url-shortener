// src/App.tsx
import React from 'react';
import UserInputPage from './pages/UserInputPage';
import { UrlProvider } from './context/urlContext';

const App: React.FC = () => {


  return (
    <UrlProvider>
      <UserInputPage />;
    </UrlProvider>
  );
};

export default App;
