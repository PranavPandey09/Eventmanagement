// const client = new Client();
// client.setProject('670caf66000c9acc6853');


import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css';

const App = () => {
    const [eventToEdit, setEventToEdit] = useState(null);

    const handleEdit = (event) => {
        setEventToEdit(event);
    };

    const handleUpdate = () => {
        setEventToEdit(null); // Clear the edit form once updated
    };

    return (
        <div className="app">
            <h1>Event Management</h1>

            {/* Event Form */}
            <EventForm eventToEdit={eventToEdit} onUpdate={handleUpdate} />

            {/* Event List */}
            <EventList onEdit={handleEdit} />
        </div>
    );
};

export default App;

