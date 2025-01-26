import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person));
            setNewName('');
            setNewNumber('');
            setErrorMessage({
              message: `${updatedPerson.name}'s number was updated!`,
              type: 'success',
            });
            setTimeout(() => setErrorMessage(null), 5000);
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setErrorMessage({
                message: `${existingPerson.name} has already been removed from the server.`,
                type: 'error',
              });
              setTimeout(() => setErrorMessage(null), 5000);
              setPersons(persons.filter(person => person.id !== existingPerson.id));
            } else {
              setErrorMessage({
                message: `An error occurred while updating ${existingPerson.name}.`,
                type: 'error',
              });
              setTimeout(() => setErrorMessage(null), 5000);
            }
          });
      }
      return;
    }
  
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setErrorMessage({
          message: `${newPerson.name} was added!`,
          type: 'success',
        });
        setTimeout(() => setErrorMessage(null), 5000);
      })
      .catch(error => {
        setErrorMessage({
          message: `An error occurred while adding ${newPerson.name}.`,
          type: 'error',
        });
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };
  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
  
    const notificationStyle = {
      color: message.type === 'error' ? 'red' : 'green',
      backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda', 
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    };
  
    return (
      <div style={notificationStyle}>
        {message.message}
      </div>
    );
  };
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setErrorMessage({
            message: `${person.name}'s number was deleted!`,
            type: 'success',
          });
          setTimeout(() => setErrorMessage(null), 5000);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setErrorMessage({
              message: `${person.name} has already been removed from the server.`,
              type: 'error',
            });
            setTimeout(() => setErrorMessage(null), 5000);
            setPersons(persons.filter(p => p.id !== id));
          } else {
            setErrorMessage({
              message: `An error occurred while deleting ${person.name}.`,
              type: 'error',
            });
            setTimeout(() => setErrorMessage(null), 5000);
          }
        });
    }
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
