import React from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const HomePage = () => {
    return (
        <div className="home-page">
            <EventForm />
            <EventList />
        </div>
    );
};

export default HomePage;
