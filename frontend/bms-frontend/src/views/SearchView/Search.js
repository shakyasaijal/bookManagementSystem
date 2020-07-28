import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchData } from '../../constants/constants';
import SearchResult from './Components/SearchResult';
import Filter from './Components/Filter';
import { searchBooks } from '../../actions/books';

const Search = props => {
    const data = searchData()[0];
    const [state, setState] = useState({ searchFor: '', data: null })

    const handleChange = e => {
        setState({ searchFor: e.target.value })
    }

    useEffect(() => {
        const timeOut = setTimeout(() => props.searchBooks(state.searchFor), 2000);
        return () => clearTimeout();
    }, [state.searchFor]);

    useEffect(() => {
        if (props.searchData !== null) {
            setState({ ...state, data: props.searchData })
        }
    }, [props.searchData]);

    return (
        <div className="row">
            <div className="search">
                <div className="page-title">Search</div>
                <div className="row search-container center">
                    <div className="form-group">
                        <input type="text" placeholder="Search" value={state.searchFor} onChange={handleChange} className="form-control" autoComplete="off" autoFocus />
                    </div>
                </div>
                <div className="result-container">
                    <Filter chapter={props.allChapters} subject={props.allSubjects} grade={props.allGrades} />
                    {state.data !== null ? <SearchResult data={state.data} /> : <>Loading...</>}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    searchData: state.books.searchData,
    notification: state.auth.notification,
    notificationType: state.auth.notificationType,
    allGrades: state.books.allGrades,
    allSubjects: state.books.allSubjects,
    allChapters: state.books.allChapters
})

export default connect(mapStateToProps, { searchBooks })(Search);
