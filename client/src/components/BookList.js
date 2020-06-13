import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import BookDetails from './BookDetails';

import { getBooksQuery } from '../queries/queries';

const BookList = (props) => {

  const [selectedBook, setSelectedBook] = useState(null)

  const displayBooks = () => {
    var data = props.data;

    if (data.loading) {
      return (<div>Loading Books...</div>);
    } else {
      return data.books.map((book) => {
        return <li key={book.id} onClick={(e) => setSelectedBook(book.id)}>{book.name}</li>
      })
    }
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
