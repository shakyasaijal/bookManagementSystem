import React from 'react';
import { Link } from 'react-router-dom';
import { getImageBasePath } from '../config/config';

const Cards = props => {
    const data = props.data.data;

    return (
        <div className="row">
            <div className="cards-container">
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
                    ) : <>Loading....</>
                }
            </div>
        </div>
    );
}

export default Cards;