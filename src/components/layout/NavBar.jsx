import React from 'react';
import { Link } from 'react-router-dom';
import NavItems from './NavItems';
import { connect } from 'react-redux';
import './NavbarStyles.css';
import { Component } from 'react';

class NavBar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return (
            <nav className='NavbarItems'>
                <Link to="/" className="navbar-brand">
                    <h3>CRUD app</h3>
                </Link>

                <div className='menu-icons' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <NavItems/>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        state: state
    };
};

export default connect(mapStateToProps)(NavBar);
