export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';

export const FETCH_EVENT_BY_ID_ERROR = 'FETCH_EVENT_BY_ID_ERROR';
export const FETCH_EVENT_BY_ID_START = 'FETCH_EVENT_BY_ID_START';
export const FETCH_EVENT_BY_ID_SUCCESS = 'FETCH_EVENT_BY_ID_SUCCESS';




export function fetchAllEvents({location, params}) {
  return ({fetch}) => ({
    type: 'FETCH_EVENTS',
    payload: {
      promise: fetch('api/v1/events/all')
        .then(response => response.json())
    }
  });
}
export function fetchEventById({location, params}) {
  console.log(JSON.stringify(params));
  return ({fetch}) => ({
    type: 'FETCH_EVENT_BY_ID',
    payload: {
      promise: fetch('api/v1/events/event/' + params.id)
        .then(response => response.json())
    }
  });
}



