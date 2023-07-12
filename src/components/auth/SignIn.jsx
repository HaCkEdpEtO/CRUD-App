import React, { Component } from 'react';
import { signIn } from '../../actions/auth.Actions';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Sign.css';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    };

    render() {
        const { uid } = this.props;
        if (uid) return <Navigate to='/' />;
        return (
            <>
                <form
                    className="container"
                    autoComplete="off"
                    style={{
                        margin: 'auto',
                        marginTop: '130px',
                        padding: '55px 0 40px 0',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                    onSubmit={this.handleSubmit}
                >
                    <legend>
                        <h4 className="form-label-signin">Sign In</h4>
                    </legend>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label-sign">
              enter email
                        </label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label-sign">
              enter password
                        </label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                    </div>
                    <input type='submit' className='submit-signin' value='SignIn' />
                </form>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const uid = state.firebase.auth.uid;
    return {
        uid: uid,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
