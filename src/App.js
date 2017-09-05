import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import { Route } from 'react-router-dom'
import './App.css'

// SearchBooks

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books }) // ES6: Equivalent to { contacts: contacts }
    })
  }

  updateShelf = (bookShelfTarget, bookToUpdate) => {
    console.log("bookshelf update registered for: ", bookToUpdate.id, bookShelfTarget)
    /* Check whether this book exists locally. If not, add it wholesale to the
       books array. */

    const bookInLibrary = this.state.books.filter((book) => book.id === bookToUpdate.id)
    console.log("Does this book already exist in my library? ",bookInLibrary,bookInLibrary.length  )

    if(bookInLibrary.length !== 0) {

      const newBooks = this.state.books.map((book) => {

        if(book.id === bookToUpdate.id) {
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
      
    } else {
      console.log("The book is not in the Library, will add it")
      // Update API with Shelf Choice
      BooksAPI.update(bookToUpdate, bookShelfTarget).then(res => {
        console.log("Added shelf meta data to book, ", res, bookToUpdate)
        // return res
      })
      // Update newBooks array with new book and shelf choice
      const bookToUpdateWithShelf = {...bookToUpdate, shelf: bookShelfTarget}      
      const newBooks = [...this.state.books, bookToUpdateWithShelf]
      console.log("Newbooks with added book is ", newBooks)

      this.setState({
        books: newBooks
      })

    }
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
            books={this.state.books} onUpdateShelf={this.updateShelf}        
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
