import React from 'react';

const MyTrips = props => {
  let trips;
  // if (props.user.length) {
    // trips = props.user.map((trip, i) => {
      // return <h4 key={i}>{trip.name}</h4>
    // })
  // } else {
    // trips = <h4>Create a New Trip!</h4>
  // }
  return (
      <>
        <div>
          {props.user} 
          {/* Why is this not showing up */}
        </div>
      {/* // Returns a list of trips 
        * // We will render the "nameTrip state"
        
      */}
      
      </>
  )
}


// let airlines; 
//     if (props.airlines.length) {
//         airlines = props.airlines.map((airline, i) => {
//             return <p key={i}>{airline.name}</p>
//         })
//     } else {
//         airlines = <p>No Airline Data!</p>
//     }
//     return (
//         <div>
//             <h3>All the Airlines:</h3>
//             {airlines}
//             <hr/>
//             <form onSubmit={props.handleSubmit}>
//                 <input onChange={props.handleAirlineNameChange} type="text" name="name" value={props.name} placeholder="Airline Name"/>
//                 <input onChange={props.handleAirlineDestinationsChange} type="text" destinations="destinations" value={props.destinations}/>
//                 <input onChange={props.handleAirlineFleetSizeChange} type="text" fleetsize="fleetsize" value={props.fleetsize}/>
//                 <input type="submit" value="Add Airline"/>
//             </form>
//         </div>
//     )

export default MyTrips;
