import React, { useState } from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import './Tasks.css';

const Tasks = ({ tasks }) => {
    const [sortBy, setSortBy] = useState('-date');
    const [filters, setFilters] = useState({
        title: '',
        body: '',
        checked: '',
    });

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortBy(`-${column}`);
        } else {
            setSortBy(column);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const filteredTasks = tasks && tasks.filter((task) => {
        const { title, body, checked } = filters;
        return (
            (!title || (task.title && task.title.toLowerCase().includes(title.toLowerCase()))) &&
            (!body || (task.body && task.body.toLowerCase().includes(body.toLowerCase()))) &&
            (checked === '' || (checked === 'true' && task.checked) || (checked === 'false' && !task.checked))
        );
    });

    const sortedTasks = filteredTasks && filteredTasks.slice().sort((a, b) => {
        if (sortBy === 'title' || sortBy === '-title') {
            const titleA = a.title ? a.title.toLowerCase() : '';
            const titleB = b.title ? b.title.toLowerCase() : '';
            if (sortBy === 'title') {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        } else if (sortBy === 'body' || sortBy === '-body') {
            const bodyA = a.body ? a.body.toLowerCase() : '';
            const bodyB = b.body ? b.body.toLowerCase() : '';
            if (sortBy === 'body') {
                return bodyA.localeCompare(bodyB);
            } else {
                return bodyB.localeCompare(bodyA);
            }
        } else if (sortBy === 'checked' || sortBy === '-checked') {
            if (sortBy === 'checked') {
                return a.checked - b.checked;
            } else {
                return b.checked - a.checked;
            }
        } else if (sortBy === 'date' || sortBy === '-date') {
            const dateA = a.date ? a.date.toDate() : '';
            const dateB = b.date ? b.date.toDate() : '';
            if (sortBy === 'date') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        } else {
            return a.index - b.index;
        }
    });

    return (
        <>
            <div className="filters-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Filter by title"
                    value={filters.title}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="body"
                    placeholder="Filter by body"
                    value={filters.body}
                    onChange={handleFilterChange}
                />
                <select name="checked" value={filters.checked} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="true">Checked</option>
                    <option value="false">Unchecked</option>
                </select>
            </div>
            <table className='table-responsive' style={{ marginTop: '30px' }}>
                <thead>
                    <tr className="text-info">
                        <th scope="col">#</th>
                        <th scope="col" onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                            Title {sortBy === 'title' ? <span>&uarr;</span> : sortBy === '-title' ? <span>&darr;</span> : null}
                        </th>
                        <th scope="col" onClick={() => handleSort('body')} style={{ cursor: 'pointer' }}>
                            Body {sortBy === 'body' ? <span>&uarr;</span> : sortBy === '-body' ? <span>&darr;</span> : null}
                        </th>
                        <th scope="col" onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                            Added {sortBy === 'date' ? <span>&uarr;</span> : sortBy === '-date' ? <span>&darr;</span> : null}
                        </th>
                        <th scope="col" onClick={() => handleSort('checked')} style={{ textAlign: 'center', cursor: 'pointer'}}>
                            Important {sortBy === 'checked' ? <span>&uarr;</span> : sortBy === '-checked' ? <span>&darr;</span> : null}
                        </th>
                        <th scope="col" style={{ textAlign: 'center' }}>Detail / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks &&
                        sortedTasks.map((task, index) => (
                            <Task task={task} index={index + 1} key={task.id} />
                        ))}
                </tbody>
            </table>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        uid: state.firebase.auth.uid,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'tasks',
            where: ['authorId', '==', ownProps.uid],
            orderBy: ['date', 'desc'],
        },
    ])
)(Tasks);
