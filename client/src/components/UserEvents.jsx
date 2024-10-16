import Modal from './Modal';
import MyEvents from './MyEvents';
import { GoPlus } from 'react-icons/go';
import CreateEventForm from './CreateEventForm';
import style from '../styles/Dashboard.module.css'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyEventsAction } from '../redux/events/events.acitions';



function UserEvents() {
     const dispatch = useDispatch();
     const { myEvents, loading } = useSelector(store => store.eventsManager);

     // OPEN MODAL
     const showModal = useCallback(() => {
          document.querySelector('dialog').showModal();
     }, [])


     useEffect(() => {
          dispatch(getMyEventsAction())
     }, [])

     return loading ? <h1>Loading...</h1> : (
          <div className={style.UserEvent}>
               <h1>My Events</h1>
               <button className={style.CreateEventBtn} onClick={showModal}>
                    <p>Create Event</p>
                    <GoPlus />
               </button>
               <div className={style.MyEvent}>
                    {
                         myEvents?.map(el => <MyEvents key={el._id} data={el} />)
                    }
               </div>
               <Modal>
                    <CreateEventForm />
               </Modal>
          </div>
     )
}

export default React.memo(UserEvents);