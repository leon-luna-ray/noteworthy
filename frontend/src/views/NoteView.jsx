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
            <div className="flex justify-between items-center">
                <Link to='/' className='flex items-center gap-x-[0.2rem] w-max'>
                    <IconBack />
                    <span className='label'>Back</span>
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
  )
}

export default NoteView