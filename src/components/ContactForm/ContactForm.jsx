import { default as React } from 'react';
import { default as PropTypes } from 'prop-types';
import { ContactFormStyled } from './ContactForm.styled';
import {
  Button,
  InputGroup,
  InputLabel,
  Input,
  InputBar,
} from '../App/App.styled';

export class ContactForm extends React.Component {
  inputNameId = crypto.randomUUID();
  inputNumberId = crypto.randomUUID();

  render() {
    const { name, number, handleChange, handleSubmit } = this.props;

    return (
      <ContactFormStyled onSubmit={handleSubmit} autoComplete="off">
        <InputGroup>
          <Input
            type="text"
            id={this.inputNameId}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleChange}
            required
          />
          <InputLabel htmlFor={this.inputNameId}>Name</InputLabel>
          <InputBar></InputBar>
        </InputGroup>
        <InputGroup>
          <Input
            type="tel"
            name="number"
            id={this.inputNumberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleChange}
            required
          />
          <InputLabel htmlFor={this.inputNumberId}>Number</InputLabel>
          <InputBar></InputBar>
        </InputGroup>
        <div>
          <Button type="submit">Add contact</Button>
        </div>
      </ContactFormStyled>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
