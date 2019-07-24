git pull upstream master

// Move Dark Sky to the back end on a get/:id for that trip

class Raincheck extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            originWeather: null,
            destWeather: null
            // originLat: '',
            // originLong: '',
            // originCurrently: null,
            // originMinutely: null,
            // originHourly: null, 
            // originDaily: null,
            // destLat: '',
            // destLong: '',
            // destCurrently: null,
            // destMinutely: null,
            // destHourly: null, 
            // destDaily: null
        }
        // this.getOriginWeather = this.getOriginWeather.bind(this)
        // this.getDestWeather = this.getDestWeather.bind(this)
    }

    // getOriginWeather() {
    //     let weatherUrl = `https://api.darksky.net/forecast/${darkSkyAPI}/${this.props.user.trips[0].latStart},${this.props.user.trips[0].longStart}`
    //     axios.get(weatherUrl).then(results => {
    //         this.setState({
    //             originWeather: results.data
    //             // originLat: results.data.latitude,
    //             // originLong: results.data.longitude,
    //             // originCurrently: results.data.currently,
    //             // originMinutely: results.data.minutely,
    //             // originHourly: results.data.hourly,
    //             // originDaily: results.data.daily,
    //         })
    //     })
    // }


    // getDestWeather() {
    //     let weatherUrl = `https://api.darksky.net/forecast/${darkSkyAPI}/${this.props.user.trips[0].latDest},${this.props.user.trips[0].longDest}`
    //     axios.get(weatherUrl).then(results => {
    //         this.setState({
    //             destWeather: results.data
    //             // destLat: results.data.latitude,
    //             // destLong: results.data.longitude,
    //             // destCurrently: results.data.currently,
    //             // destMinutely: results.data.minutely,
    //             // destHourly: results.data.hourly,
    //             // destDaily: results.data.daily,
    //         })
    //     })
    // }

    componentDidMount() {
        let darkSkyAPI = '127459251f6bcece51086b264c0998a1'
        let weatherUrl = `https://api.darksky.net/forecast/${darkSkyAPI}/${this.props.user.trips[0].latStart},${this.props.user.trips[0].longStart}`
        axios.get(weatherUrl).then(results => {
            console.log(results)
            this.setState({
                originWeather: results.data
                // originLat: results.data.latitude,
                // originLong: results.data.longitude,
                // originCurrently: results.data.currently,
                // originMinutely: results.data.minutely,
                // originHourly: results.data.hourly,
                // originDaily: results.data.daily,
            })
        })
        
    }

    render() {
        //need to display the weather at a certain location at the given times
        //if less than 60 minute travel time use the minutely data
        //if more than 60 minutes use the hourly data
        //start show current or chosen weather? 
        //dest will show forecasted
        //return start will show forecasted
        //return dest will show forecasted

        return(
            <>
            {/* render the user start time plus and minus the travel time to get the weather data through out the trip
            so on this page we will need to show the total time length depending on the input and weather
    
            * 4 different divs

            * What To Render on this Page = "StartTime-TravelTime" State & "ReturnTime-ReturnTravelTime" State & apiData- tripName */}


            <h1 className="App"> Morning weather route: {this.props.user.trips[0].tripName}</h1>

            <div className="starttime" className="App">
                <h2>Start Time: {this.props.user.trips[0].startTime}</h2>
                <h2> Travel Time: {this.props.user.trips[0].travelTime}</h2>
                <h3>Start Weather: {this.state.originWeather}</h3>
            </div>

            <hr />
            <div className="traveltime" className="App">
                <h2>Return Time: {this.props.user.trips[0].returnTime}</h2>
                <h2> Return Travel Time: {this.props.user.trips[0].returnTravelTime}</h2>
                <h3>weather data goes here!</h3>

            </div>
            <br/>
            <hr />
            <h1 className="App"> Evening weather route: {this.props.user.trips[0].tripName}</h1>
            <div class="returntime" className="App">
                <h2>Start Time: {this.props.user.trips[0].startTime}</h2>
                <h2> Travel Time: {this.props.user.trips[0].travelTime}</h2>
                <h3>weather data goes here!</h3>
            </div>

            <hr />
            <div class="returntravel" className="App">

                <h2>Return Time: {this.props.user.trips[0].returnTime}</h2>
                <h2> Return Travel Time: {this.props.user.trips[0].returnTravelTime}</h2>
                <h3>weather data goes here!</h3>

            </div>
            
            <button className="App">My Back Trip</button>

        </>
        )
    }

}