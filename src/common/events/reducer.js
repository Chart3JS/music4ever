import * as actions from './actions';

const initialState = {posts: [], post: {}};


export default function eventsReducer(state = initialState, action) {
  switch (action.type) {

    case actions.FETCH_EVENTS_SUCCESS: {
      return {...state, events: action.payload};
    }
    case actions.FETCH_EVENT_BY_ID_SUCCESS: {
      return {...state, event: JSON.parse(action.payload)};
    }
  }

  return state;
}
