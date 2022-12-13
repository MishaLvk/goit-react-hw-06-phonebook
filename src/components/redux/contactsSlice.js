import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [] },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContactRedux(state, action) {
      const index = state.items.findIndex(
        contact => contact.key === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

export const persistedContactsSliceReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContactRedux } = contactsSlice.actions;
