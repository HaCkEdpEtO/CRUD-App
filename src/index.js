import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from './Reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {getFirebase, ReactReduxFirebaseProvider} from 'react-redux-firebase';
import firebase from './config/firebaseConfig';
import {createFirestoreInstance} from 'redux-firestore';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase})));

const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth))
        return (
            <div className="text-center">
                <div
                    className="spinner-grow"
                    style={{ width: '15rem', height: '15rem' }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store = {store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <AuthIsLoaded>
                    <App />
                </AuthIsLoaded>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>
);