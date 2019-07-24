import React, { Component } from 'react'
import axios from 'axios';

const MyTrips = props => {
  let trips;
  if (props.user.trips.length) {
    trips = props.user.trips.map((trip, i) => {
      return (
        <div>
          <h4 key={i}>{trip.tripName}</h4>
          <p>{trip._id}</p>
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
          {/* Why is this not showing up */}
        </div>
      {/* // Returns a list of trips 
        * // We will render the "nameTrip state"
        
      */}
      
      </>
  )
}

export default MyTrips;

