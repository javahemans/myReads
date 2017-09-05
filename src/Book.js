import React from 'react'
import _result from 'lodash.result'

const Book = (props) => {

  const { bookDetail, changeShelf } = props
  
  /* Side note, when I put this inline on the select statement, I ended up with null :-/ */
  /* handleChange = (e) => {
       // console.log(e.target.value)
       changeShelf(e.target.value, bookDetail)
     }
  */   

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + (bookDetail.imageLinks ? bookDetail.imageLinks.thumbnail : "none" ) +')' }}></div>
        <div className="book-shelf-changer">
          <select value={bookDetail.shelf} onChange={(e) => changeShelf(e.target.value, bookDetail)}>
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookDetail.title}</div>
        {
            /* Super annoying... Some of the JSON results of rawBooks are
            missing the authors property, so using lodash _result to prevent undefined with [] instead */
            // _result(this.props.bookDetail,'authors',[]).map((a,index) => (
            //     <div key={index} className="book-authors">{a}</div>                        
            // ))
            // Alternate below per Udacity review - easier :)
            <div className="book-authors">{bookDetail.authors ? bookDetail.authors.join(", ") : ""}</div>              
        }
    </div>      
  )
}

export default Book