import React from 'react';
import { Link } from 'react-router-dom';

const Cards = props => {
    const { data } = props;
    return (
        <div className="row">
            <div className="cards-container">
                {
                    data.map((card, index) =>
                        <Link to={`/book/${card.id}`} className="cards" key={index}>
                            <div className="image-container center">
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className="content">
                                <div className="book-name text-center">
                                    {card.title}
                                </div>
                                <div className="author text-center">
                                    - {card.author}
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default Cards;