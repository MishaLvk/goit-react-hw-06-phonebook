import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';
import { selectContacts } from 'components/redux/selectors';

export default function ContactForm() {
  const contactsRedux = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

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
    reset();
    return true;
  };

  const checkName = name => {
    const normalisedFilter = name.toLocaleLowerCase();

    return contactsRedux.some(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label className="Lable">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>
      <Label className="Lable">
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </Label>

      <button type="submit">Add contact</button>
    </Form>
  );
}
