import React, { Component } from 'react';
import { signUp } from '../../actions/auth.Actions';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Sign.css';

class SignUp extends Component {
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
        this.props.signUp(this.state);
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
                        <h4 className="form-label-signin">Sign Up</h4>
                    </legend>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label-sign">
              enter new email
                        </label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label-sign">
              enter new password
                        </label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="submit-signup">SignUp</button>
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
        signUp: (creds) => dispatch(signUp(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
