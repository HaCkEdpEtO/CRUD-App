import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { removeTask, toggleChecked } from '../../actions/taskActions';
import Check from './Check';
import { Link } from 'react-router-dom';


const Task = ({ task, removeTask, toggleChecked, index }) => {
    const handleRemove = () => {
        removeTask(task);
    };

    const handleCheck = () => {
        toggleChecked(task);
    };

    const truncatedTitle = task.title ? task.title.substring(0, 20) : '';
    const truncatedBody = task.body ? task.body.substring(0, 20) : '';

    return (
        <>
            <tr>
                <th style={task.checked ? { backgroundColor: 'silver', color: 'green' } : {}} scope='row'>{index} </th>
                <th style={task.checked ? { backgroundColor: 'silver', color: 'green'} : {}}>{truncatedTitle}</th>
                <th style={task.checked ? { backgroundColor: 'silver' , color: 'green'	 } : {}}>{truncatedBody}</th>
                <td style={task.checked ? { backgroundColor: 'silver', color: 'green' } : {}}>{moment(task.date.toDate()).calendar()}</td>
                <td style={task.checked ? { backgroundColor: 'silver', textAlign: 'center' } : { textAlign: 'center' }}>
                    <Check onClick={handleCheck} checked={task.checked} />
                </td>
                <td style= {task.checked ? { backgroundColor: 'silver', textAlign: 'center' } : { textAlign: 'center' }}> 

                    <Link to={`/item/${task.id}`}>
                        <span className='material-symbols-outlined ' 
                            style={{ cursor: 'pointer' }}>
                    edit_note
                        </span>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                        className='material-symbols-outlined text-danger'
                        style={{ cursor: 'pointer' }}
                        onClick={handleRemove}
                    >
                    delete
                    </span>
                    
                </td>
            </tr>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTask: (task) => dispatch(removeTask(task)),
        toggleChecked: (task) => dispatch(toggleChecked(task)),
    };
};

export default connect(null, mapDispatchToProps)(Task);
