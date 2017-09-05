import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
  
  class ListBooks extends React.Component {
    render() {
  
      const books=this.props.books
      console.log(books)
  
      return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={books} onUpdateShelf={this.props.onUpdateShelf} shelfTitle="Currently Reading" shelfName="currentlyReading" />
            <BookShelf books={books} onUpdateShelf={this.props.onUpdateShelf} shelfTitle="Want to Read" shelfName="wantToRead" />
            <BookShelf books={books} onUpdateShelf={this.props.onUpdateShelf} shelfTitle="Read" shelfName="read" />          
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
      )
    }
  }

  export default ListBooks