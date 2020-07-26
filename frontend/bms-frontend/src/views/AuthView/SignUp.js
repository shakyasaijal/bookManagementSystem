import React from 'react';

const SignUp = () => {
    const handleSubmit = e => {
        e.preventDefault();

    }
    return (
        <div className="row">
            <div className="signIn center">
                <div className="page-title">Sign Up</div>
                <div className="signIn-container">
                    <form method="POST" onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <div className="label">First Name</div>
                            <input type="text" name="first_name" className="form-control" autoComplete="off" />
                            <div className="error">First Name is required.</div>
                        </div>
                        <div className="form-group">
                            <div className="label">Last Name</div>
                            <input type="text" name="last_name" className="form-control" autoComplete="off" />
                            <div className="error">Last Name is required.</div>
                        </div>
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
                            <button type="submit" className="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
