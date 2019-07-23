import React from 'react';

const Raincheck = (props) => {
    return (
        <>
            {/* render the user start time plus and minus the travel time to get the weather data through out the trip
            so on this page we will need to show the total time length depending on the input and weather
    
            * 4 different divs

                trip: {
        tripName: 'seattle',
        zipStart: '',
        latStart: '',
        longStart: '',
        startTime: '8:00 am',
        travelTime: '30 min',
        zipDest: '',
        latDest: '',
        longDest: '',
        returnTime: '12:00 pm',
        returnTravelTime: '25 min'
      }


        
            * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


            <h1 className="App"> My current trip: {props.trip.tripName}</h1>

            <div class="starttime">
                <h2>Start Time: {props.trip.startTime}</h2>
                <h2> Travel Time: {props.trip.travelTime}</h2>
                <h3>weather data goes here!</h3>
            </div>

            <hr/>
            <div class="traveltime">


            </div>

            <hr/>
            <div class="returntime">
                <h2>Return Time: {props.trip.returnTime}</h2>
                <h2> Return Travel Time: {props.trip.returnTravelTime}</h2>
                <h2>weather data goes here!</h2>
            </div>


            <div class="returntravel">


            </div>



        </>
    )
}

export default Raincheck;