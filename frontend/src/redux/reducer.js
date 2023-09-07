const initialState = {
    books: [],
    loading: false,
    error: null,
    searchQuery: '',
    filterCategory: '',
    filterNews:''
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_BOOKS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'FETCH_BOOKS_SUCCESS':
        return {
          ...state,
          loading: false,
          books: action.payload
        };
      case 'FETCH_BOOKS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          searchQuery: action.payload
        };
      case 'SET_FILTER_CATEGORY':
          return {
            ...state,
            filterCategory: action.payload
          };  
      case 'SET_FILTER_NEWS':
          return{
            ...state,
            filterNews: action.payload
          }
      default:
        return state;
    }
  };
  
  export default bookReducer;