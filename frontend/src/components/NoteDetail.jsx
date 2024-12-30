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
        <section className='flex-col-1'>
            <div className="flex justify-between items-center">
                <Link to='/dashboard' className='flex items-center gap-x-[0.2rem] w-max'>
                    <IconBack />
                    <span className='label'>Back</span>
                </Link>
                <div className="flex gap-x-[0.5rem]">
                    <Link to={`/dashboard/notes/edit/${id}`} className='label btn'>Edit</Link>
                    <button onClick={handleDelete} className='label btn'>Delete</button>
                </div>
            </div>
            <article className='flex-col-2'>
                <h2>{noteData?.title}</h2>
                <div className="flex-col-2">
                    <div className="flex-col-05">
                        <h1 className='h4'>{noteData?.title}</h1>
                    </div>
                    <div className="flex-col-05">
                        <p>{noteData?.body}</p>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default NoteDetail;