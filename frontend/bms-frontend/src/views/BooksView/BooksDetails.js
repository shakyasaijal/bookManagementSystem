import React from 'react';
import { Link } from 'react-router-dom';
import PopularBooks from '../../components/PopularBooks';
import { getBooksById, deleteBook } from '../../actions/books';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getImageBasePath } from '../../config/config';
import { loadNotification } from '../../actions/notification';

const BooksDetails = (props) => {
    React.useEffect(() => {
        props.getBooksById(props.match.params.id)
    }, [props.match.params.id]);

    if (props.notification === "Book successfully deleted.") {
        props.loadNotification(props.notification, props.notificationType);
        return <Redirect to='/' />;
    }

    let data = props.notificationType ? props.getBooks : '';

    if (!props.notificationType && props.notification === "Data not found") {
        props.loadNotification(props.notification, props.notificationType);
        return <Redirect to='/' />;
    }

    Object.keys(data).map((i, v) => data[i].author)
    const currentUser = props.isAuthenticated ? parseInt(localStorage.getItem('user_id')) : ''


    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete the Book?")) {
            props.deleteBook(props.match.params.id);
        }
    }

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
                            {
                                currentUser && data.data.userId === currentUser && <div className="options flex text-center">
                                    <div className="edit"><div><Link to={`/edit-book/${props.match.params.id}`} className="edit-btn center">Edit</Link></div></div>
                                    <div className="delete"><div className="delete-btn center" onClick={handleDelete}>Delete</div></div>
                                </div>
                            }

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
    getBooks: state.books.bookById,
    isAuthenticated: state.auth.isAuthenticated,
    flash: state.notification.notification,
    type: state.notification.type
});

export default connect(mapStateToProps, { getBooksById, loadNotification, deleteBook })(BooksDetails);
