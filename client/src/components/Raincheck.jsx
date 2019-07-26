import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
            currentTemp: null,
            currentTime: null,
            hourlyTime: null,
            hourlyTemp: null,
            hourlyPrecip: null,
            startTime: null,
            startTripEndTime: null,
            returnTime: null,
            returnTripEndTime: null
        }
        this.getWeatherData = this.getWeatherData.bind(this)
    }

    getWeatherData() {
        // console.log('Yay! Component did mount')
        let trip = this.props.user.trips.find((trip) => {
            return trip._id === this.props.match.params.id
        })

        let startTripEndTime = moment(trip.startTime).add(trip.travelTime, 'minutes')
        let returnTripEndTime = moment(trip.returnTime).add(trip.returnTravelTime, 'minutes');
        // console.log(returnTripEndTime)
        this.setState({
            startTime: moment(trip.startTime),
            startTripEndTime,
            returnTime: moment(trip.returnTime),
            returnTripEndTime
        })


        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        // console.log('Just before axios call on the front end', trip._id)
        let url = `/trips/${trip._id}`
        // console.log(url)
        axios.get(url, config).then(results => {
            // console.log('After axios call', results.data)

            var hourlyTime = results.data.weather.hourly.data.map(data => data.time);
            var hourlyTemp = results.data.weather.hourly.data.map(data => data.temperature);
            var hourlyPrecip = results.data.weather.hourly.data.map(data => data.precipProbability);



            this.setState({
                currentTemp: results.data.weather.currently.temperature,
                currentTime: results.data.weather.currently.time,
                hourlyTime: hourlyTime,
                hourlyTemp: hourlyTemp,
                hourlyPrecip: hourlyPrecip

            })
        }).catch(err => {
            console.log(err)
        })
        // let time = moment.unix(this.state.hourlyTime[0])
        // console.log(time)
    }

    componentDidMount() {
        this.getWeatherData()
    }


    render() {

        let trip = this.props.user.trips.find((trip) => {
            return trip._id === this.props.match.params.id

            // Life cycle 
            // Set the state to what we want
            // Or do some functions here before the return
            // Make object an array and map the array    
        })
        // let travelTimeHours = Math.floor(trip.travelTime/60)
        // let travelTimeMinutes = trip.travelTime % 60;

        // let currentTime = moment(this.state.currentTime).format('LT');
        // let timeDifference = moment.duration((this.state.startTime).diff).asHours();
        // console.log(timeDifference)
        // let time = moment.unix(this.state.hourlyTime[0])
        // console.log(time)

        // console.log(currentTime)


        return (
            <>
                {/* render the user start time plus and minus the travel time to get the weather data through out the trip
            so on this page we will need to show the total time length depending on the input and weather
    
            * 4 different divs

            * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


                {/* <h1 className="App"> Morning weather route: {trip.tripName}</h1> */}
                <h1 className="App"> Trip: {trip.tripName}</h1>

                <div className="Flex">

                    <div className="Starttime">
                        <h2>Start Time: {moment(trip.startTime).format('LT')}</h2>
                        {/* <h2>Travel Time: {moment(this.state.startTripEndTime).format('LT')}</h2> */}
                        <h3>Temperature: {Math.round(this.state.currentTemp)}</h3>
                        <h3>Get out your lawn chairs! It's going to be beautiful.</h3>
                        <h3>0% Chance of Precipitation</h3>



                    </div>



                    <div className="Traveltime">
                        <h2>Estimated Arrival Time: {moment(this.state.startTripEndTime).format('LT')}</h2>
                        {/* <h2> Return Travel Time: {moment(trip.returnTripEndTime).format('LT')}</h2> */}
                        <h3>Temperature: 70</h3>
                        <h3>Bring an umbrella! 60% Chance of Precipitation</h3>


                    </div>

                </div>


                {/* <h1 className="App"> Evening weather route: {trip.tripName}</h1> */}
                <h1 className="App"> Return Trip</h1>

                <div className="Flextwo">




                    <div className="Returntime">
                        <h2>Start Time: {moment(trip.returnTime).format('LT')}</h2>
                        {/* <h2> Travel Time: {trip.returnTravelTime}</h2> */}
                        <h3>Temperature: 63</h3>
                        <h3>No rain in the forecast</h3>
                        <h3>0% Chance of Precipitation</h3>

                    </div>


                    <div className="ReturnTravel">

                        <h2>Estimated Arrival Time: {moment(this.state.returnTripEndTime).format('LT')}</h2>
                        {/* <h2> Return Travel Time: {trip.returnTravelTime}</h2> */}
                        <h3>Temperature: 69</h3>
                        <h3>Slight chance of rain</h3>
                        <h3>20% Chance of Precipitation</h3>

                    </div>

                </div>
                <Link to={`/trips/mytrips`}> {' '}
                    <button className="button">My Back Trip</button>
                </Link>

                <Link to={`/trips/${this.props.match.params.id}/edit`}> {' '}
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