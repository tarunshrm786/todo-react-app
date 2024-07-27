import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/todos" />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/todos" element={<PrivateRoute element={<TodoList />} />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </Router>
  );
};

export default App;
