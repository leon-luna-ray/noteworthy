import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { NoteContext } from '@/contexts/NoteContext';

import IconBack from '@/components/icons/IconBack';

const NoteDetail = () => {
    const { fetchNote, deleteNote, noteData } = useContext(NoteContext);
    const { id } = useParams();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote(id);
        }
    }

    useEffect(() => {
        fetchNote(id);
    }, [id]);

    return (
        <section className='flex-col-1 text-soft-black'>
            <div className="flex justify-between items-center pt-[100px] border-blue">
                <Link to='/' className='flex items-center gap-x-[0.2rem] w-max !text-soft-black'>
                    <IconBack />
                    <span className='label'>DO SOMETHING</span>
                </Link>
                <div className="flex gap-x-[0.5rem]">
                    <Link to={`/notes/edit/${id}`} className='label btn'>Edit</Link>
                    <button onClick={handleDelete} className='label btn'>Delete</button>
                </div>
            </div>
            <article className='flex-col-2'>
                <h2 className='h3'>{noteData?.title}</h2>
                <p>{noteData?.body}</p>
            </article>
        </section>
    );
};

export default NoteDetail;