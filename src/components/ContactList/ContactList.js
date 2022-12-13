import { ListContact, ContactListList } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactRedux } from 'components/redux/contactsSlice';
import { selectContacts } from 'components/redux/selectors';

export default function ContactList() {
  const contactsRedux = useSelector(selectContacts);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filterContacts = () => {
    const normalisedFilter = filterValue.toLocaleLowerCase();
    return contactsRedux.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  return (
    <ListContact>
      {filterContacts().map(contact => (
        <ContactListList key={contact.key}>
          {contact.name}: {contact.number}
          <button onClick={() => dispatch(deleteContactRedux(contact.key))}>
            Delete
          </button>
        </ContactListList>
      ))}
    </ListContact>
  );
}
