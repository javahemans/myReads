import React from 'react'
import Book from './Book'

const BookShelf = (props) => {
  
  const { books, shelfName, shelfTitle, onUpdateShelf } = props
  // console.log("Books in Bookshelf, ", books)
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* Refactored to Book.js */}
          {books.filter(book => book.shelf === shelfName )
            .map((book) => 
            <li key={book.id}>                  
            <Book bookDetail={book} changeShelf={onUpdateShelf}/>
            </li>
          )}                
        </ol>
      </div>
    </div>  
  )
}

export default BookShelf