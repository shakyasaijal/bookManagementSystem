import React, { useState } from 'react';
import { connect } from 'react-redux';
import Creatable from 'react-select/creatable';
import { addValidation } from './Validation';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom';
import { getImpData, addBook } from '../../../actions/books';
import { loadNotification } from '../../../actions/notification';

const animatedComponents = makeAnimated();


const AddBook = props => {
    const initialState = {
        title: '',
        grade: '',
        subject: {},
        author: [],
        chapter: '',
        image: '',
        description: ''
    }
    const [state, setState] = useState(initialState);
    const [error, setError] = useState({
        title: '',
        grade: '',
        subject: '',
        author: '',
        chapter: '',
        image: '',
        description: ''
    });

    let subject = [];
    let authors = [];


    React.useEffect(() => {
        props.getImpData();
    }, []);
    React.useEffect(() => {
        props.loadNotification(props.notification, props.notificationType);
    }, [props.notification])

    const subjectDropDown = props.subject.map(k => (
        subject.push(k)
    ));

    const authorDropDown = props.author.map(k => (
        authors.push(k)
    ));


    if (!props.isAuthenticated) {
        return <Redirect to='/sign-in' />;
    }

    const handleSubmit = e => {
        setError({});
        e.preventDefault();
        let validation = addValidation(state);
        if (validation.length > 0) {
            let val = {};
            for (let i = 0; i < validation.length; i++) {
                val[validation[i].error] = validation[i].errorValue;
            }
            setError({ ...error, ...val });
        }
        else {
            props.addBook(state);
            setState(initialState);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        if (name in error) {
            setError({ ...error, [name]: '' })
        }
    }
    const handleSubject = e => {
        if (e.__isNew__) {
            console.log(e)
        }
        else {
            setState({ ...state, subject: e });
        }

        if ('subject' in error) {
            setError({ ...error, subject: '' })
        }
    }

    const handleAuthor = e => {
        setState({ ...state, author: e });
        if ('author' in error) {
            setError({ ...error, author: '' })
        }
    }

    const handleImageChange = e => {
        if (e.target.files[0].name) {
            setState({ ...state, image: e.target.files[0] })
            if ('image' in error) {
                setError({ ...error, image: '' })
            }
        }
    }
    return (
        <div className="row">
            <div className="center">
                {props.flash && <div className={props.type ? "success" : "invalid"}>{props.flash}</div>}
                <div className="page-title">Add Book</div>
                <div className="add center signIn-container">
                    <form method="POST" onSubmit={e => handleSubmit(e)} enctype="multipart/form-data">
                        <div className="col-md">
                            <div className="form-group">
                                <div className="label">Title</div>
                                <input type="text" name="title" value={state.title} onChange={handleChange} className="form-control" autoComplete="off" />
                                {error.title && <div className="error">{error.title}</div>}
                            </div>
                            <div className="form-group">
                                <div className="label">Grade</div>
                                <select name="grade" className="form-control" onChange={handleChange} value={state.grade}>
                                    <option>--Grade--</option>
                                    <option value={1}>Grade 1</option>
                                    <option value={2}>Grade 2</option>
                                    <option value={3}>Grade 3</option>
                                    <option value={4}>Grade 4</option>
                                    <option value={5}>Grade 5</option>
                                    <option value={6}>Grade 6</option>
                                    <option value={7}>Grade 7</option>
                                    <option value={8}>Grade 8</option>
                                    <option value={9}>Grade 9</option>
                                    <option value={10}>Grade 10</option>
                                </select>
                                {error.grade && <div className="error">{error.grade}</div>}
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="form-group">
                                <div className="label">Chapter</div>
                                <input type="text" name="chapter" value={state.chapter} onChange={handleChange} className="form-control" autoComplete="off" />
                                {error.chapter && <div className="error">{error.chapter}</div>}
                            </div>
                            <div className="form-group">
                                <div className="label">Image</div>
                                <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} name="image" className="form-control" />
                                {error.image && <div className="error">{error.image}</div>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-group">
                                <div className="label">Subject</div>
                                <Creatable options={subject} value={state.subject} onChange={handleSubject} />
                                {error.subject && <div className="error">Subject is required.</div>}
                            </div>
                            <div className="form-group">
                                <div className="label">Author</div>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    value={state.author}
                                    onChange={handleAuthor}
                                    options={authors}
                                />
                                {error.author && <div className="error">{error.author}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="label">Description</div>
                            <textarea className="form-control" onChange={handleChange} value={state.description} name="description" rows="2"></textarea>
                            {error.description && <div className="error">{error.description}</div>}
                        </div>

                        <div className="form-group">
                            <button type="submit" className="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    subject: state.books.subject,
    author: state.books.author,
    notification: state.books.notification,
    notificationType: state.books.notificationType,
    flash: state.notification.notification,
    type: state.notification.type
});

export default connect(mapStateToProps, { getImpData, addBook, loadNotification })(AddBook);
