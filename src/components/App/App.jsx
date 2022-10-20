import { default as React } from 'react';
import { Container } from './App.styled';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
//import toast, { Toaster } from 'react-hot-toast';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  emptyMsg = 'Contact list is empty';
  emptyFilterMsg = 'Nothing is found';

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const found = this.state.contacts.findIndex(
      el => el.name.trim().toUpperCase() === this.state.name.toUpperCase()
    );
    if (found >= 0) {
      this.toastAlert(`${this.state.name} already exists`);
      return;
    }
    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          id: crypto.randomUUID(),
          name: this.state.name.trim(),
          number: this.state.number.trim(),
        },
      ],
      name: '',
      number: '',
    });
    evt.target.reset();
  };

  handleDelete = evt => {
    const contactId = evt.currentTarget.parentNode.id;
    const newContacts = this.state.contacts.filter(el => el.id !== contactId)
    this.setState({
      contacts: newContacts,
      filter: newContacts.length > 0? this.state.filter: ''
    });
  };

  getContacts = () => {
    if (this.state.filter) {
      return this.state.contacts.filter(el =>
        el.name.toUpperCase().includes(this.state.filter.trim().toUpperCase())
      );
    }
    return this.state.contacts;
  };

  toastAlert = msg => {
    //toast.error(msg);
    alert(msg);
  };

  render() {
    return (
      <Container>
        {/*<Toaster position="top-right" />*/}
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter
              filter={this.state.filter}
              handleFilter={this.handleChange}
            />
            {this.getContacts().length > 0 ? (
              <ContactList
                contacts={this.getContacts()}
                handleDelete={this.handleDelete}
              />
            ) : (
              <p>{this.emptyFilterMsg}</p>
            )}
          </>
        ) : (
          <p>{this.emptyMsg}</p>
        )}
      </Container>
    );
  }
}