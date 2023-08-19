import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { useNavigate } from 'react-router-dom';

const AddContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access the navigate function

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('active');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ firstName, lastName, status }));
    setFirstName('');
    setLastName('');
    setStatus('active');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/contacts'); // Use navigate to redirect
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add Your Details to Add Contact
        </h2>
        <div className="mb-2">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="flex mb-4">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
              className="mr-1"
                          />
            Active
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="inactive"
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
              className="mr-1"
              
            />
            Inactive
          </label>
        </div>
        <button
          type="submit"
          className="text-white rounded px-4 py-2 w-full"
          style={{ backgroundColor: '#3490dc' }}
        >
          Add Contact
        </button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            Contact added successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContactForm;
