import React from 'react'
// import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

    /* Side note, when I put this inline on the select statement, I ended up with null :-/ */
    handleChange = (e) => {
        console.log(e.target.value)
        this.props.changeShelf(e.target.value, this.props.bookDetail.id)
    }

    render(){
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.bookDetail.imageLinks.thumbnail +')' }}></div>
                <div className="book-shelf-changer">
                  <select value={this.props.bookDetail.shelf} onChange={this.handleChange}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.bookDetail.title}</div>
                {
                    this.props.bookDetail.authors.map((a,index) => (
                        <div key={index} className="book-authors">{a}</div>                        
                    ))
                }
            </div>
        //   <li>
        //     <div className="book">
        //       <div className="book-top">
        //         <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
        //         <div className="book-shelf-changer">
        //           <select>
        //             <option value="none" disabled>Move to...</option>
        //             <option value="currentlyReading">Currently Reading</option>
        //             <option value="wantToRead">Want to Read</option>
        //             <option value="read">Read</option>
        //             <option value="none">None</option>
        //           </select>
        //         </div>
        //       </div>
        //       <div className="book-title">Ender's Game</div>
        //       <div className="book-authors">Orson Scott Card</div>
        //     </div>
        //   </li>
      
        )
    }
}

export default Book