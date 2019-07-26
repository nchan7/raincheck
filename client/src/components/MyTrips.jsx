import React from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom'

const MyTrips = props => {
  let trips;
  // console.log(props.user)
  // console.log(props.token)
  if (props.user.trips.length) {
    trips = props.user.trips.map((trip, i) => {
      return (
        <div key={i} className="mytrips">

          <Link to={`/trips/mytrips/${trip._id}`}> {' '}
            <h4>{trip.tripName}</h4>
          </Link>
          <button key={i} onClick={() => props.deleteTrips(trip._id)}>Delete</button>
        </div>
      )
    })
  } else {

    trips = <h4>Create a New Trip!</h4>
  }

  return (
    <>
      <div>
        {trips}
      </div>
    </>
  )
}

export default MyTrips;

