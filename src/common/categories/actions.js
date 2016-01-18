export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const FETCH_CATEGORY_BY_ID_ERROR = 'FETCH_CATEGORY_BY_ID_ERROR';
export const FETCH_CATEGORY_BY_ID_START = 'FETCH_CATEGORY_BY_ID_START';
export const FETCH_CATEGORY_BY_ID_SUCCESS = 'FETCH_CATEGORY_BY_ID_SUCCESS';




export function fetchAllCategories({location, params}) {
  return ({fetch}) => ({
    type: 'FETCH_CATEGORIES',
    payload: {
      promise: fetch('api/v1/categories/all')
        .then(response => response.json())
    }
  });
}
export function fetchCategoryById({location, params}) {
  console.log(JSON.stringify(params));
  return ({fetch}) => ({
    type: 'FETCH_CATEGORY_BY_ID',
    payload: {
      promise: fetch('api/v1/categories/category/' + params.id)
        .then(response => response.json())
    }
  });
}



