import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import NavBar from './components/layout/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/layout/Footer';
import AddTask from './components/tasks/AddTask';

function App() {
    return (
        <div>
            <div className="body">
                <BrowserRouter>
                    <ToastContainer position='top-center'/>
                    <NavBar/>
                    <Routes>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/item/:id' element={<AddTask/>}/>
                        <Route path='/signin' element={<SignIn/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
            
        </div>
    );
}

export default App;
