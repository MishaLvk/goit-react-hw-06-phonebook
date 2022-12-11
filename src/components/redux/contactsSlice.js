import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContactRedux(state, action) {
      const index = state.contacts.findIndex(
        contact => contact.key === action.payload
      );
      state.contacts.splice(index, 1);
    },
  },
});

export const persistedContactsSliceReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContactRedux } = contactsSlice.actions;
