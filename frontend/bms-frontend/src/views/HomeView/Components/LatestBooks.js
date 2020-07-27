import React from 'react';
import { latestBooks } from '../../../constants/constants';
import Cards from '../../../components/Cards';
import { getBooks as fetchSomeBooks } from '../../../actions/books';
import { connect } from 'react-redux';


const LatestBooks = props => {
    const data = latestBooks();

    React.useEffect(() => {
        props.fetchSomeBooks();
    }, []);

 
    return (
        <section className="row">
            <div className="page-title">Latest Books</div>
            <Cards data={props.getBooks} />
        </section>
    );
}


const mapStateToProps = state => ({
    getBooks: state.books.getBooks,
    error: state.books.error,
    success: state.books.success
});

export default connect(mapStateToProps, { fetchSomeBooks })(LatestBooks);

