import { toast } from 'react-toastify';

const authReducer = (state={}, action) =>{
    switch(action.type){
    case 'SIGN_IN':
        toast('welcome back x)');
        return state;
    case 'SIGN_IN_ERR':
        toast.error('sign in error');
        return state;
    case 'SIGN_OUT':
        toast('sign out');
        return state;
    case 'SIGN_UP':
        toast('successful');
        return state;
    case 'SIGN_UP_ERR':
        toast.error('sign up error');
        return state;
    default:
        return state;
    }
};

export default authReducer;