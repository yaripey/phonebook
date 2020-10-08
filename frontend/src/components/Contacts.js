import React from 'react'
import Person from './Person'

const Contacts = ({ namesToShow, deleteContact }) => {


    return (
        <ul>
            {namesToShow.map((person) =>
                <Person deleteContact={deleteContact} person={person} key={person.id} />
            )}
        </ul>
    )
}

export default Contacts