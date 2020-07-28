import React from 'react';
import Cards from './Cards';
import { popularBooks as fetchBooks } from '../actions/books';
import { connect } from 'react-redux';


const PopularBooks = (props) => {

    React.useEffect(() => {
        props.fetchBooks();
    }, []);

    return (
        <section className="row">
            <div className="page-title">Popular Books</div>
            <Cards data={props.books} />
        </section>
    );
}


const mapStateToProps = state => ({
    books: state.books.books,
    error: state.books.error,
    success: state.books.success
});

export default connect(mapStateToProps, { fetchBooks })(PopularBooks);
