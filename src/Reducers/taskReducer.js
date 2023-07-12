import { toast } from 'react-toastify';


const taskReducer = (state = {}, action)=>{
    switch(action.type){
    case 'ADD_TASK':{
        toast.success('added a item');
        return state;
    }
    case 'ADD_TASK_ERR':{
        toast.error('erooor');
        return state;
    }
    case 'REMOVE_TASK':{
        toast.warn('item has been deleted');
        return state;
    }
    case 'REMOVE_TASK_ERR':{
        toast.error('delete error');
        return state;
    }
    case 'TOGGLE_CHECKED':{
        toast.info('important has been changed');
        return state;
    }
    case 'TOGGLE_CHECKED_ERR':{
        toast.error('change error');
        return state;
    }
    case 'UPDATE_TASK':{
        toast.success('item has been updated');
        return state;
    }
    case 'UPDATE_TASK_ERR':{
        toast.error('erooor');
        return state;
    }
    default: return state;
    }
};

export default taskReducer;