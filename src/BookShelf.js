import React from 'react'
import Book from './Book'


class BookShelf extends React.Component {
  
    render() {
      const books = this.props.books
      // console.log("Books in Bookshelf, ", books)
      return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Refactored to Book.js */}
            {books.filter(book => book.shelf === this.props.shelfName )
              .map((book) => 
              <li key={book.id}>                  
              <Book bookDetail={book} changeShelf={this.props.onUpdateShelf}/>
              </li>
            )}                
          </ol>
        </div>
      </div>
  
      )
    }
  }
  
  export default BookShelf