import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import { addTask, updateTask } from '../../actions/taskActions';

import './AddEdit.css';

const AddTask = ({ tasks, addTask, updateTask }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const initialState = {
        title: '',
        body: '',
        checked: false,
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (id && tasks && tasks.length > 0) {
            const selectedTask = tasks.find((task) => task.id === id);
            if (selectedTask) {
                setState(selectedTask);
            }
        } else {
            setState(initialState);
        }
        //window.scrollTo(0, 0);
    }, [id, tasks]);
    

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, body } = state;
        if (!title || !body) {
            toast.error('Please fill in both fields');
        } else {
            if (id) {
                updateTask({ ...state, id });
            } else {
                addTask(state);
            }
            document.getElementById('addTaskForm').reset();
            setState(initialState);
            navigate('/');
        }
    };

    return (
        <>
            <form
                id='addTaskForm'
                className='container'
                autoComplete='off'
                style={{
                    margin: 'auto',
                    marginTop: '0px',
                    marginBottom: '0px',
                    padding: '55px 0 40px 0',
                    maxWidth: '400px',
                    textAlign: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <legend>
                    {id ? (
                        <h4 style={{ marginTop: '0px', marginBottom: '20px' }}>Detail</h4>
                    ) : (
                        ''
                    )}
                </legend>
                {id && (
                    <div className='mb-3'>
                        <label htmlFor='id' className='form-label-addtask-detail'>
                            ID: {id}
                        </label>
                    </div>
                )}
                {id && state.date && (
                    <div className='mb-3'>
                        <label htmlFor='created' className='form-label-addtask-detail'>
                            Created: {moment(state.date.toDate()).format('MMMM Do YYYY, h:mm:ss a')}
                        </label>
                    </div>
                )}
                {id && state.date && (
                    <div className='mb-3'>
                        <label htmlFor='created' className='form-label-addtask-detail'>
                            Important: {state.checked ? 'true' : 'false'}
                        </label>
                    </div>
                )}
                {id && (
                    <div className='mb-3'>
                        <label htmlFor='title' className='form-label-addtask-details'>
                            Title
                        </label>
                        <textarea
                            id='title'
                            className='form-control'
                            placeholder='Empty title'
                            value={state.title}
                            readOnly
                            style={{ maxHeight: '300px', minHeight: '60px' }}
                        />
                    </div>
                )}
                {id && (
                    <div className='mb-5'>
                        <label htmlFor='body' className='form-label-addtask-details'>
                        Body
                        </label>
                        <textarea
                            id='body'
                            className='form-control'
                            placeholder='Empty body'
                            value={state.body}
                            readOnly
                            style={{ maxHeight: '300px', minHeight: '80px' }}
                        />
                    </div>
                )}
                
                <legend>
                    {id ? (
                        <h4 style={{ marginTop: '20px', marginBottom: '0px' }}>Update Item</h4>
                    ) : (
                        <h4 style={{ marginBottom: '0px' }}>Create Item</h4>
                    )}
                </legend>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label-addtask'>
                    
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        placeholder='Add a title'
                        value={state.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='body' className='form-label'>
              
                   
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='body'
                        placeholder='Add a body'
                        value={state.body}
                        onChange={handleChange}
                    />
                </div>
                <input type='submit' className='submit' value={id ? 'Update' : 'Create'} />
            </form>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => dispatch(addTask(task)),
        updateTask: (task) => dispatch(updateTask(task)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
