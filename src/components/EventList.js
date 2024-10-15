// import React, { useEffect, useState } from 'react';
// import { database } from '../services/appwriteConfig';

// const EventList = () => {
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await database.listDocuments(
//                     'eventdb',  // Replace with your Database ID
//                     'eventcoll' // Replace with your Collection ID
//                 );
//                 console.log(response);  // To verify the fetched response
//                 setEvents(response.documents); // Set the fetched documents to state
//             } catch (error) {
//                 console.error('Failed to fetch events:', error.message);
//             }
//         };

//         fetchEvents();
//     }, []);

//     return (
//         <div className="event-list">
//             <h2>Upcoming Events</h2>
//             <ul>
//                 {events.map((event) => (
//                     <li key={event.$id}>
//                         <h3>{event.name}</h3>
//                         <p>{event.description}</p>
//                         <p>{event.date}</p>
//                         <p>{event.location}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default EventList;


import React, { useState, useEffect } from 'react';
import { databases } from '../services/appwriteConfig';

const EventList = ({ onEdit }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await databases.listDocuments(
                    'eventdb',
                    'eventcoll'
                );
                setEvents(response.documents);
            } catch (error) {
                console.error('Failed to fetch events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await databases.deleteDocument(
                'eventdb',
                'eventcoll',
                eventId
            );
            setEvents(events.filter(event => event.$id !== eventId));
            alert('Event deleted successfully!');
        } catch (error) {
            console.error('Failed to delete event:', error.message);
        }
    };

    return (
        <div className="event-list">
            <h2>Events Lists </h2>
            <ul>
                {events.map((event) => (
                    <li key={event.$id}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <p>{event.location}</p>

                        {/* Edit and Delete Buttons */}
                        <button onClick={() => onEdit(event)}>Edit</button>
                        <button onClick={() => handleDelete(event.$id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
