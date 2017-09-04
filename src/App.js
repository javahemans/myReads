import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

import { Link, Route } from 'react-router-dom'
import './App.css'

class SearchBooks extends React.Component {

  state = {
    query: ''
  }

  componentDidMount() {
    BooksAPI.search('Android', 5).then((res) => {
      console.log('results', res)
    })
  }


  updateQuery = (query) => {
    this.setState({query: query.trim() })
    console.log(query)
  }
  
  render() {
    const { query } = this.state
    
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">
          {/* 
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
      </div>
    )
  }
}

class BookShelf extends React.Component {

  render() {
    const books = this.props.books
    console.log("Books in Bookshelf, ", books)
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

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books }) // ES6: Equivalent to { contacts: contacts }
    })
  }

  updateShelf = (bookShelfTarget, bookId) => {
    console.log("bookshelf update registered for: ", bookId, bookShelfTarget)

    const newBooks = this.state.books.map((book) => {
      if(book.id === bookId) {
        console.log("book to update is", book)
        BooksAPI.update(book, bookShelfTarget).then(res => {
          console.log("Update response is, ", res)
          return res
        })
        const newBook = { ...book, "shelf": bookShelfTarget }
        return newBook
      } else {
        return book
      }
    });

    console.log("The newBooks array is: ", newBooks)

    this.setState({
      books: newBooks
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf} 
          />
        )}
        />
        <Route exact path="/search" render={()=> (
          <SearchBooks 
            books={this.state.books}         
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
