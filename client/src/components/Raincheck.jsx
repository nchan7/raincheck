import React from 'react';

const Raincheck = (props) => {
    return (
        <>
            {/* render the user start time plus and minus the travel time to get the weather data through out the trip
            so on this page we will need to show the total time length depending on the input and weather
    
            * 4 different divs

            * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


            <h1 className="App"> Morning weather route: {props.user.trips[0].tripName}</h1>

            <div class="starttime" className="App">
                <h2>Start Time: {props.user.trips[0].startTime}</h2>
                <h2> Travel Time: {props.user.trips[0].travelTime}</h2>
                <h3>weather data goes here!</h3>
            </div>

            <hr />
            <div class="traveltime" className="App">
                <h2>Return Time: {props.user.trips[0].returnTime}</h2>
                <h2> Return Travel Time: {props.user.trips[0].returnTravelTime}</h2>
                <h3>weather data goes here!</h3>

            </div>
            <br/>
            <hr />
            <h1 className="App"> Evening weather route: {props.user.trips[0].tripName}</h1>
            <div class="returntime" className="App">
                <h2>Start Time: {props.user.trips[0].startTime}</h2>
                <h2> Travel Time: {props.user.trips[0].travelTime}</h2>
                <h3>weather data goes here!</h3>
            </div>

            <hr />
            <div class="returntravel" className="App">

                <h2>Return Time: {props.user.trips[0].returnTime}</h2>
                <h2> Return Travel Time: {props.user.trips[0].returnTravelTime}</h2>
                <h3>weather data goes here!</h3>

            </div>
            
            <button className="App">My Back Trip</button>

        </>
    )
}

export default Raincheck;