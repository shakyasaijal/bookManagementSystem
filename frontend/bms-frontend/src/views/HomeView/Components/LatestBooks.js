import React from 'react';
import { latestBooks } from '../../../constants/constants';
import Cards from '../../../components/Cards';

const LatestBooks = () => {
    const data = latestBooks();
    return (
        <section className="row">
            <div className="page-title">Latest Books</div>
            <Cards data={data} />
        </section>
    );
}

export default LatestBooks;
