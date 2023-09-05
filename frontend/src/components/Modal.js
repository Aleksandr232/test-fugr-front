

const Modal = ({ book, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
          <div className="book-info">
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="Книжная обложка" />
            <div className="book-description">
              <h1>{book.volumeInfo.title}</h1>
              <p>{book.volumeInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Modal;