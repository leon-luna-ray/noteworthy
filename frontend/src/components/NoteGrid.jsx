import { Link } from 'react-router-dom';

import IconNewNote from '@/components/icons/IconNewNote';

const NoteGrid = ({ notes }) => {
    const colors = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary',]

    const noteColorClass = (index) => {
        return colors[index % colors.length]
    }

    return (
        <ul className='incremental-grid gap-[1rem] h-full w-full'>
            <li className='note-grid-item flex items-center justify-center aspect-[21/9] md:aspect-square'>
                <Link to='/notes/new' className='flex flex-col items-center justify-center gap-[0.5rem] h-full w-full hover:bg-gray-100/10 all-transition border-[1px]'>
                    <IconNewNote />
                    <span className="h4 uppercase">New</span>
                </Link>
            </li>
            {notes.map((note, index) => (
                <li key={note.id} className={`${noteColorClass(index)} note-grid-item`}>
                    <Link to={`/notes/${note.id}`}>
                        <span>{note.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NoteGrid