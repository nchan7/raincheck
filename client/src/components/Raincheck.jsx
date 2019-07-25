import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// Sourced code from https://medium.com/@maison.moa/create-a-simple-weather-app-using-node-js-express-and-react-54105094647a

// let weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/' + trail.latitude + ',' + trail.longitude;
//                 axios.get(weatherUrl).then( function (results) {
//                     let name = trail.name;
//                     let weather = results.data.daily.data.map( function(temp) {
//                         return temp.temperatureMax;
//                     })
class Raincheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currently: null,
            hourly: null,
            daily: null
        }
        this.getWeatherData = this.getWeatherData.bind(this)
    }

    getWeatherData() {
        console.log('Yay! Component did mount')
        let trip = this.props.user.trips.find((trip) => {
            return trip._id === this.props.match.params.id
        })
        let config = {
            headers: {
              Authorization: `Bearer ${this.props.token}`
            }
        }
        console.log('Just before axios call on the front end')
        axios.get(`/trips/${trip._id}`, config).then(results => {
            console.log('After axios call')
            this.setState({
                currently: results.data.currently,
                hourly: results.data.hourly,
                daily: results.data.daily
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getWeatherData()
    }

    render () {
        let trip = this.props.user.trips.find((trip) => {
            return trip._id === this.props.match.params.id
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
                    <h3>weather data goes here!</h3><br/>
                    <h3>Current Weather: {this.state.currently}</h3>
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
            <Link to={`/trips/mytrips`}> {' '}
                <button className="button">My Back Trip</button>
            </Link>

            <Link to={`/trips/${props.match.params.id}/edit`}> {' '}
                <button className="button">Edit this trip</button>
            </Link>


        </>
        )
    }
}

// const Raincheck = (props) => {
//     let trip = props.user.trips.find((trip) => {
//         return trip._id === props.match.params.id
//     })
    
//     return (
//         <>
//             {/* render the user start time plus and minus the travel time to get the weather data through out the trip
//             so on this page we will need to show the total time length depending on the input and weather
    
//             * 4 different divs

//             * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


//             <h1 className="App"> Morning weather route: {trip.tripName}</h1>

//             <div className="Flex">

//                 <div className="Starttime">
//                     <h2>Start Time: {trip.startTime}</h2>
//                     <h2> Travel Time: {trip.travelTime}</h2>
//                     <h3>weather data goes here!</h3>
//                 </div>


//                 <div className="Traveltime">
//                     <h2>Return Time: {trip.returnTime}</h2>
//                     <h2> Return Travel Time: {trip.returnTravelTime}</h2>
//                     <h3>weather data goes here!</h3>

//                 </div>

//             </div>


//             <h1 className="App"> Evening weather route: {trip.tripName}</h1>

//             <div className="Flextwo">

//                 <div className="Returntime">
//                     <h2>Start Time: {trip.startTime}</h2>
//                     <h2> Travel Time: {trip.travelTime}</h2>
//                     <h3>weather data goes here!</h3>
//                 </div>


//                 <div className="ReturnTravel">

//                     <h2>Return Time: {trip.returnTime}</h2>
//                     <h2> Return Travel Time: {trip.returnTravelTime}</h2>
//                     <h3>weather data goes here!</h3>

//                 </div>

//             </div>
//             <Link to={`/trips/mytrips`}> {' '}
//                 <button className="button">My Back Trip</button>
//             </Link>


//         </>
//     )
// }

export default Raincheck;