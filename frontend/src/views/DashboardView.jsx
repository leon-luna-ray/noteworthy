import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NoteContext } from '@/contexts/NoteContext';

import NoteForm from '@/components/NoteForm';
import NoteDetail from '@/components/NoteDetail';

const DashboardPage = () => {
  const { notes, fetchNotes } = useContext(NoteContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container flex-col-2 justify-center items-center">
      <div className='w-full grid lg:grid-cols-12 gap-[2rem] border-red'>
        <div className='lg:col-span-9'>
          <Routes>
            <Route path="/" element={
              <div>
                <p>Select a note or create a new one</p>
              </div>
            } />
            {/* <Route path="/notes/new" element={<NoteForm />} />
            <Route path="/notes/edit/:id" element={<NoteForm />} />
            <Route path="/notes/:id" element={<NoteDetail />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;