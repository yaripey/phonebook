import React, { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import NewContactForm from './components/NewContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [currentSearch, setSearch] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        contactService
            .getAll()
            .then(initialContacts => {
                setPersons(initialContacts)
                console.log(initialContacts)
            })
    }, [])

    let namesToShow = []
    if (currentSearch === "") {
        namesToShow = persons
    } else {
        namesToShow = persons.filter(contact => (contact.name.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1))
        console.log(namesToShow)
    }

    const newNameHandler = (event) => {
        event.preventDefault()
        const person = persons.find(n => n.name === newName)
        if (person !== undefined) {
            if (window.confirm(person.name + ' is already added to phonebook, replace the old number with a new one?')) {
                const changedPerson = { ...person, number: newNumber }
                contactService
                    .update(changedPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
                    })
                    .catch(error => {
                        setNotification('This user was already removed from server')
                        setTimeout(() => setNotification(null), 5000)
                        setPersons(persons.filter(n => n.id !== changedPerson.id))
                    })
            }
        } else {
            const nameObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            }

            contactService
                .create(nameObject)
                .then(returnedContact => {
                    setPersons(persons.concat(returnedContact))
                    setNewName('')
                    setNewNumber('')
                })
            setNotification('New user added')
            setTimeout(() => setNotification(null), 5000)
        }
    }

    const nameChange = (event) => {
        setNewName(event.target.value)
    }

    const numberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const searchChange = (event) => {
        setSearch(event.target.value)
    }

    const deleteContact = (event) => {
        if (window.confirm('Delete this user?')) {
            const targetId = event.target.id
            contactService
                .deleteContact(targetId)
                .then(data => {
                    setPersons(persons.filter(person => person.id !== targetId))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <SearchFilter currentSearch={currentSearch} searchChange={searchChange} />
            <h2>add a new</h2>
            <NewContactForm newNameHandler={newNameHandler} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
            <h2>Numbers</h2>
            <Contacts namesToShow={namesToShow} deleteContact={deleteContact} />
        </div>
    )
}

export default App