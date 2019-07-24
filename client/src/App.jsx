import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Home from "./components/TripContainer";
import Raincheck from "./components/Raincheck";
import MyTrips from "./components/MyTrips";
import NewTrip from "./components/NewTrip";
import EditTrip from "./components/EditTrip";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// added imports for header and footer -AdamG
import Header from './Header'
import Footer from './Footer'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      trip: {
        tripName: '',
        zipStart: '',
        latStart: '',
        longStart: '',
        startTime: '',
        travelTime: '',
        zipDest: '',
        latDest: '',
        longDest: '',
        returnTime: '',
        returnTravelTime: ''
      }
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this) //* May not be necessary since we're not passing it down...but can't hurt
    this.liftToken = this.liftToken.bind(this)
    this.logout = this.logout.bind(this)
    this.testRoute = this.testRoute.bind(this)
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken'); //* localStorage lives in the browser...mernToken is key in localStorage
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // found a token in localStorage; verify it
      axios.post('/auth/me/from/token', { token })
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken');
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  // liftToken(data) {
  //   this.setState({
  //     token: data.token,
  //     user: data.user
  //   })
  // }

  //* Object Destructuring! 
  liftToken({ token, user }) {
    this.setState({
      token,
      user
    })
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }







  componentDidMount() {
    this.checkForLocalToken()
  }

  // The testRoute function was used to toubleshoot the api information
  testRoute(e) {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/api', config).then(res => {
      console.log("accessed the protected route");
      this.setState({
        apiData: res.data.message
      })
    })
  }


  render() {
    var user = this.state.user
    var contents
    if (user) {
      contents = (
        <>
          <p>Hello, {user.name}</p>
          <p onClick={this.logout}>Logout!</p>
          <p onClick={this.testRoute}>Access protected route</p>
          <p>{this.state.apiData}</p>
        </>
      );
    } else {
      contents = (
        <>
          <p>Please signup or login</p>
          <Login liftToken={this.liftToken} />
          <Signup liftToken={this.liftToken} />
        </>
      );
    }
    var trip = this.state.trip
    return (
      <>
      {contents}
        <Header />
        <Router>
          {/* <Route
            exact
            path="/"
            render={() => <Home user={this.state.user} />}
          /> */}


          {/* Show the weather for a single trip f*/}
          <Route
            exact
            path="/raincheck"
            render={() => <Raincheck trip={this.state.trip}/>}
          />

          {/* Show all trips for one user  {user.trips} */}
          <Route
            exact
            path="/mytrips"
            render={() => <MyTrips trip={this.state.trip} />}
          />
        {/* Had to comment out a few lines to prevent compile problems. -AdamG */}
        {/* <Route exact path ='/' component={Home} d/> */}
        {/* <Route exact path ='/profile' render={(props) => <Profile user={user} />} />  */}
        
        {/* <Route exact path ='/trips' render={(props) => <TripContainer trip={trip} />} />  */}
        <Route exact path ='/trips/new' render={() => <NewTrip liftToken={this.liftToken} token={this.state.token}/>} /> 
        <Route exact path ='/trips/:id' /> 
        <Route exact path ='/trips/:id/edit'  
                render={() => <EditTrip liftToken={this.liftToken} token={this.state.token}/>}   /> 

        {/* Route to each page here or in the TripContainer Component? */}
        


          {/* We will pass the geocode function inside new trip so user can input zipcode 
            startLat
            startLong:
            destLat: 
            destLong:
            startTime: 
            travelTime:
            returnTime: 
            returnTravelTime */}
          {/* <Route
            exact
            path="/trips/new"
            render={() => (
              <NewTrip trip={this.state.trip} />
            )}
          /> */}
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
