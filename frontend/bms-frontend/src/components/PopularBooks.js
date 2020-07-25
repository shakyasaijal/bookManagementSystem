import React from 'react';
import Cards from './Cards';
import { popularBooks } from '../constants/constants';

const PopularBooks = () => {

    const data = popularBooks();



    return (
        <section className="row">
            <div className="page-title">Popular Books</div>
            <Cards data={data}/>
        </section>
    );
}

export default PopularBooks;
