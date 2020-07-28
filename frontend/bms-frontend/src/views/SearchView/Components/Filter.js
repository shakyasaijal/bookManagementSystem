import React, { useState, useEffect } from 'react';

const Filter = props => {
    const [state, setState] = useState({ grades: null, subjects: null, chapters: null })
    const { grade, subject, chapter, filter, clear } = props;

    const handleChange = (e, filterFor) => {
        if (filterFor === "grade") {
            let allGrade = document.querySelectorAll('.grades:checked');
            let grades = [];
            for (let i = 0; i < allGrade.length; i++) {
                grades.push(parseInt(allGrade[i].value))
            }
            setState({ ...state, grades: grades })
        }
        else if (filterFor === "subject") {
            let allSubjects = document.querySelectorAll('.subjects:checked');
            let subjects = [];
            for (let i = 0; i < allSubjects.length; i++) {
                subjects.push(parseInt(allSubjects[i].value))
            }
            setState({ ...state, subjects: subjects })
        }
        else if (filterFor === "chapter") {
            let allChapters = document.querySelectorAll('.chapters:checked');
            let chapters = [];
            for (let i = 0; i < allChapters.length; i++) {
                chapters.push(allChapters[i].value)
            }
            setState({ ...state, chapters: chapters })
        }

    }

    useEffect(() => {
        filter(state.grades, state.subjects, state.chapters);
    }, [state.grades, state.chapters, state.subjects])

    return (
        <div className="row filter">
            {
                grade && <div className="filter-group">
                    <div className="filter-title">Grade</div>
                    <div className="filter-content">
                        {
                            grade.map((data, index) => (
                                <div key={index}>
                                    <input type="checkbox" className="grades" onChange={e => handleChange(e, "grade")} name="checkbox[]" value={data.id} /> {data.name}
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
                                    <input type="checkbox" className="chapters" onChange={e => handleChange(e, "chapter")} value={data} /> {data}
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
                                    <input type="checkbox" className="subjects" onChange={e => handleChange(e, "subject")} value={data.id} name="checkbox" /> {data.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            {
                subject || chapter || grade ? <div onClick={clear} className="clear">Clear Filter</div> : ''
            }
        </div>
    );
}

export default Filter;
