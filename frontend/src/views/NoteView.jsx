import React, { useEffect, useContext, } from 'react';
import { useParams, Link } from 'react-router-dom';

import { NoteContext } from '@/contexts/NoteContext';
import IconBack from '@/components/icons/IconBack';

const NoteView = () => {
    const { fetchNote, deleteNote, noteData } = useContext(NoteContext);
    const { id } = useParams();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote(id);
        }
    }

    useEffect(() => {
        // fetchNote(id);
        console.log('fetchNote', id);
    }, [id]);
    return (
        <section className='h-screen absolute top-0 w-full bg-neon-yellow [&_*]:text-soft-black pt-[100px]'>
            <div className="container flex justify-between items-center h=full w-full">
                <textarea name="body" id="" className='h-full w-full'></textarea>
            </div>
        </section>
    )
}

export default NoteView;