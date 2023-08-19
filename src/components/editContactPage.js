import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateContact } from '../store/contactSlice';

const EditContactPage = () => {
  const { contactId } = useParams();
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contact = contacts.find((c) => c.id.toString() === contactId);

  const [firstName, setFirstName] = useState(contact ? contact.firstName : '');
  const [lastName, setLastName] = useState(contact ? contact.lastName : '');
  const [status, setStatus] = useState(contact ? contact.status : 'active');
  const [isEditingComplete, setIsEditingComplete] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contact) {
      return;
    }

    dispatch(updateContact({ id: contact.id, firstName, lastName, status }));
    setIsEditingComplete(true);

    setTimeout(() => {
      setIsEditingComplete(false);
      navigate('/contacts'); // Use navigate to redirect
    }, 2000); // Wait for 2 seconds and then redirect
  };

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Contact</h2>
        {isEditingComplete && (
          <div className="mb-4 text-center text-green-500">
            Contact edited successfully!
          </div>
        )}
        <div className="mb-2">
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex mb-4">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              value="active"
              checked={status === 'active'}
              onChange={handleStatusChange}
              className="mr-1"
            />
            Active
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="inactive"
              checked={status === 'inactive'}
              onChange={handleStatusChange}
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
