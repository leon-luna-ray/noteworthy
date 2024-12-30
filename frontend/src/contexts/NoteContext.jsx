import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    // Hooks
    const navigate = useNavigate();

    // State
    const [notes, setNotes] = useState([]);
    const [noteData, setNoteData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Methods
    // Create
    const createNote = async (noteData) => {
        try {
            const response = await axios.post('/notes/new/', noteData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Note created:', response.data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    // Read
    const fetchNotes = async () => {
        console.log('fetching notes');
        try {
            const response = await axios.get('/notes/');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchNote = async (id) => {
        try {
            const response = await axios.get(`/notes/${id}/`);
            setNoteData(response.data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    // Update
    const updateNote = async (id, noteData) => {
        try {
            const response = await axios.put(`/notes/edit/${id}/`, noteData);
            if (response.status === 200) {
                fetchNotes();
                navigate(`/dashboard/notes/${id}`);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    // Delete
    const deleteNote = async (id) => {
        try {
            await axios.delete(`/notes/delete/${id}/`);
            fetchNotes();
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <NoteContext.Provider value={{
            notes,
            noteData,
            loading,
            fetchNotes,
            fetchNote,
            createNote,
            updateNote,
            deleteNote,
            setNoteData,
        }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);