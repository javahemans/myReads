import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
  
const ListBooks = (props) => {  
  const { books, onUpdateShelf } = props

  return (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf books={books} onUpdateShelf={onUpdateShelf} shelfTitle="Currently Reading" shelfName="currentlyReading" />
        <BookShelf books={books} onUpdateShelf={onUpdateShelf} shelfTitle="Want to Read" shelfName="wantToRead" />
        <BookShelf books={books} onUpdateShelf={onUpdateShelf} shelfTitle="Read" shelfName="read" />          
      </div>
    </div>
    <div className="open-search">
      <Link to="/search" >Add a book</Link>
    </div>
  </div>
  )
}

export default ListBooks