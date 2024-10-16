import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from '../styles/Dashboard.module.css';
import ShortApplication from './ShortApplication';

function UserApplications() {
     const [applications, setApplications] = useState("");
     const [queryUrl, setQueryUrl] = useState("")
     const statusRef = useRef(null);

     // GET ALL THE APPLICATIONS
     const getApplications = useCallback(async () => {
          try {
               const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/application?${queryUrl}`, {
                    headers: {
                         'Content-Type': 'application/json',
                         'authorization': sessionStorage.getItem("TOKEN")
                    }
               })

               const data = await res.json();

               if (res.ok) {
                    setApplications(data.data);
               } else {
                    alert(data.message);
               }
          } catch (error) {
               console.log('error:', error)
               alert(error.message);
          }
     }, [queryUrl])


     // CREATE THE URL FOR FILTERING BY STATUS
     const createQueryUrl = useCallback(() => {
          let url = "";
          if (statusRef.current.value) url += `status=${statusRef.current.value}`
          setQueryUrl(url);
     }, [statusRef.current?.value])


     useEffect(() => {
          getApplications();
     }, [queryUrl])

     return (
          <div className={style.UserApplication}>
               <h1>My applications</h1>
               <select ref={statusRef} onChange={createQueryUrl}>
                    <option value="">Choose Status</option>
                    <option value="accepted">Accepted</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
               </select>

               <div className={style.Applications}>
                    {
                         applications && applications?.map(el => <ShortApplication key={el._id} data={el} />)
                    }
               </div>
          </div>
     )
}

export default React.memo(UserApplications);