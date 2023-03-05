import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './ContactList.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { getFilterStatus } from 'redux/selectors';
import { Contact } from 'components/Contact/Contact';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { importData } from 'redux/contactSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const listOfContacts = window.localStorage.getItem('ContactLocalList');
    if (!listOfContacts) return;
    try {
      const parsedListOfContacts = JSON.parse(listOfContacts);
      dispatch(importData(parsedListOfContacts));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const newContactLocalStorage = JSON.stringify(contacts);
    window.localStorage.setItem('ContactLocalList', newContactLocalStorage);
  }, [contacts]);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <ul className={clsx(css.contactList)}>
      {filteredContacts.map(contact => (
        <Contact contact={contact} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contactTab: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  search: PropTypes.string,
};
