import React from 'react'

const NoteGrid = ({ notes }) => {
    const noteList = notes.map((note, index) => (
        <li key={note.id}>
            <Link to={`/notes/${note.id}`}>
                <span>{note.title}</span>
            </Link>
        </li>
    ))
    return (
        <div>NoteGrid</div>
    )
}

export default NoteGrid