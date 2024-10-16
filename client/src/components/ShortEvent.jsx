import React from 'react'
import style from '../styles/Home.module.css';
import { Link } from 'react-router-dom';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}


function ShortEvent({ event: { _id, title, description, createdAt, limit, participants, startTime } }) {

     return (
          <Link to={`/event/${_id}`}>
               <article className={style.Event} >
                    <div>
                         <h2>{title}</h2>
                         <h4>{description}</h4>
                    </div>
                    <div>
                         <p><bdi>Participants:</bdi> {participants.length}/{limit}</p>
                         <p><bdi>Start at:</bdi> {getDateAndTime(startTime)}</p>
                         <i><bdi>Created at:</bdi> {getDateAndTime(createdAt)} </i>
                    </div>
               </article>
          </Link>
     )
}

export default React.memo(ShortEvent);

