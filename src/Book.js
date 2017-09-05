import React from 'react'
// import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import _result from 'lodash.result'

class Book extends React.Component {

    /* Side note, when I put this inline on the select statement, I ended up with null :-/ */
    handleChange = (e) => {
        // console.log(e.target.value)
        this.props.changeShelf(e.target.value, this.props.bookDetail)
    }

    render(){
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.bookDetail.imageLinks.thumbnail +')' }}></div>
                <div className="book-shelf-changer">
                  <select value={this.props.bookDetail.shelf} onChange={this.handleChange}>
                    <option value="" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.bookDetail.title}</div>
                {
                    /* Super annoying... Some of the JSON results of rawBooks are
                    missing the authors property, so using lodash _result to prevent undefined with [] instead */
                    _result(this.props.bookDetail,'authors',[]).map((a,index) => (
                        <div key={index} className="book-authors">{a}</div>                        
                    ))
                }
            </div>      
        )
    }
}

export default Book