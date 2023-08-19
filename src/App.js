import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ChartMapsPage from './components/ChartMapsPage';
import EditContactPage from './components/editContactPage'; // Correct the import name
import AddContactForm from './components/AddContactForm';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col md:flex-row"> {/* Use flex-col and md:flex-row for responsive layout */}
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/charts" element={<ChartMapsPage />} />
            <Route path="/contacts/:contactId/edit" element={<EditContactPage />} /> {/* Correct the route element */}
            <Route path="/add" element={<AddContactForm />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
