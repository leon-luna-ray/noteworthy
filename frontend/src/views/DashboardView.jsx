import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NoteContext } from '@/contexts/NoteContext';

import NoteForm from '@/components/NoteForm';
import NoteDetail from '@/components/NoteDetail';
import NoteGrid from '@/components/NoteGrid';

const DashboardPage = () => {
  const { notes, fetchNotes } = useContext(NoteContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container flex-col-2 justify-center items-center w-full h-full">
          <Routes>
            <Route path="/" element={
              <NoteGrid notes={notes} />
            } />
            {/* <Route path="/notes/new" element={<NoteForm />} />
            <Route path="/notes/edit/:id" element={<NoteForm />} />
            <Route path="/notes/:id" element={<NoteDetail />} /> */}
          </Routes>
    </div>
  )
}

export default DashboardPage;