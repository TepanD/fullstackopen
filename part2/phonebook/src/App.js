import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ input, handler }) => {
  return (
    <div>
      filter shown with:
      <input value={input} onChange={handler} placeholder="search name..." />
    </div>
  );
};

const Notification = ({ message, update }) => {
  if (message === null) {
    return null;
  }
  return <div className={update === true ? "update" : "delete"}>{message}</div>;
  // } else if (update === true) {
  //   return <div className="update">{message}</div>;
  // } else if (deletion === true) {
  //   return <div className="delete">{message}</div>;
  // }
};

const PersonForm = ({
  adder,
  NameValue,
  NameHandler,
  NumberValue,
  NumberHandler,
}) => {
  return (
    <form onSubmit={adder}>
      <div>
        name:{" "}
        <input
          value={NameValue}
          onChange={NameHandler}
          placeholder="enter new name..."
        />
      </div>
      <div>
        number:{" "}
        <input
          value={NumberValue}
          onChange={NumberHandler}
          placeholder="enter new number..."
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, deleteFunction }) => {
  return (
    <>
      <div>
        {persons.name} {persons.number}{" "}
        <button onClick={deleteFunction}>delete</button>
      </div>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [update, setUpdate] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const checkMatchingPerson = persons.some(
      (person) => person.name === personObject.name
    );
    //console.log(checkMatchingPerson);

    const checkNumberInput =
      personObject.number === "" || isNaN(personObject.number);

    if (checkNumberInput) {
      window.alert(`please input a valid phone number`);
    } else if (!checkNumberInput) {
      if (checkMatchingPerson) {
        if (
          window.confirm(
            `${personObject.name} is already added to phonebook, replcae the old number with a new one?`
          )
        ) {
          const matchingPerson = persons.find(
            (person) => person.name === personObject.name
          );
          const updatedPerson = {
            ...matchingPerson,
            number: personObject.number,
          };
          personService
            .update(matchingPerson.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== matchingPerson.id ? person : returnedPerson
                )
              );
            })
            .catch(() => {
              setError(true);
              setMessage(
                `${matchingPerson.name} was already removed from the server`
              );
              setUpdate(false);
              setTimeout(() => {
                setMessage(null);
                setUpdate(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== matchingPerson.id)
              );
            });
          if (error === false) {
            setMessage(`${personObject.name}'s number has been changed`);
            setUpdate(true);
            setTimeout(() => {
              setMessage(null);
              setUpdate(null);
            }, 5000);
            console.log(updatedPerson);
          }
        }
      } else if (!checkMatchingPerson) {
        //setPersons([...persons, personObject]);
        //setPersons(persons.concat(personObject));

        // axios
        //   .post("http://localhost:3001/persons", personObject)
        //   .then((response) => {
        //     //console.log(response);
        //     setPersons(persons.concat(response.data));
        //     setNewName("");
        //     setNewNumber("");
        //   });

        personService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${personObject.name}`);
          setUpdate(true);
          setTimeout(() => {
            setMessage(null);
            setUpdate(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
      }
    }

    //setNewName("");
    //setNewNumber("");
  };

  const deletePerson = (id) => {
    console.log(`deleted person with id ${id}`);
    const person = persons.find((person) => person.id === id);
    console.log(person);

    personService.deletion(id).then(() => {
      const updated = persons.filter((person) => person.id !== id);
      setPersons(updated);
      setMessage(`${person.name} has been deleted`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const handlePersonsName = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePersonsNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    //console.log(searchName);
  };

  const personToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} update={update} />

      <Filter input={searchName} handler={handleSearchName} />

      <h2>Add a new</h2>

      <PersonForm
        adder={addName}
        NameValue={newName}
        NameHandler={handlePersonsName}
        NumberValue={newNumber}
        NumberHandler={handlePersonsNumber}
      />

      <h2>Numbers</h2>

      {personToShow.map((person) => (
        <Persons
          key={person.id}
          persons={person}
          deleteFunction={() => {
            if (window.confirm(`Delete ${person.name} ?`)) {
              deletePerson(person.id);
            }
          }}
        />
      ))}
    </div>
  );
};

export default App;
