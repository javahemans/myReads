import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {
  
  state = {
    query: '',
    rawBooks: []
  }

  augmentBooks = (booksToAugment) => {
    // console.log(booksToAugment)
    // if(!booksToAugment || !booksToAugment.length){
    //   return [];
    // }

    /* Need to augment these results so they include a shelf property from users book
        collection. The shelf property should be "none", if no match is found
    */
    const augmentedBooks = booksToAugment.map((rawBook) => {
      const res = this.props.books.find((book) => book.id === rawBook.id)
      // console.log("Interim Result is,", res)
      if(!!res){
        return { ...rawBook, shelf: res.shelf }
      } else {
        return { ...rawBook, shelf: "none" }
      }      
    })   
    // console.log("AugmentedBook Result is,", augmentedBooks)
    
    return augmentedBooks
  }

  updateQuery = (query) => {

    /* Checks if query is < 1 (triggers 403), also returns a blank array if query response is empty */

    this.setState({query: query.trim() })
    // console.log(query)
    if (query.length < 1) {
      return this.setState({ rawBooks: [] })    
    } else {
      BooksAPI.search(query, 20).then((rawBooks) => {
        // console.log('raw results', rawBooks)
        if(!!rawBooks.length) {
            const enhancedBooks = this.augmentBooks(rawBooks)        
            return this.setState({ rawBooks: enhancedBooks })
        } else {
          return this.setState({ rawBooks: [] })
        }
      }) 
    }   
  }
  
  render() {
    const { query, rawBooks } = this.state
    // console.log("Book Status Change on /search")
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
          <ol className="books-grid">
              {rawBooks.map((book) => 
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

export default SearchBooks