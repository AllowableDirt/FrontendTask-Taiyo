import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContact } from '../store/contactSlice';

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="p-4 rounded-md shadow-md w-full max-w-3xl bg-white overflow-y-auto min-h-screen">
        <Link
          to="/add"
          className="block border rounded p-2 mb-4 text-center text-white bg-blue-500 hover:bg-white hover:text-black"
        >
          Add More Contacts
        </Link>

        <h2 className="text-xl justify-center font-semibold mb-2 text-center">
          Contact List
        </h2>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">First Name</th>
                <th className="py-2">Last Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
  {contacts.map((contact) => (
    <tr key={contact.id} className="border-t">
      <td className="py-2 text-center">{contact.firstName}</td>
      <td className="py-2 text-center">{contact.lastName}</td>
      <td className={`py-2 text-center ${contact.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
        {contact.status}
      </td>
      <td className="py-2 text-center">
        <button
          className="bg-red-500 text-white rounded px-2 py-1 mr-2"
          onClick={() => handleDelete(contact.id)}
        >
          Delete
        </button>
        <Link to={`/contacts/${contact.id}/edit`} className="text-blue-500">
          Edit
        </Link>
      </td>
    </tr>
  ))}
</tbody>


          </table>
        )}
      </div>
    </div>
  );
};

export default ContactList;
