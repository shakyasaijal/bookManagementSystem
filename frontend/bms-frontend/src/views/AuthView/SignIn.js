import React, { useState } from 'react';
import { signIn } from './Components/Validation';

const SignIn = () => {
    const initialState = {
        email: '',
        password: ''
    }
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(initialState);

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
            // Submit
            setState(initialState);
        }
    }
    return (
        <div className="row">
            <div className="signIn center">
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

export default SignIn;
