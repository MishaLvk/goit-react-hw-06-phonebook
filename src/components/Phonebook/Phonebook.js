import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './PhoneBook.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';

export default function Phonebook() {
  const contactsRedux = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const addContacts = formData => {
    const { name, number } = formData;

    if (checkName(name)) {
      alert(name + ' is already in contacts');
      return false;
    }

    const contact = {
      name: name,
      number: number,
      key: nanoid(),
    };
    dispatch(addContact(contact));
    return true;
  };

  const checkName = name => {
    const normalisedFilter = name.toLocaleLowerCase();

    return contactsRedux.some(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  return (
    <Container className="Phonebook_container">
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      {contactsRedux.length !== 0 && (
        <>
          <Filter />
          <ContactList />
        </>
      )}
    </Container>
  );
}
