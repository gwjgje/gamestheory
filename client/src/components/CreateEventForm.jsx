import React, { useCallback } from 'react'
import style from '../styles/CreateEventForm.module.css';
import { useDispatch } from 'react-redux';
import { createEventAction } from '../redux/events/events.acitions';
import { useNavigate } from 'react-router-dom';

function CreateEventForm() {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const closeModal = useCallback((e) => {
          document.querySelector('dialog').close()
     }, [])

     const handleCreateEvent = (e) => {
          e.preventDefault()
          const form = e.target;
          const obj = {
               "title": form.eventName.value,
               "description": form.shortDescription.value,
               "startTime": form.startTime.value,
               "endTime": form.endTime.value,
               "limit": +form.limit.value,
               "country": form.country.value,
               "state": form.state.value
          }
          dispatch(createEventAction(navigate, obj, closeModal));
          form.reset();
     }

     return (
          <form onSubmit={handleCreateEvent}>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>Event Name</label>
                    <input className={style['std-input']} type='text' id='eventName' required />
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>Short Description</label>
                    <textarea className={style['std-input']} type='text' id='shortDescription' required></textarea>
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>Start Time</label>
                    <input className={style['std-input']} type='datetime-local' id='startTime' required />
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>End Time</label>
                    <input className={style['std-input']} type='datetime-local' id='endTime' required />
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>Limit</label>
                    <input className={style['std-input']} type='number' id='limit' required />
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>State</label>
                    <input className={style['std-input']} type='text' id='state' required />
               </div>
               <div className={style['std-label-input']}>
                    <label className={style['std-label']}>Country</label>
                    <input className={style['std-input']} type='text' id='country' required />
               </div>
               <input type='submit' className={style['std-btn']} />
          </form>
     )
}

export default CreateEventForm;