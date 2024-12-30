import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import { NoteContext } from '@/contexts/NoteContext';

import IconBack from '@/components/icons/IconBack';

const NoteForm = () => {
    // Hooks
    const location = useLocation();
    const { createNote, updateNote, fetchNote, noteData, setNoteData } = useContext(NoteContext);

    // State
    const { id } = useParams();

    const isEdit = useMemo(() => {
        return location.pathname.includes('edit');
    }, [location]);

    // Methods
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (id && noteData) {
            updateNote(noteData.id, data);
        }
        else {
            createNote(data);
        }
    };
    
    // Effects
    useEffect(() => {
        if (id && !noteData) {
            fetchNote(id);
        }
    }, [id, noteData]);

    useEffect(() => {
        if (location.pathname.includes('new')) {
            setNoteData(null);
        }
    }, [location]);
    
    return (
        <div className='flex-col-2 p-[1rem]'>
            <Link to={id ? `/notes/${id}` : '/'} className='flex items-center gap-x-[0.2rem] w-max'>
                <IconBack />
                <span className='uppercase text-[14px]'>Back</span>
            </Link>
            {id ? <h2 className='h4'>Edit Note</h2> : <h2 className='h4'>New Note</h2>}
            <form onSubmit={handleSubmit} action="submit">
                <div className='flex-col-2 gap-y-[1rem]'>
                    <div className='flex-col-05 gap-y-[0.5rem]'>
                        <label htmlFor="title">Title</label>
                        <input required type="text" id="title" name="title" className='border' defaultValue={isEdit ? noteData?.title : ''} />
                    </div>
                    <div className='flex-col-05 gap-y-[0.5rem]'>
                        <label htmlFor="body">Body</label>
                        <textarea id="body" name="body" className='border h-[8rem]' defaultValue={isEdit ? noteData?.body : ''}></textarea>
                    </div>
                    <button type="submit" className='btn'>{id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm;