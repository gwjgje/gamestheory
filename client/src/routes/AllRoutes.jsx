import React from 'react'
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import EventDetails from '../components/EventDetails';

function AllRoutes() {
     return (
          <Routes>
               <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
               <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
               <Route path='/event/:eventId' element={<PrivateRoute><EventDetails /></PrivateRoute>} />
               <Route path='/auth' element={<Auth />} />
          </Routes>
     )
}

export default AllRoutes

/*
Home => show all events
     - allow users to apply if participant not reached the limit
My events => show events created by the user
     - Create event option using modal
My applications => show applied events by the user
     - if => application is in 'pending / rejected' state then don't pass to the details page
     - else => allow the user to go for the details of the event
Event Details => Show event Details
*/ 