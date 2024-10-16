import { AUTH_LOGOUT } from '../auth/auth.types';
import * as eventsTypes from './events.types';

/**
 * @param {*} navigate - Navigate the user to the login page if session expired
 * @param {*} queryString - send query url (optional) for searching & filtering
 * */
export const getEventsAction = (navigate, queryString = "") => async (dispatch) => {
     dispatch({ type: eventsTypes.EVENT_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event?${queryString}`, {
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `navigate` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${navigate('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               dispatch({ type: eventsTypes.EVENT_SUCCESS, payload: data.data })
          } else {
               dispatch({ type: eventsTypes.EVENT_ERROR, payload: data.message });
          }

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: eventsTypes.EVENT_ERROR, payload: error.message });
     }
}


/**
 * GET ALL THE EVENTS CREATED BY A SPECIFIC USER ONLY
 */
export const getMyEventsAction = () => async (dispatch) => {
     dispatch({ type: eventsTypes.EVENT_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event/myevents`, {
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               dispatch({ type: eventsTypes.MY_EVENTS_SUCCESS, payload: data.data })
          } else {
               dispatch({ type: eventsTypes.EVENT_ERROR, payload: data.message });
          }

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: eventsTypes.EVENT_ERROR, payload: error.message });
     }
}



/**
 * 
 * @param {*} update - `{addParticipant, status}`
 * @param {*} eventId - pending request's user id
 */
export const updateMyEventAction = (update, eventId) => async (dispatch) => {
     if (!update.addParticipant || !update.status || !eventId) return;

     dispatch({ type: eventsTypes.EVENT_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event/${eventId}`, {
               method: 'PATCH',
               body: JSON.stringify(update),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               dispatch(getMyEventsAction());
          } else {
               dispatch({ type: eventsTypes.EVENT_ERROR, payload: data.message });
          }

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: eventsTypes.EVENT_ERROR, payload: error.message });
     }
}




/**
 * @param {*} navigate - Navigate the user to the login page if session expired
 * @param {*} event - The event you want to create with this keys `{title, description, state, country, startTime, endTime, limit}`
 * @param {closeModal} closeModal - Close the modal of create event`
 * */
export const createEventAction = (navigate, event, closeModal) => async (dispatch) => {
     if (!event || !event.title || !event.description || !event.state || !event.country || !event.startTime || !event.endTime || !event.limit) return;

     dispatch({ type: eventsTypes.EVENT_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event`, {
               method: 'POST',
               body: JSON.stringify(event),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `navigate` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${navigate('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               dispatch(getMyEventsAction())
               closeModal();
          } else {
               dispatch({ type: eventsTypes.EVENT_ERROR, payload: data.message });
               alert(data.message);
          }
     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: eventsTypes.EVENT_ERROR, payload: error.message });
     }

}


/**
 * GET OPTIONS DYNAMICALLY FOR FILTERING 
 * */
export const getOptionsAction = () => async (dispatch) => {

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event/options`, {
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `navigate` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               dispatch({ type: eventsTypes.EVENT_OPTIONS_SUCCESS, payload: data.data });
          } else {
               console.error(data.message)
          }

     } catch (error) {
          console.log('error:', error)
     }

}


