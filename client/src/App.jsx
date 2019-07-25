import React from 'react';
import axios from 'axios';
import Login from './Login';
import './App.css';
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
import Header from './Header'
import Footer from './Footer'
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: ''
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this) //* May not be necessary since we're not passing it down...but can't hurt
    this.liftToken = this.liftToken.bind(this)
    this.logout = this.logout.bind(this)
    this.testRoute = this.testRoute.bind(this)
    this.getUsersTrips = this.getUsersTrips.bind(this)
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
              // trips: res.data.user.trips,
              errorMessage: ''
            })
          }
        })
    }
  }

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

  getUsersTrips() {
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get("/trips", config)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }


  deleteTrips(tripId) {
    // console.log('the delete function starts and the token is ', this.state.token)
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${this.state.token}`
    //   }
    // }
    console.log('token passed')
    axios.delete(`/trips/${tripId}`)
      .then(res => {
        this.setState({
          user: res.data.user
        })
        
      })
  }


  componentDidMount() {
    this.checkForLocalToken()
    // this.getUsersTrips()
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
          <nav>
            <Link to='/'>LocalHost3000000000</Link>{'  |  '}
            <Link to='/trips/new'>New Trip</Link>{'  |  '}
            {/* <Link to='/trips/:id'>Show Trip</Link>{'  |  '}  */}
            <Link to='/trips/5d37903573e6e252c1c954f6/edit'>Edit Trip</Link>{'  |  '}
            <Link to='/trips/mytrips'>My Trips</Link>
          </nav>
          {/* <Route
            exact
            path="/raincheck"
          render={() => <Raincheck user={this.state.user} trips={this.state.trips} checkForLocalToken={this.checkForLocalToken}   />}
          /> */}

          <Route exact path="/trips/mytrips" render={(props) => <MyTrips user={this.state.user} deleteTrips={this.deleteTrips} token={this.state.token} {...props}/>} />
          <Route exact path="/trips/mytrips/:id" render={(props) => <Raincheck user={this.state.user}  {...props} />} />
          <Route exact path='/trips/new' render={() => <NewTrip liftToken={this.liftToken} token={this.state.token} />} />
          <Route exact path='/trips/:id' /> {/*  match.params of trip id -AdamG   */}
          <Route exact path='/trips/:id/edit'
            render={() => <EditTrip liftToken={this.liftToken} token={this.state.token} />} />


          {/* <Route exact path='/issues' render={(props) => <Issues issues={issueCopy} />}/> 
        <Route exact path='/issues/:id' render={(props) => <IssueShow issues={issueCopy} {...props} />} />  */}

        </Router>

        <Footer />
      </>
    );
  }
}

export default App;