import * as actions from './actions';

const initialState = {posts: [], post: {}};


export default function postsReducer(state = initialState, action) {
  switch (action.type) {

    case actions.FETCH_POSTS_SUCCESS: {
      return {...state, posts: action.payload};
    }
    case actions.FETCH_POST_BY_ID_SUCCESS: {
      return {...state, post: JSON.parse(action.payload)};
    }
  }

  return state;
}
