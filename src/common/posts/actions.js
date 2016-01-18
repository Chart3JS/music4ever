export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const FETCH_POST_BY_ID_ERROR = 'FETCH_POST_BY_ID_ERROR';
export const FETCH_POST_BY_ID_START = 'FETCH_POST_BY_ID_START';
export const FETCH_POST_BY_ID_SUCCESS = 'FETCH_POST_BY_ID_SUCCESS';




export function fetchAllPosts({location, params}) {
  return ({fetch}) => ({
    type: 'FETCH_POSTS',
    payload: {
      promise: fetch('api/v1/posts/all')
        .then(response => response.json())
    }
  });
}
export function fetchPostById({location, params}) {
  console.log(JSON.stringify(params));
  return ({fetch}) => ({
    type: 'FETCH_POST_BY_ID',
    payload: {
      promise: fetch('api/v1/posts/post/' + params.id)
        .then(response => response.json())
    }
  });
}



