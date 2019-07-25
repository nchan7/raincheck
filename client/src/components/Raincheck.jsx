import React from 'react';


// let weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/' + trail.latitude + ',' + trail.longitude;
//                 axios.get(weatherUrl).then( function (results) {
//                     let name = trail.name;
//                     let weather = results.data.daily.data.map( function(temp) {
//                         return temp.temperatureMax;
//                     })


const Raincheck = (props) => {
    let trip = props.user.trips.find((trip) => {
        return trip._id === props.match.params.id
    })
    
    return (
        <>
            {/* render the user start time plus and minus the travel time to get the weather data through out the trip
            so on this page we will need to show the total time length depending on the input and weather
    
            * 4 different divs

            * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


            <h1 className="App"> Morning weather route: {trip.tripName}</h1>

            <div className="Flex">

                <div className="Starttime">
                    <h2>Start Time: {trip.startTime}</h2>
                    <h2> Travel Time: {trip.travelTime}</h2>
                    <h3>weather data goes here!</h3>
                </div>


                <div className="Traveltime">
                    <h2>Return Time: {trip.returnTime}</h2>
                    <h2> Return Travel Time: {trip.returnTravelTime}</h2>
                    <h3>weather data goes here!</h3>

                </div>

            </div>


            <h1 className="App"> Evening weather route: {trip.tripName}</h1>

            <div className="Flextwo">

                <div className="Returntime">
                    <h2>Start Time: {trip.startTime}</h2>
                    <h2> Travel Time: {trip.travelTime}</h2>
                    <h3>weather data goes here!</h3>
                </div>


                <div className="ReturnTravel">

                    <h2>Return Time: {trip.returnTime}</h2>
                    <h2> Return Travel Time: {trip.returnTravelTime}</h2>
                    <h3>weather data goes here!</h3>

                </div>

            </div>
            <button className="button">My Back Trip</button>


        </>
    )
}

export default Raincheck;