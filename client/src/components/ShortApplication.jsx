import React from 'react'
import style from '../styles/Dashboard.module.css';
import { Link } from 'react-router-dom';



// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}
function ShortApplication({ data }) {
     const { event, status } = data;
     const { _id, title, description, startTime, endTime, state, country } = event;

     return (
          <Link to={`/event/${_id}`}>
               <div className={style.ShortApplication}>
                    <div>
                         <h2>{title}</h2>
                         <h4>{description}</h4>
                         <p><bdi>Start Time:</bdi> {getDateAndTime(startTime)}</p>
                         <p><bdi>End Time:</bdi> {getDateAndTime(endTime)}</p>
                    </div>
                    <div>
                         <p><bdi>Country: </bdi> {country} </p>
                         <p><bdi>State: </bdi> {state} </p>
                         <p style={{ color: `${status === 'accepted' ? '#188d00' : status === 'pending' ? '#f3a600' : '#dc0000'}` }}><bdi>Status: </bdi> {status} </p>
                    </div>
               </div>
          </Link>
     )
}

export default ShortApplication
