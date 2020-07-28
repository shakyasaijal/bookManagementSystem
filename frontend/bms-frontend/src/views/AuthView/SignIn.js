import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn } from './Components/Validation';
import { login, clearNotificationStarter } from '../../actions/auth';
import { loadNotification, clearNotification } from '../../actions/notification';
import { Redirect } from 'react-router-dom';


const SignIn = props => {

    const initialState = {
        email: '',
        password: ''
    }

    useEffect(() => {
        if (props.notification) {
            props.clearNotificationStarter();
        }
    }, []);
    
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(initialState);

    React.useEffect(() => {
        props.loadNotification(props.notification, props.notificationType);
    }, [props.notification])

    if (props.isAuthenticated) {
        return <Redirect to='/' />;
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        if (name in error) {
            setError({ ...error, [name]: '' })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        let validation = signIn(state);
        if (validation.length > 0) {
            let val = {};
            for (let i = 0; i < validation.length; i++) {
                val[validation[i].error] = validation[i].errorValue;
            }
            setError({ ...error, ...val });
        } else {
            props.login(state.email, state.password);
            setState(initialState);
        }
    }

    return (
        <div className="row">
            <div className="signIn center">
                {props.flash && <div className={props.type ? "success" : "invalid"}>{props.flash} <div className="close" onClick={props.clearNotification}>x</div></div>}
                <div className="page-title">Sign In</div>
                <div className="signIn-container">
                    <form method="POST" onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <div className="label">Email</div>
                            <input type="email" name="email" value={state.email} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.email && <div className="error">{error.email}</div>}
                        </div>
                        <div className="form-group">
                            <div className="label">Password</div>
                            <input type="password" name="password" value={state.password} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.password && <div className="error">{error.password}</div>}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    notificationType: state.auth.notificationType,
    notification: state.auth.notification,
    flash: state.notification.notification,
    type: state.notification.type
});

export default connect(mapStateToProps, { login, loadNotification, clearNotification, clearNotificationStarter })(SignIn);
