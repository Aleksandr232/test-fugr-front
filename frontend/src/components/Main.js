import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setSearchQuery, searchBooks, fetchBooksSuccess } from '../redux/actions';


import ButtonTheme from "./ButtonTheme";


const Main = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const books = useSelector((state) => state.books);
  const [limit, setLimit] = useState(3);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(query));
    dispatch(searchBooks());
  };

  useEffect(() => {
    dispatch(fetchBooksSuccess(books));
  }, books);


  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  return (
    <>
      <div>
        <input value={query} onChange={handleInputChange} className="input_search" type="text" />
        <button onClick={handleSearch} className="btn_search">Поиск</button>
      </div>
      <ButtonTheme />
      <div className="container">
        <div className="grid_books">
          {books.length > 0 ? (
            books.slice(0, limit).map((book) => (
              <div key={book.id}>
                <div className="text_books">
                  {book.volumeInfo.title.substring(0, 10) + '...'}
                </div>
                <img
                  className="img_books"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Книжная обложка"
                />
              </div>
            ))) : ([])}
        
        </div>
        {books.length > limit && (
          <button  onClick={handleLoadMore} className="btn_load_more">
            Загрузить еще
          </button>
        )}
      </div>
    </>

  )
}

export default Main;