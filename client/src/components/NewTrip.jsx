import React from 'react';

const NewTrip = props => {
    return (
        <>
        {/* // Let's return the form that allows people to save a trip. Below is sample code*/}
        <div className="Login">
                <h3>Create a New Trip</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleEmailChange}
                            value={props.trips.zip}
                            type="number"
                            name="email"
                            placeholder="Enter your email..." /><br />
                    <input onChange={this.handlePasswordChange}
                            value={this.state.password}
                            type="password"
                            name="password"
                            placeholder="Enter your password..." /><br />
                    <input type="submit" value="Log in!" />
                </form>
            </div>
        </>
    )

}

export default NewTrip;
