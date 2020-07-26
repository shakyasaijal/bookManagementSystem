import React from 'react';

const SignIn = () => {
    const handleSubmit = e => {
        e.preventDefault();
        
    }
    return (
        <div className="row">
            <div className="signIn center">
                <div className="page-title">Sign In</div>
                <div className="signIn-container">
                    <form method="POST" onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <div className="label">Email</div>
                            <input type="email" name="email" className="form-control" autoComplete="off" />
                            <div className="error">Email is required.</div>
                        </div>
                        <div className="form-group">
                            <div className="label">Password</div>
                            <input type="password" name="password" className="form-control" autoComplete="off" />
                            <div className="error">Password is required.</div>
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
