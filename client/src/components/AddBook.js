import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


const AddBook = (props) => {

    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;

        if (data.loading) {
            return <option disabled>Loading Authors</option>
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    const submitForm = e => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
    }

    return (
        <div>
            <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={e => setNewBook({ ...newBook, name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={e => setNewBook({ ...newBook, genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={e => setNewBook({ ...newBook, authorId: e.target.value })}>
                        <option>Select Author</option>
                        {displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        </div>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);