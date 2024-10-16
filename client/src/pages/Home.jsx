import { useCallback, useEffect, useRef, useState } from 'react';
import style from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsAction, getOptionsAction } from '../redux/events/events.acitions';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi'
import ShortEvent from '../components/ShortEvent';

function Home() {
     const dispatch = useDispatch()
     const { events, options } = useSelector(store => store.eventsManager);
     const [queryUrl, setQueryUrl] = useState("");

     const searchRef = useRef(null);
     const countryRef = useRef(null);
     const stateRef = useRef(null);

     const navigate = useNavigate();

     
     // CREATE URL WHEN ANY QUERY CHANGES
     const crateQueryUrl = useCallback(() => {
          let url = "";
          if (searchRef.current.value) url += `q=${searchRef.current.value}`
          if (countryRef.current.value) url += `country=${countryRef.current.value}`
          if (stateRef.current.value) url += `state=${stateRef.current.value}`
          setQueryUrl(url);
     }, [searchRef.current?.value, countryRef.current?.value, stateRef.current?.value])


     // CALL THE EVENTS AGAIN FOR DIFFERENT QUERIES
     useEffect(() => {
          dispatch(getEventsAction(navigate, queryUrl))
     }, [queryUrl])


     // GET THE FILTER OPTIONS DYNAMICALLY
     useEffect(() => {
          dispatch(getOptionsAction())
     }, [])
     return (
          <div className={style.Home}>
               <section className={style.TopOptions}>
                    <div>
                         <h1>Play & Grab your Trophies/Prizes</h1>
                         <div className={style.SearchBar}>
                              <BiSearchAlt />
                              <input type="search" placeholder="Search Event's name & description" ref={searchRef} onKeyDown={(e) => {
                                   if (e.key === 'Enter') crateQueryUrl();
                              }} />
                         </div>
                         <div className={style.Filter}>
                              <select id="country" ref={countryRef} onChange={crateQueryUrl}>
                                   <option value="">Choose Country</option>
                                   {options?.countries?.map(el => <option key={el} value={el}>{el}</option>)}
                              </select>
                              <select id="state" ref={stateRef} onChange={crateQueryUrl}>
                                   <option value="">Choose State</option>
                                   {options?.states?.map(el => <option key={el} value={el}>{el}</option>)}
                              </select>
                         </div>
                    </div>
               </section>

               <section className={style.Events}>
                    {
                         events?.map(el => <ShortEvent key={el._id} event={el} />)
                    }
               </section>
          </div>
     )
}

export default Home

