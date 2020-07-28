import React from 'react';
import { Link } from 'react-router-dom';
import { getImageBasePath } from '../../../config/config';

const SearchResult = props => {
    const { data } = props;
    return (
        <div className="row results">
            <div className="result">
                <div className="cards-container">
                    {
                        data && data.length < 1 && <>No data found.</>
                    }
                    {
                        data ? data.map((card, index) =>
                            <Link to={`/book/${card.id}`} className="cards" key={index}>
                                <div className="image-container center">
                                    <img src={getImageBasePath(card.image)} alt={card.title} />
                                </div>
                                <div className="content">
                                    <div className="book-name text-center">
                                        {card.title}
                                    </div>
                                    <div className="author text-center">

                                    </div>
                                </div>
                            </Link>
                        ): <>Loading...</>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
