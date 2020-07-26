import React from 'react';
import { searchData } from '../../constants/constants';
import SearchResult from './Components/SearchResult';
import Filter from './Components/Filter';

const Search = () => {
    const data = searchData()[0];

    return (
        <div className="row">
            <div className="search">
                <div className="page-title">Search</div>
                <div className="row search-container center">
                    <div className="form-group">
                        <input type="text" placeholder="Search" className="form-control" autoComplete="off" autoFocus />
                    </div>
                </div>
                <div className="result-container">
                    <Filter data={data.filter}/>
                    <SearchResult data={data.data} />
                </div>
            </div>
        </div>
    );
}

export default Search;
