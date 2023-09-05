import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setSearchQuery, searchBooks, fetchBooksSuccess } from '../redux/actions';


import ButtonTheme from "./ButtonTheme";
import Modal from './Modal';


const Main = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const books = useSelector((state) => state.books);
  const loading = useSelector((state)=> state.loading);
  const error = useSelector((state)=> state.error);
  const [limit, setLimit] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <input value={query} onChange={handleInputChange} className="input_search" type="text" />
        <button onClick={handleSearch} className="btn_search">Поиск</button>
      </div>
      <ButtonTheme />
      <div className="container">
        {error ? (<div>ошибка на сервере!</div>) :
        (<div>{loading ? (<div class="loader"></div>): (<div>
          <div className="grid_books">
            {books.length > 0 ? (
              books.slice(0, limit).map((book) => (
                <div key={book.id} onClick={() => handleBookClick(book)}>
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
          </div>)}</div>)}
      </div>
      {modalOpen && (
        <Modal book={selectedBook} onClose={() => setModalOpen(false)} />
      )}
    </>

  )
}

export default Main;