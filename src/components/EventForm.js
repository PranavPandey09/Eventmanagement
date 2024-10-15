// import React, { useState } from 'react';
// import { database } from '../services/appwriteConfig';

// const EventForm = () => {
//     const [name, setName] = useState('');
//     const [date, setDate] = useState('');
//     const [location, setLocation] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async () => {
//         try {
//             await database.createDocument(
//                 'eventdb', // Replace with your Database ID
//                 'eventcoll', // Replace with your Collection ID
//                 'unique()', 
//                 {
//                     name,
//                     date,
//                     location,
//                     description,
//                 }
//             );
//             alert('Event created successfully!');
//         } catch (error) {
//             console.error(error.message);
//         }
//     };

//     return (
//         <div className="event-form">
//             <h2>Create Event</h2>
//             <input 
//                 type="text" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 placeholder="Event Name" 
//             />
//             <input 
//                 type="date" 
//                 value={date} 
//                 onChange={(e) => setDate(e.target.value)} 
//             />
//             <input 
//                 type="text" 
//                 value={location} 
//                 onChange={(e) => setLocation(e.target.value)} 
//                 placeholder="Location" 
//             />
//             <textarea 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 placeholder="Event Description" 
//             />
//             <button onClick={handleSubmit}>Create Event</button>
//         </div>
//     );
// };

// export default EventForm;

import React, { useState, useEffect } from 'react';
import { databases } from '../services/appwriteConfig';

const EventForm = ({ eventToEdit, onUpdate }) => {
    const [name, setName] = useState(eventToEdit ? eventToEdit.name : '');
    const [description, setDescription] = useState(eventToEdit ? eventToEdit.description : '');
    const [date, setDate] = useState(eventToEdit ? eventToEdit.date : '');
    const [location, setLocation] = useState(eventToEdit ? eventToEdit.location : '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (eventToEdit) {
            setName(eventToEdit.name);
            setDescription(eventToEdit.description);
            setDate(eventToEdit.date);
            setLocation(eventToEdit.location);
        }
    }, [eventToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !date || !location) {
            setError('All fields are required!');
            return;
        }

        try {
            if (eventToEdit) {
                // Update existing event
                await databases.updateDocument(
                    'eventdb',
                    'eventcoll',
                    eventToEdit.$id,
                    { name, description, date, location }
                );
                alert('Event updated successfully!');
            } else {
                // Create new event
                await databases.createDocument(
                    'eventdb',
                    'eventcoll',
                    'unique()',
                    { name, description, date, location }
                );
                alert('Event created successfully!');
            }
            onUpdate(); // Callback to refresh the event list
        } catch (error) {
            console.error('Failed to save event:', error.message);
        }
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>Event Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Event Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>

            <label>Event Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <label>Event Location</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />

            <button type="submit">{eventToEdit ? 'Update Event' : 'Create Event'}</button>
        </form>
    );
};

export default EventForm;
