import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostsContextProvider } from './context/PostContext';
import { AuthContextProvider } from './context/AuthContext';
import { CommunityContextProvider } from './context/CommunityContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <CommunityContextProvider>
          <App />
        </CommunityContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


