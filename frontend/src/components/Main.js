import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setSearchQuery, searchBooks, fetchBooksSuccess, setFilterCategory, setFilterNews } from '../redux/actions';


import ButtonTheme from "./ButtonTheme";
import Modal from './Modal';


const Main = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const books = useSelector((state) => state.books);
  const loading = useSelector((state)=> state.loading);
  const categories = useSelector((state)=>state.categories);
  const error = useSelector((state)=> state.error);
  const orderBy = useSelector((state)=>state.orderBy);
  const [limit, setLimit] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setSearchQuery(query));
    dispatch(searchBooks());
    dispatch(setFilterCategory(categories));
    dispatch(setFilterNews(orderBy));
  };

  useEffect(() => {
    dispatch(fetchBooksSuccess(books));
  }, books);


  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const handleFilterCategoryChange = (event) => {
    dispatch(setFilterCategory(event.target.value));
  };

  const handleFilterNews = (event)=>{
    dispatch(setFilterNews(event.target.value));
  }

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input placeholder='Найти книгу' value={query} onChange={handleInputChange} className="input_search" type="text" />
        <button type='submit' className="btn_search">Поиск</button>
        <select className='select_search' onChange={handleFilterCategoryChange}  id="">
          <option value="all">Все</option>
          <option value="computers">Компьютеры</option>
          <option value='history'>История</option>
          <option value="art">Искусство</option>
          <option value="biography">Биография</option>
          <option value="medical">Медицина</option>
          <option value="poetry">Поэзия</option>
        </select>
        <select onChange={handleFilterNews} className="select_filter" id="">
          <option value="relevance">Актуальная</option>
          <option value="newest">Новейшая</option>
        </select>
      </form>
      <ButtonTheme />
      <div className="container">
        {error ? (<div className='error'>ошибка на сервере!</div>) :
        (<div>{loading ? (<div class="loader"></div>): (<div>
          <div className="grid_books">
            {books.length > 0 ? (
              books.slice(0, limit).map((book) => (
                <div className='block_book' key={book.id} onClick={() => handleBookClick(book)}>
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