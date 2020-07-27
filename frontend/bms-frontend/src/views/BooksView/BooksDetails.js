import React from 'react';
import PopularBooks from '../../components/PopularBooks';
import { getBooksById } from '../../actions/books';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getImageBasePath } from '../../config/config';
import { loadNotification } from '../../actions/notification';

const BooksDetails = (props) => {
    React.useEffect(() => {
        props.getBooksById(props.match.params.id)
    }, [props.match.params.id]);

    let data = props.notificationType ? props.getBooks : '';

    if (!props.notificationType && props.notification === "Data not found") {
        props.loadNotification(props.notification, props.notificationType);
        return <Redirect to='/' />;
    }

    Object.keys(data).map((i, v) => data[i].author)

    return (
        <>
            {
                data ? <section className="row book-details">
                    <div className="container">
                        <div className="left">
                            <div className="image-container">
                                <img src={getImageBasePath(data.data.image)} alt={data.data.title} />
                            </div>
                            <div className="content">
                                <div className="publisher">Published By: {data.data.postedBy}</div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="book-name">{data.data.title} {data.data.author && <>by <span className="author">{data.data.author.join(', ')}</span></>} </div>
                            <div className="information ">
                                <div className="info">
                                    <div className="value">{data.data.views}</div>
                                    <div className="label">Views</div>
                                </div>
                                <div className="info">
                                    <div className="value">{data.data.subject}</div>
                                    <div className="label">Subject</div>
                                </div>
                                <div className="info">
                                    <div className="value">{data.data.chapter}</div>
                                    <div className="label">Chapter</div>
                                </div>
                                <div className="info">
                                    <div className="value">{data.data.grade}</div>
                                    <div className="label">Grade</div>
                                </div>
                            </div>
                            <div className="description">
                                <div dangerouslySetInnerHTML={{ __html: data.data.description }}></div>
                            </div>
                        </div>
                    </div>
                </section> : <>Loading...</>
            }
            <PopularBooks />
        </>
    );
}

const mapStateToProps = state => ({
    notificationType: state.books.notificationType,
    notification: state.books.notification,
    getBooks: state.books.bookById
});

export default connect(mapStateToProps, { getBooksById, loadNotification })(BooksDetails);
