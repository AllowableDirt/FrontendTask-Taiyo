// src/store/contactSlice.js
import { createSlice } from '@reduxjs/toolkit';

let nextContactId = 1; // Initialize a counter for generating unique IDs

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      const { firstName, lastName, status } = action.payload;
      const newContact = {
        id: nextContactId++, // Generate a unique ID for the new contact
        firstName,
        lastName,
        status,
      };
      state.push(newContact);
    },
    updateContact: (state, action) => {
      const { id, firstName, lastName, status } = action.payload;
      const existingContact = state.find((contact) => contact.id === id);
      if (existingContact) {
        existingContact.firstName = firstName;
        existingContact.lastName = lastName;
        existingContact.status = status;
      }
    },
    deleteContact: (state, action) => {
      const contactId = action.payload;
      return state.filter((contact) => contact.id !== contactId);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
