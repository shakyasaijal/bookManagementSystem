import React from 'react';
import { bookDetails } from '../../constants/constants';
import PopularBooks from '../../components/PopularBooks';

const BooksDetails = () => {
    const data = bookDetails()[0];
    return (
        <>
            <section className="row book-details">
                <div className="container">
                    <div className="left">
                        <div className="image-container">
                            <img src={data.image} alt={data.title} />
                        </div>
                        <div className="content">
                            <div className="publisher">Published By: {data.postedBy}</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="book-name">{data.title} by <span className="author">{data.author}</span></div>
                        <div className="information ">
                            <div className="info">
                                <div className="value">{data.views}</div>
                                <div className="label">Views</div>
                            </div>
                            <div className="info">
                                <div className="value">{data.subject}</div>
                                <div className="label">Subject</div>
                            </div>
                            <div className="info">
                                <div className="value">{data.chapter}</div>
                                <div className="label">Chapter</div>
                            </div>
                            <div className="info">
                                <div className="value">{data.grade}</div>
                                <div className="label">Grade</div>
                            </div>
                        </div>
                        <div className="description">
                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                        </div>
                    </div>
                </div>
            </section>
            <PopularBooks/>
        </>
    );
}

export default BooksDetails;
