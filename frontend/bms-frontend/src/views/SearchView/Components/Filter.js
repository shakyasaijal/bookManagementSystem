import React from 'react';

const Filter = props => {
    const { grade, subject, chapter } = props;
    console.log(chapter)
    return (
        <div className="row filter">
            {
                grade && <div className="filter-group">
                    <div className="filter-title">Grade</div>
                    <div className="filter-content">
                        {
                            grade.map((data, index) => (
                                <div key={index}>
                                    <input type="checkbox" name="checkbox" value={data.id} /> {data.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            {
                chapter && <div className="filter-group">
                    <div className="filter-title">Chapter</div>
                    <div className="filter-content">
                        {
                            chapter.map((data, index) => (
                                <div key={index}>
                                    <input type="checkbox" name="checkbox" /> {data}
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            {
                subject && <div className="filter-group">
                    <div className="filter-title">Subject</div>
                    <div className="filter-content">
                        {
                            subject.map((data, index) => (
                                <div key={index}>
                                    <input type="checkbox" name="checkbox" /> {data.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Filter;
