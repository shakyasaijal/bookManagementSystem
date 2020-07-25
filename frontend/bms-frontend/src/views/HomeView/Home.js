import React from 'react';
import PopularBooks from '../../components/PopularBooks';
import LatestBooks from './Components/LatestBooks';

const Home = () => {
    return (
        <>
            <PopularBooks />
            <LatestBooks />
        </>
    );
}

export default Home;
