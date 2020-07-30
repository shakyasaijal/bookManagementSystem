import React, { useState } from 'react';
import { connect } from 'react-redux';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { addValidation } from './Validation';
import { getBooksById, editBook } from '../../../actions/books';
import { getImageBasePath } from '../../../config/config';
import { loadNotification, clearNotification } from '../../../actions/notification';
import { Redirect } from 'react-router-dom';
import PATHS from '../../../routes';

const animatedComponents = makeAnimated();

const EditBook = props => {

    // Get Books Details 
    React.useEffect(() => {
        props.getBooksById(props.match.params.id);
    }, [props.match.params.id]);

    React.useEffect(() => {
        props.loadNotification(props.notification, props.notificationType);
        window.scroll(0, 0);
        if (state.image) {
            window.location.reload()
        }
    }, [props.notification])



    const initialState = {
        title: '',
        grade: '',
        subject: {},
        author: [],
        chapter: '',
        image: '',
        description: '',
        id: props.match.params.id
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
    const [dbData, setData] = useState({ grades: null, subjects: null, authors: null, image: null, loaded: false, id: null });

    React.useEffect(() => {
        let data = props.getBooks
        if (Object.keys(data).length > 0) {
            setState({
                ...state,
                title: data.data.title,
                grade: data.data.grade,
                subject: data.data.subjectObj,
                author: data.data.authorObj,
                chapter: data.data.chapter,
                description: data.data.description,
            })
            setData({
                ...dbData,
                grades: data.data.grades,
                subjects: data.data.subjects,
                authors: data.data.authors,
                image: getImageBasePath(data.data.image),
                id: data.data.userId,
                loaded: true
            })
            if (dbData.id) {
                setData({
                    ...dbData,
                    loaded: true
                })
            }
        }
    }, [props.getBooks]);


    if (!props.isAuthenticated) {
        return <Redirect to={PATHS.SIGN_IN} />;
    }


    if (dbData.loaded) {
        if (parseInt(localStorage.getItem('user_id')) !== dbData.id) {
            return <Redirect to='/' />;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        setError({});
        let validation = addValidation(state, "edit");
        if (validation.length > 0) {
            let val = {};
            for (let i = 0; i < validation.length; i++) {
                val[validation[i].error] = validation[i].errorValue;
            }
            setError({ ...error, ...val });
            window.scroll(0, 0);
        }
        else {
            props.editBook(state);
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

                {props.flash && <div className={props.type ? "success" : "invalid"}>{props.flash} <div className="close" onClick={props.clearNotification}>x</div></div>}
                <div className="page-title">Edit Book</div>
                {
                    dbData.loaded ? <div className="add center signIn-container">
                        <form method="POST" onSubmit={e => handleSubmit(e)} encType="multipart/form-data">
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
                                    <Creatable options={dbData.subjects} value={state.subject} onChange={handleSubject} />
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
                                        options={dbData.authors}
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
                                <div className="label">Current Image</div>
                                <div className="image-container">
                                    <img src={dbData.image} alt={state.title} />
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="submit">Edit {'&'} Save</button>
                            </div>
                        </form>
                    </div> : <>Loading...</>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    getBooks: state.books.bookById,
    notificationType: state.books.notificationType,
    notification: state.books.notification,
    flash: state.notification.notification,
    type: state.notification.type,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getBooksById, editBook, loadNotification, clearNotification })(EditBook);
