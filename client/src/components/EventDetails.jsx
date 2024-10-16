import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import style from '../styles/Home.module.css';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}


function EventDetails() {
     const { eventId } = useParams();

     const [details, setDetails] = useState("")

     const getDetails = useCallback(async () => {
          try {
               const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event/${eventId}`, {
                    headers: {
                         'Content-Type': 'application/json',
                         'authorization': sessionStorage.getItem("TOKEN")
                    }
               })

               const data = await res.json();

               if (res.ok) {
                    setDetails(data.data);
               } else {
                    alert(data.message);
               }
          } catch (error) {
               console.log('error:', error)
               alert(error.message);
          }
     }, [eventId])


     const applyForEvent = useCallback(async () => {
          try {
               const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/application/${eventId}`, {
                    headers: {
                         'Content-Type': 'application/json',
                         'authorization': sessionStorage.getItem("TOKEN")
                    }
               })

               const data = await res.json();

               alert(data.message);
          } catch (error) {
               console.log('error:', error)
               alert(error.message);
          }
     }, []);



     useEffect(() => {
          getDetails();
     }, [])


     return (
          <article className={style.EventDetails}>
               <table>
                    <tbody>
                         <tr>
                              <th>Title</th>
                              <td>{details?.title}</td>
                         </tr>
                         <tr>
                              <th>Description</th>
                              <td>{details?.description}</td>
                         </tr>
                         <tr>
                              <th>State</th>
                              <td>{details?.state}</td>
                         </tr>
                         <tr>
                              <th>Country</th>
                              <td>{details?.country}</td>
                         </tr>
                         <tr>
                              <th>Vacancy</th>
                              <td>{details?.limit - details?.participants?.length}</td>
                         </tr>
                         <tr>
                              <th>Limit</th>
                              <td>{details?.limit}</td>
                         </tr>
                    </tbody>
               </table>
               <table>
                    <tbody>
                         <tr>
                              <th>Organised by</th>
                              <td>{details?.organisedBy?.username}</td>
                         </tr>
                         <tr>
                              <th>Participants</th>
                              <td>{details?.participants?.map(el => <span key={el._id}>{el.username}</span>)}</td>
                         </tr>
                         <tr>
                              <th>StartTime</th>
                              <td>{getDateAndTime(details?.startTime)}</td>
                         </tr>
                         <tr>
                              <th>EndTime</th>
                              <td>{getDateAndTime(details?.endTime)}</td>
                         </tr>
                         <tr>
                              <th>CreatedAt</th>
                              <td>{getDateAndTime(details?.createdAt)}</td>
                         </tr>
                         <tr>
                              <th></th>
                              <td>
                                   <button onClick={applyForEvent} disabled={details?.limit === details?.participants?.length}>Apply for the event</button>
                              </td>
                         </tr>
                    </tbody>
               </table>
          </article>
     )
}

export default EventDetails