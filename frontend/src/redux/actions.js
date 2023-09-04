import axios from 'axios';

// Экшен для начала запроса
export const fetchBooksRequest = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

// Экшен для установки поискового запроса
export const setSearchQuery = (query) => {
    return {
      type: 'SET_SEARCH_QUERY',
      payload: query
    };
  };

// Экшен для успешного выполнения запроса
export const fetchBooksSuccess = (books) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: books
  };
};

// Экшен для ошибки при выполнении запроса
export const fetchBooksFailure = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };
};

// Асинхронный экшен для выполнения поискового запроса
export const searchBooks = () => {
    return (dispatch, getState) => {
      dispatch(fetchBooksRequest());
      const query = getState().searchQuery;
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBEWsoXj1sARoH3kRk0Na125HlWPuNJB8o`)
        .then((response) => {
          const books = response.data.items;
          console.log(books);
          dispatch(fetchBooksSuccess(books));
        })
        .catch((error) => {
          dispatch(fetchBooksFailure(error.message));
        });
    };
  };