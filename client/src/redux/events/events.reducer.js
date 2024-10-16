import * as eventTypes from './events.types';

const initialState = {
     loading: false,
     error: {
          status: false,
          message: ''
     },
     events: [],
     options: {},
     myEvents: []
}

export const reducer = (state = initialState, { type, payload }) => {

     switch (type) {
          case eventTypes.EVENT_LOADING: {
               return { ...state, loading: true, error: { status: false, message: "" } };
          }

          case eventTypes.EVENT_ERROR: {
               return { ...state, loading: false, error: { status: true, message: payload } };
          }

          case eventTypes.EVENT_SUCCESS: {
               return { ...state, events: payload, loading: false, error: { status: false, message: "" } };
          }

          case eventTypes.MY_EVENTS_SUCCESS: {
               return { ...state, myEvents: payload, loading: false, error: { status: false, message: "" } };
          }

          case eventTypes.EVENT_OPTIONS_SUCCESS: {
               return { ...state, options: payload }
          }

          default: return state;
     }
}