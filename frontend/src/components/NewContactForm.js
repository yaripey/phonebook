import React from 'react'


const NewContactForm = ({ newNameHandler, newName, nameChange, newNumber, numberChange }) => {

    return (
        <form onSubmit={newNameHandler}>
            <div>
                name: <input value={newName} onChange={nameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={numberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewContactForm