import * as actions from './actions';

const initialState = {categories: [], category: {}};


export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {

    case actions.FETCH_CATEGORIES_SUCCESS: {
      return {...state, categories: action.payload};
    }
    case actions.FETCH_CATEGORY_BY_ID_SUCCESS: {
      return {...state, category: JSON.parse(action.payload)};
    }
  }

  return state;
}
