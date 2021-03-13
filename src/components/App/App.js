import React, { Component } from 'react';
import shortid from 'shortid';
import s from './App.module.css';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;

    if (
      contacts.find(el => data.name.toLowerCase() === el.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      const contact = {
        id: shortid.generate(),
        name: data.name,
        number: data.number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
