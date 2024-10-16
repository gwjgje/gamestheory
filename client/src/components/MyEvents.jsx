import React, { useCallback, useEffect, useState } from 'react';
import style from '../styles/Home.module.css';
import { BsCheckLg } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateMyEventAction } from '../redux/events/events.acitions';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}


function MyEvents({ data }) {
     const { _id, title, description, state, country, participants, startTime, limit, endTime, createdAt } = data;
     const dispatch = useDispatch();
     const [pendingApplications, setPendingapplicatinos] = useState('');

     const getPendingApplications = useCallback(async () => {
          try {
               const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/application/applied/${_id}`, {
                    headers: {
                         'Content-Type': 'application/json',
                         'authorization': sessionStorage.getItem("TOKEN")
                    }
               })

               const data = await res.json();

               if (res.ok) setPendingapplicatinos(data.data)

          } catch (error) {
               console.log('error:', error)
          }
     }, [_id])

     const handleRequest = useCallback((userId, status) => {
          const update = {
               addParticipant: userId,
               status
          }
          dispatch(updateMyEventAction(update, _id))
     }, [])


     useEffect(() => {
          getPendingApplications();
     }, [])


     return (
          <div>
               <Link to={`/event/${_id}`}>
                    <article className={style.Event} >
                         <div>
                              <h2>{title}</h2>
                              <h4>{description}</h4>
                              <p><bdi>State: </bdi>{state}</p>
                              <p><bdi>Country: </bdi>{country}</p>
                         </div>
                         <div>
                              <p><bdi>Participants: </bdi> {participants.length}/{limit}</p>
                              <p><bdi>Start at: </bdi> {getDateAndTime(startTime)}</p>
                              <p><bdi>End at: </bdi> {getDateAndTime(endTime)}</p>
                              <p><bdi>Created at: </bdi> {getDateAndTime(createdAt)} </p>
                         </div>
                    </article>
               </Link>
               <table className={style.RequestTable}>
                    <caption>Requests</caption>
                    <tbody>
                         {
                              pendingApplications && pendingApplications?.map(el => <tr key={el._id}>
                                   <th>{el.user.username}</th>
                                   <td><BsCheckLg onClick={() => handleRequest(el.user._id, 'accepted')} /></td>
                                   <td><RxCross2 onClick={() => handleRequest(el.user._id, 'rejected')} /></td>
                              </tr>)
                         }
                    </tbody>
               </table>
          </div>
     )
}

export default MyEvents;