import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ name, number, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
      />
    </label>
    <br />
    <label>
      Number:
      <input
        style={{ margin: '9px' }}
        type="tel"
        name="number"
        value={number}
        onChange={onChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>
    <br />
    <button
      type="submit"
      style={{
        margin: '9px',
        backgroundColor: '#2874A6 ',
        color: '#fff',
        padding: '5px 8px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
      }}
    >
      Add Contact
    </button>
  </form>
);

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button
          style={{
            margin: '9px',
            backgroundColor: '#2874A6 ',
            color: '#fff',
            padding: '5px 8px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const Filter = ({ filter, onChange }) => (
  <label>
    Filter by name:
    <input type="text" value={filter} onChange={onChange} />
  </label>
);

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddContact = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (this.isContactNameUnique(name)) {
      const newContact = { id: this.generateUniqueId(), name, number };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    } else {
      alert(`Contact "${name}" already exists!`);
    }
  };

  generateUniqueId = () => {
    return Date.now().toString();
  };

  isContactNameUnique = name => {
    return !this.state.contacts.some(contact => contact.name === name);
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter, name, number } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1 style={{ color: '#2874A6' }}>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onChange={this.handleChange}
          onSubmit={this.handleAddContact}
        />

        <h2 style={{ color: '#2874A6' }}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
